import { computePriority } from "../utils/priorityEngine.js";
import { getSLADueTime } from "../utils/slaEngine.js";
import { createTicketDB, getUserTickets, getTicketById, getAllTickets, getDashboardStats } from "../models/ticketModel.js";
import { addCommentDB, getCommentsByTicket } from "../models/commentModel.js";
import { createEvent } from "../models/eventModel.js";
import db from "../db/db.js";


export const createTicket = async (req, res) => {

  try {

    const {
      title,
      description,
      category,
      impact,
      urgency,
    } = req.body;

    const user_id = req.session.user.id; 
    // 1 compute priority
    const priority = await computePriority(
      impact,
      urgency,
      category,
      0
    );

    // 2 compute SLA
    const slaDue = await getSLADueTime(priority);

    // 3 save ticket
    const result = await createTicketDB({
      title,
      description,
      category,
      impact,
      urgency,
      priority,
      user_id,
      sla_due_time: slaDue
    });

    const ticketId = result.insertId;

    // 4 create event
    await createEvent(
      ticketId,
      "TICKET_CREATED",
      "Ticket created with priority " + priority
    );

    res.send("Ticket created successfully");

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error creating ticket" });
  }

};

export const getTickets = async (req, res) => {
  try {
    const user_id = req.session.user.id;

    const tickets = await getUserTickets(user_id);

    const now = new Date();

    tickets.forEach(t => {
      const due = new Date(t.sla_due_time);
      const diff = due - now;

      const hours = Math.floor(Math.abs(diff) / (1000 * 60 * 60));

      if (diff > 0) {
        t.sla_status = `${hours} hrs left`;

        if (hours <= 2) {
          t.sla_flag = "critical";
        } else if (hours <= 6) {
          t.sla_flag = "warning";
        } else {
          t.sla_flag = "normal";
        }

      } else {
        t.sla_status = `Overdue by ${hours} hrs`;
        t.sla_flag = "overdue";
      }
    });

    // sort by priority (P0 first)
    const priorityOrder = { P0: 0, P1: 1, P2: 2, P3: 3 };

    tickets.sort((a, b) => {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

    res.render("users/ticketList", { tickets });

  } catch (err) {
    console.log(err);
    res.send("Error loading tickets");
  }
};

export const getTicketDetails = async (req,res) => {
  try {
    const ticketId = req.params.id;
    console.log("Fetching details for ticket ID:", ticketId);
    const ticket = await getTicketById(ticketId);
    console.log("Ticket details:", ticket);

     if (!ticket) {
      return res.send("Ticket not found");
    }
    const comments = await getCommentsByTicket(ticketId);

    res.render("users/ticketDetails", {
      ticket, 
      comments,
      user: req.session.user
    });
  } catch (error) {
      console.log(error);
      res.send("Error loading ticket");
  }
};

export const getAdminTickets = async (req, res) => {
  try {

    const tickets = await getAllTickets();

    const now = new Date();

    tickets.forEach(t => {
      const due = new Date(t.sla_due_time);
      const diff = due - now;

      const hours = Math.floor(Math.abs(diff) / (1000 * 60 * 60));

      if (diff > 0) {
        t.sla_status = `${hours} hrs left`;

        if (hours <= 2) t.sla_flag = "critical";
        else if (hours <= 6) t.sla_flag = "warning";
        else t.sla_flag = "normal";

      } else {
        t.sla_status = `Overdue by ${hours} hrs`;
        t.sla_flag = "overdue";
      }
    });

    res.render("admin/ticketList", { tickets });

  } catch (err) {
    res.send("Error loading admin tickets");
  }
};

export const userHome = async (req,res) => {
  try {
    const user = req.session.user;
    const tickets = await getUserTickets(user.id);

    res.render("users/home", {
      user,
      tickets: tickets.slice(0,5)
    });
  } catch (error) {
    res.send("Error loading user home");
  }
}

export const adminDashboard = async (req, res) => {
  try {

    const stats = await getDashboardStats();
    const tickets = await getAllTickets();

    res.render("admin/dashboard", {
      stats,
      tickets: tickets.slice(0, 5) // recent
    });

  } catch (err) {
    console.log(err);
    res.send("Error loading dashboard");
  }
};
