import express from "express";
import cors from "cors";
import threadsRoutes from "./routes/threadsRoutes.js";
import answersRoutes from "./routes/answersRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use(threadsRoutes);
app.use(answersRoutes);
app.use(errorHandler);

app.listen(3000, () => console.log("Listening to port 3000"));
