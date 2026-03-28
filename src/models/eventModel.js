import db from "../db/db.js";

export const createEvent = (ticketId, type, description) => {
  return new Promise((resolve, reject) => {

    const sql = `
      INSERT INTO ticket_events
      (ticket_id, event_type, description)
      VALUES (?, ?, ?)
    `;

    db.query(sql, [ticketId, type, description], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });

  });
};