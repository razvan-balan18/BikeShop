import express from "express";
import bodyParser from "body-parser";
import cors from 'cors'
import helmet from 'helmet'
import router from './modules/index.js'
import config from "./config.js";
import protectedRoutes from '../routes/protected.js';
import './config/firebase.js'; // Just import to ensure initialization

const app = express();
app.use(cors())
app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.use('/api', router)
app.use('/protected', protectedRoutes);

const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

process.on("SIGTERM", () => {
    console.log("SIGTERM received, closing server...");
    server.close(() => {
        console.log("Server closed gracefully.");
        process.exit(0);
    });
});

process.on("SIGINT", () => {
    console.log("SIGINT received, closing server...");
    server.close(() => {
        console.log("Server closed gracefully.");
        process.exit(0);
    })
});