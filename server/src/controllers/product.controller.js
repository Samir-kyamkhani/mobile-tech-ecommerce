import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import prisma from "../db/db.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { deleteOldImage } from "../utils/utils.js";

const createProduct = asyncHandler(async (req, res) => {});
const getAllProducts = asyncHandler(async (req, res) => {});
const getProductById = asyncHandler(async (req, res) => {});
const updateProduct = asyncHandler(async (req, res) => {});
const deleteProduct = asyncHandler(async (req, res) => {});

export {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
