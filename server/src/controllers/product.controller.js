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
  const image = req.file?.filename;

  if (role !== "Admin") {
    return ApiError.send(res, 403, "Only admins can create a product.");
  }

  if (!name || !categoryid || !price || !stock || !status || !createdby) {
    return ApiError.send(res, 400, "All required fields must be provided");
  }

  if (!image) {
    return ApiError.send(res, 403, "Please Upload Product Image.");
  }
  const category = await prisma.category.findUnique({
    where: { id: categoryid },
  });

  if (!category) {
    return ApiError.send(res, 404, "Category not found");
  }

  const product = await prisma.product.create({
    data: {
      name: name.trim(),
      categoryid,
      price: parseFloat(price),
      stock: parseInt(stock),
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
  if (req.user?.role !== "Admin") {
    return ApiError.send(res, 403, "Only admins can fatched products.");
  }

  const products = await prisma.product.findMany({
    include: {
      category: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  if (!products) {
    return ApiError.send(res, 404, "Products not found");
  }

  return res.status(200).json(
    new ApiResponse(200, "Products Fatched successfully.", {
      products,
    }),
  );
});

const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (req.user?.role !== "Admin") {
    return ApiError.send(res, 403, "Only admins can fatched products.");
  }
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      category: true,
      orderItems: true,
      creator: true,
    },
  });

  if (!product) {
    return ApiError.send(res, 404, "Product not found");
  }

  return res.status(200).json(
    new ApiResponse(200, "Product Fatched Successfully.", {
      product,
    }),
  );
});

const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, categoryid, price, stock, status } = req.body;

  if (req.user?.role !== "Admin") {
    return ApiError.send(res, 403, "Only admins can update products.");
  }

  const existingProduct = await prisma.product.findUnique({ where: { id } });
  if (!existingProduct) {
    return ApiError.send(res, 404, "Product not found");
  }

  if (categoryid) {
    const categoryExist = await prisma.category.findUnique({
      where: { id: categoryid },
    });
    if (!categoryExist) {
      return ApiError.send(res, 404, "Category not found");
    }
  }

  let newImageFilename = existingProduct.image;

  if (req.file?.filename) {
    if (existingProduct.image) {
      const oldImagePath = path.join(
        __dirname,
        "../../public/uploads",
        existingProduct.image,
      );
      deleteOldImage(oldImagePath);
    }

    newImageFilename = req.file.filename;
  }

  const updatedProduct = await prisma.product.update({
    where: { id },
    data: {
      name: name?.trim() || existingProduct.name,
      categoryid: categoryid ?? existingProduct.categoryid,
      price: price !== undefined ? parseFloat(price) : existingProduct.price,
      stock: stock !== undefined ? parseInt(stock) : existingProduct.stock,
      status: status ?? existingProduct.status,
      image: newImageFilename,
    },
  });

  return res
    .status(200)
    .json(
      new ApiResponse(200, "Product updated successfully", { updatedProduct }),
    );
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (req.user?.role !== "Admin") {
    return ApiError.send(res, 403, "Only admins can delete products.");
  }

  const product = await prisma.product.findUnique({ where: { id } });

  if (!product) {
    return ApiError.send(res, 404, "Product not found");
  }

  // Delete image file if exists
  if (product.image) {
    const imagePath = path.join(
      __dirname,
      "../../public/uploads",
      product.image,
    );
    deleteOldImage(imagePath);
  }

  // Delete product from database
  await prisma.product.delete({ where: { id } });

  return res
    .status(200)
    .json(new ApiResponse(200, "Product deleted successfully", null));
});

export {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
