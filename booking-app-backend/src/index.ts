import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import sequelize from "./config/dbConnection";
import router from "./routes/index";

dotenv.config();

// database connection
sequelize.sync();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api", router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
