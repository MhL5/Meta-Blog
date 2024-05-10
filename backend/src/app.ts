import express, { Request, Response, NextFunction } from "express";
import path from "path";
import cors from "cors";
import articleRouter from "./routes/articleRouter";
import helmet from "helmet";
import globalErrorController from "./controllers/globalErrorController/globalErrorController";
import { AppError } from "./utils/appError";
import morgan from "morgan";
import { env } from "./utils/env";
import { apiLimiter } from "./middlewares/rateLimiter";
import cookieParser from "cookie-parser";
import mongoSanitize from "express-mongo-sanitize";
import hpp from "hpp";
import compression from "compression";
import xss from "xss";

const app = express();

/**
 * GLOBAL MIDDLEWARES ✨
 *
 * 1. Cors: Cross origin resource sharing
 * 2. serving static files
 * 3. Helmet: security http headers
 * 4. morgan: Development logging functionality
 * 5. rate limiter
 * 6. body parser
 * 7. Cookie parser
 * 8. urlencoded for loading form data
 * 9. data sanitization against noSQL query injection
 * 10. http parameter pollution protection
 * 11. xss sanitizer
 * 12. compression
 */

/**
 * 1. Cors: Cross origin resource sharing
 * @link https://www.npmjs.com/package/cors
 */
export const allowedOrigins = ["http://localhost:5173"];
app.use(
  cors({
    credentials: true,
    origin: (origin: string | undefined, callback) => {
      if (allowedOrigins.indexOf(origin || "") !== -1 || !origin)
        callback(null, true);
      else callback(new AppError("Not allowed by CORS", 403));
    },
  })
);
app.options("*", cors());

/**
 * 2. serving static files
 * @link https://expressjs.com/en/starter/static-files.html
 */
app.use(express.static(path.join(__dirname, "../public")));

/**
 * 3. helmet: set security http headers
 * @link https://helmetjs.github.io
 */
app.use(helmet());

/**
 * 4. morgan: development logging functionality
 * @link https://www.npmjs.com/package/morgan
 */
if (env.NODE_ENV.toLocaleLowerCase() === "development") app.use(morgan("dev"));

/**
 * 5. rate limiter
 * @link https://www.npmjs.com/package/express-rate-limit
 * @see https://youtube.com/shorts/uI2mwYWh9hc?si=WRv48iNrarLZwN1R
 *
 * @description: rateLimiter keeps tracks of ips in memory, adding a redis DB can make this more efficient but at this scale its not required
 */
app.use("/api", apiLimiter);

/**
 * 6. body parser, reading data from the body into req.body
 * @link https://expressjs.com/en/resources/middleware/body-parser.html
 */
app.use(express.json({ limit: "10kb" }));

/**
 * 7. Cookie parser
 * @link https://github.com/expressjs/cookie-parser#readme
 */
app.use(cookieParser());

/**
 * 8. urlencoded for loading form data
 * @link https://expressjs.com/en/api.html#express.urlencoded
 */
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

/**
 *
 *
 * * after parsing we can start sanitizing
 *
 *
 */

/**
 * 9. data sanitization against noSQL query injection
 * @link https://github.com/fiznool/express-mongo-sanitize#readme
 */
app.use(mongoSanitize());

/**
 * 10. http parameter pollution protection
 * @requires parsedData make sure the body is parsed beforehand.
 * @link https://github.com/analog-nico/hpp
 */
app.use(hpp());

/**
 * 11. xss sanitizer
 * @example:
 * input:  "some .md <strong>yo<strong> <script>alert('xss');</script>"
 * output: "some .md <strong>yo<strong> &lt;script&gt;alert('xss');&lt;/script&gt;"
 *
 * @link https://github.com/AhmedAdelFahim/express-xss-sanitizer
 * @returns sanitized req.body, req.query, req.headers and req.params
 */
function customXssSanitizer(req: Request, res: Response, next: NextFunction) {
  const keys = ["body", "query", "headers", "params"] as const;
  keys.forEach((key) => {
    // Convert the request body to a JSON string and sanitize it using the xss library
    const sanitize = xss(JSON.stringify(req[key]));
    // Parse the sanitized JSON string back to an object and assign it to the request body
    req[key] = JSON.parse(sanitize);
    console.dir(req[key]);
  });
  next();
}
app.use(customXssSanitizer);

/**
 * 12. compression
 * @link https://github.com/expressjs/compression#readme
 * @returns a compressed response
 */
app.use(compression());

/**
 *
 *
 * * NOW WE CAN START MOUNTING ROUTERS
 *
 *
 */
app.use("/api/v1/articles", articleRouter);

/**
 * 404 not found
 * handles not found routes errors
 */
app.all("*", (req, res, next) => {
  next(new AppError(`Cant Find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorController);

export default app;
