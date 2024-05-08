import express from "express";
import articleRouter from "./routes/articleRouter";

const app = express();

app.use(express.json({ limit: "10kb" }));

app.use("/api/v1/articles", articleRouter);

export default app;
