import upload from "../middlewares/multer.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../controllers/product.controller.js";

const router = Router();

router.post(
  "/create-product",
  authMiddleware,
  upload.single("image"),
  createProduct,
);
router.get("/get-products", authMiddleware, getAllProducts);
router.get("/get-product", authMiddleware, getProductById);
router.put(
  "/update-product",
  authMiddleware,
  upload.single("image"),
  updateProduct,
);
router.delete(
  "/delete-product",
  authMiddleware,
  upload.single("image"),
  deleteProduct,
);

export default router;
