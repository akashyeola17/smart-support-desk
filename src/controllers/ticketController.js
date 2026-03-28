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