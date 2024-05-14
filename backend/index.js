import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "./routes/routes.js";

const app = express();

//midlewares
app.use(bodyParser.json());
app.use(cors());

//ROUTES//
app.use("/api", routes);

//port
const PORT = process.env.PORT || 5000;

//Starting a server
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
