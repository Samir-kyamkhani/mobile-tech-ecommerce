import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const data = "10mb";

app.use(
  cors({
    origin:
      process.env.CLIENT_URI ||
      "http://wog4cgowsw84ws0w4ksggkkg.147.93.20.127.sslip.io/",
    credentials: true,
  }),
);

app.use(express.json({ limit: data }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use("/uploads", express.static("public/uploads"));
app.use(cookieParser());

app.use((err, req, res, next) => {
  console.error("ERROR 💥", err);
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

import userRouter from "./routes/user.routes.js";
import customerRouter from "./routes/customer.routes.js";
import categoryRouter from "./routes/category.routes.js";
import productRouter from "./routes/product.routes.js";
import orderRouter from "./routes/order.routes.js";
import sendMail from "./routes/sendMail.routes.js";
import paymentRouter from "./routes/payment.routes.js";

// routes declaration
app.use("/api/v1/auth", userRouter);
app.use("/api/v1/customer", customerRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1", sendMail);
app.use("/api/v1/payment", paymentRouter);

export default app;
