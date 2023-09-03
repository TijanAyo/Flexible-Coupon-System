import express, {Express, Request, Response} from "express";
import morgan from "morgan";
import * as dotenv from "dotenv"
import routes from "./route/routes";
dotenv.config();

const app: Express = express();

// Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));

// Route
app.use("/api/v1", routes);

app.get("/", (_req: Request, res: Response) => {
    return res.status(200).send("Flexible Coupon System v1.0.0");
});

export default app;
