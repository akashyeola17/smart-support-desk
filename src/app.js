import express from 'express';
import session from 'express-session';
import "./db/db.js";
import ticketRoutes from "./routes/ticketRoutes.js";
import authRoutes from "./routes/authROutes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: "secret-key",
    resave: false, 
    saveUninitialized: true,
}));
app.set("view engine", "ejs");
app.use("/tickets", ticketRoutes);
app.use("/", authRoutes);

export default app;