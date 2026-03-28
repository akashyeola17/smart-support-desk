import db from "../db/db.js";

export const getSLADueTime = (priority) => {

  return new Promise((resolve, reject) => {

    const sql = `
      SELECT hours
      FROM sla_rules
      WHERE priority = ?
      LIMIT 1
    `;

    db.query(sql, [priority], (err, result) => {
      if (err) return reject(err);

      let hours = 72;

      if (result.length > 0) {
        hours = result[0].hours;
      }

      const due = new Date();
      due.setHours(due.getHours() + hours);

      resolve(due);
    });

  });

};