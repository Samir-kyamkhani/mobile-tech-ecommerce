import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import validator from "validator";
import crypto from "crypto";

import {
  comparePassword,
  generateAccessToken,
  hashPassword,
  cookieOptions,
  sendEmail,
} from "../utils/utils.js";
import prisma from "../db/db.js";

// ✅ LOGIN
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return ApiError.send(res, 400, "Email and password are required.");
  }

  if (!validator.isEmail(email)) {
    return ApiError.send(res, 400, "Invalid email format.");
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !user.password) {
    return ApiError.send(res, 401, "Invalid credentials.");
  }

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    return ApiError.send(res, 401, "Invalid credentials.");
  }

  await prisma.user.update({
    where: { email },
    data: { lastLogin: new Date() },
  });

  const accessToken = generateAccessToken(user.id, user.email, user.role);

  console.log(accessToken);

  const { password: _, ...userSafe } = user;

  return res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .json(
      new ApiResponse(200, "Login successful.", {
        user,
        accessToken,
      }),
    );
});

// ✅ LOGOUT
const logout = asyncHandler(async (req, res) => {
  res
    .clearCookie("accessToken", cookieOptions)
    .status(200)
    .json(new ApiResponse(200, "Logout successful."));
});

// ✅ FORGOT PASSWORD
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return ApiError.send(res, 400, "Email is required.");
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return res
      .status(200)
      .json(
        new ApiResponse(200, "If an account exists, a reset email was sent."),
      );
  }

  const resetToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  const tokenExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

  await prisma.user.update({
    where: { email },
    data: {
      token: hashedToken,
      resetTokenExpiry: tokenExpiry,
    },
  });

  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`;

  await sendEmail({
    to: email,
    subject: "Password Reset Request",
    text: `You requested a password reset. Click the link to reset your password: ${resetUrl}`,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, "Password reset email sent."));
});

// ✅ RESET PASSWORD

const resetPassword = asyncHandler(async (req, res) => {
  const userId = req.user?.id; // Assumes authenticated user
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return ApiError.send(res, 400, "Current and new passwords are required.");
  }

  if (newPassword.length < 8) {
    return ApiError.send(
      res,
      400,
      "New password must be at least 8 characters.",
    );
  }

  if (currentPassword === newPassword) {
    return ApiError.send(
      res,
      400,
      "New password must be different from the current password.",
    );
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) {
    return ApiError.send(res, 404, "User not found.");
  }

  const isPasswordValid = await comparePassword(currentPassword, user.password);

  if (!isPasswordValid) {
    return ApiError.send(res, 401, "Current password is incorrect.");
  }

  const hashedNewPassword = await hashPassword(newPassword);

  await prisma.user.update({
    where: { id: user.id },
    data: { password: hashedNewPassword },
  });

  return res
    .status(200)
    .json(new ApiResponse(200, "Password changed successfully."));
});

export { login, logout, forgotPassword, resetPassword };
