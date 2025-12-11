import prisma from "../db/db.js";
import { Decimal } from "@prisma/client/runtime/library";

export const paymentSuccess = async (req, res) => {
  try {
    if (req.user?.role !== "Customer") {
      return ApiError.send(res, 403, "Only Customers can order products.");
    }

    const { paymentResponse, cart, amount, shipping } = req.body;



    // Validate required fields
    if (!cart || !amount || !shipping) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: cart, amount, or shipping",
      });
    }

    // Fetch products to validate stock and price

    const productIds = cart.map((item) => item.id);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
    });

    if (products.length !== cart.length) {
      return ApiError.send(res, 400, "Some products are invalid.");
    }

    // Check stock availability and calculate total
    let total = 0;
    for (const item of cart) {
      const product = products.find((p) => p.id === item.id);
      if (!product) {
        return ApiError.send(res, 400, `Product ${item.id} not found.`);
      }
      if (product.stock < item.quantity) {
        return ApiError.send(
          res,
          400,
          `Insufficient stock for product ${product.name}`,
        );
      }
      total += product.price * item.quantity;
      if (total !== amount) {
        return ApiError.send(res, 400, "Payment amount mismatch.");
      }
    }

    // Create shipping address
    const shippingAddress = await prisma.shippingAddress.create({
      data: {
        firstName: shipping.firstName,
        lastName: shipping.lastName,
        email: shipping.email,
        address: shipping.address,
        city: shipping.city,
        zip: shipping.zip,
      },
    });

    // Get user from token or use email as fallback
    let userId = req.user?.id;

    if (!userId) {
      // Try to find user by email
      const user = await prisma.user.findUnique({
        where: { email: shipping.email },
      });

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "User not authenticated",
        });
      }
    }

    // Create order with online payment
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 7);

    const transactionId = paymentResponse.indic_transaction_id;
    const merchantOrderId = paymentResponse.merchant_order_id;
    const bankReferenceId = paymentResponse.bank_reference_id;
    const paymentMethod = paymentResponse.payment_method;

    if (!transactionId || !merchantOrderId || !bankReferenceId) {
      res.status(400).json({
        success: false,
        message: "Missing transaction details in payment response",
      });
      return;
    }

    const order = await prisma.$transaction(async (prisma) => {
      const orderCreated = await prisma.order.create({
        data: {
          customerid: userId,
          createdby: userId,
          total: new Decimal(amount),
          shippingId: shippingAddress.id,
          payment: "Paid",
          status: "Processing",
          paymentMode: paymentMethod,
          transactionId: transactionId,
          merchantOrderId: merchantOrderId,
          bankReferenceId: bankReferenceId,
          duedate: dueDate,
          items: {
            create: cart.map((item) => ({
              productid: item.id,
              quantity: item.quantity,
              price: new Decimal(item.price),
            })),
          },
        },
        include: {
          items: {
            include: {
              product: true,
            },
          },
          shipping: true,
        },
      });

      // Update stock
      for (const item of cart) {
        await prisma.product.update({
          where: { id: item.id },
          data: {
            stock: { decrement: item.quantity },
          },
        });
      }

      return orderCreated;
    });

 

    return res.status(200).json({
      success: true,
      orderId: order.id,
      message: "Order placed successfully",
      order: {
        id: order.id,
        total: order.total,
        items: order.items.length,
        transactionId: order.transactionId,
        merchantOrderId: order.merchantOrderId,
        bankReferenceId: order.bankReferenceId,
        paymentMethod: order.paymentMode,
        shipping: order.shipping,
      },
    });
  } catch (error) {
    console.error(" Payment success handler error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to process payment",
      error: error.message,
    });
  }
};
