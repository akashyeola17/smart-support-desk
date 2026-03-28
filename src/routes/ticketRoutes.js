import express from "express";
import { createTicket, getTickets, getTicketDetails, addComment, getAdminTickets, adminDashboard, updateStatus } from "../controllers/ticketController.js";
import { userHome } from "../controllers/ticketController.js";
import { isAdmin, isLoggedIn } from "../middlewares/loginCheck.js";

const router = express.Router();

router.get("/home", isLoggedIn, userHome);
router.get("/admin/dashboard", isLoggedIn, isAdmin, adminDashboard);
router.get("/admin/list", isLoggedIn, isAdmin,getAdminTickets);

router.get("/create",isLoggedIn ,(req,res) => {
    res.render("users/createTicket");
});
router.post("/create",isLoggedIn ,createTicket);

router.get("/list", isLoggedIn, getTickets);

router.post("/:id/status", isLoggedIn, isAdmin, updateStatus);


router.get("/:id", isLoggedIn ,getTicketDetails);
router.post("/:id/comment", isLoggedIn, addComment);


export default router;