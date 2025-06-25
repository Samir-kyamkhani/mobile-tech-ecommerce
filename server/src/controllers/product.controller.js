import path from "path";
import { fileURLToPath } from "url";
import prisma from "../db/db.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { deleteOldImage } from "../utils/utils.js";

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createProduct = asyncHandler(async (req, res) => {
  const { name, categoryid, price, stock, status } = req.body;
  const { id: createdby, role } = req.user;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  if (role !== "Admin") {
    return ApiError.send(res, 403, "Only admins can create a product.");
  }

  if (!name || !categoryid || !price || !stock || !status || !createdby) {
    return ApiError.send(res, 400, "All required fields must be provided.");
  }

  if (!image) {
    return ApiError.send(res, 403, "Please Upload Product Image.");
  }

  // Ensure price is numeric
  const numericPrice = parseFloat(
    typeof price === "string" ? price.replace(/[^0-9.]/g, "") : price,
  );
  if (isNaN(numericPrice)) {
    return ApiError.send(res, 400, "Invalid price format.");
  }

  const numericStock = parseInt(stock);
  if (isNaN(numericStock)) {
    return ApiError.send(res, 400, "Invalid stock value.");
  }

  const category = await prisma.category.findUnique({
    where: { id: categoryid },
  });

  if (!category) {
    return ApiError.send(res, 404, "Category not found.");
  }

  const product = await prisma.product.create({
    data: {
      name: name.trim(),
      categoryid,
      price: numericPrice,
      stock: numericStock,
      status,
      image,
      createdby,
    },
  });

  return res.status(201).json(
    new ApiResponse(201, "Product created successfully", {
      product,
    }),
  );
});

const getAllProducts = asyncHandler(async (req, res) => {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { name: "asc" },
  });

  if (!products || products.length === 0) {
    return ApiError.send(res, 404, "No products found.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Products fetched successfully.", { products }));
});

const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (req.user?.role !== "Admin") {
    return ApiError.send(res, 403, "Only admins can fetch products.");
  }

  const product = await prisma.product.findUnique({
    where: { id },
    include: { category: true, orderItems: true, creator: true },
  });

  if (!product) {
    return ApiError.send(res, 404, "Product not found.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Product fetched successfully.", { product }));
});

const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, categoryid, price, stock, status } = req.body;

  if (req.user?.role !== "Admin") {
    return ApiError.send(res, 403, "Only admins can update products.");
  }

  const existingProduct = await prisma.product.findUnique({ where: { id } });
  if (!existingProduct) {
    return ApiError.send(res, 404, "Product not found.");
  }

  if (categoryid) {
    const categoryExists = await prisma.category.findUnique({
      where: { id: categoryid },
    });
    if (!categoryExists) {
      return ApiError.send(res, 404, "Category not found.");
    }
  }

  let newImageFilename = existingProduct.image;

  if (req.file) {
    // Delete the old image if exists
    if (existingProduct.image) {
      const oldImageFileName = existingProduct.image.replace("/uploads/", "");
      const oldImagePath = path.join(
        __dirname,
        "../../public/uploads",
        oldImageFileName,
      );
      deleteOldImage(oldImagePath);
    }

    // Store new image path
    newImageFilename = `/uploads/${req.file.filename}`;
  }

  const numericPrice =
    price !== undefined ? parseFloat(price) : existingProduct.price;
  if (price !== undefined && (isNaN(numericPrice) || numericPrice < 0)) {
    return ApiError.send(res, 400, "Invalid price format.");
  }

  const numericStock =
    stock !== undefined ? parseInt(stock, 10) : existingProduct.stock;
  if (stock !== undefined && (isNaN(numericStock) || numericStock < 0)) {
    return ApiError.send(res, 400, "Invalid stock value.");
  }

  const updatedProduct = await prisma.product.update({
    where: { id },
    data: {
      name: name?.trim() ?? existingProduct.name,
      categoryid: categoryid ?? existingProduct.categoryid,
      price: numericPrice,
      stock: numericStock,
      status: status ?? existingProduct.status,
      image: newImageFilename,
    },
  });

  return res.status(200).json(
    new ApiResponse(200, "Product updated successfully.", {
      product: updatedProduct,
    }),
  );
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (req.user?.role !== "Admin") {
    return ApiError.send(res, 403, "Only admins can delete products.");
  }

  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) {
    return ApiError.send(res, 404, "Product not found.");
  }

  // Delete all related OrderItems first to avoid foreign key constraint violation
  await prisma.orderItem.deleteMany({
    where: { productid: id },
  });

  // Delete product image from disk if it exists
  if (product.image) {
    const imageFileName = product.image.replace("/uploads/", "");
    const imagePath = path.join(
      __dirname,
      "../../public/uploads",
      imageFileName,
    );
    deleteOldImage(imagePath);
  }

  // Delete the product itself
  await prisma.product.delete({ where: { id } });

  return res
    .status(200)
    .json(new ApiResponse(200, "Product deleted successfully."));
});

export {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
