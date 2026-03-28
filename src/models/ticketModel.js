import db from "../db/db.js";

export const createTicketDB = (data) => {
    return new Promise((resolve, reject) => {
        const sql = `
            INSERT INTO tickets
            (title, description, category, impact, urgency, priority, user_id, sla_due_time) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        
        `;

        db.query(
            sql,
            [
                data.title,
                data.description,
                data.category,  
                data.impact,
                data.urgency,
                data.priority,
                data.user_id,
                data.sla_due_time
            ],
            (err, result) => {
                if(err) return reject(err);
                resolve(result);
            }
        );
    });
};

export const getUserTickets = (user_id) => {
    return new Promise ((resolve, reject) => {
        const sql = `
          SELECT * FROM tickets WHERE user_id = ?
          ORDER BY created_at DESC
        `;
        db.query(sql, [user_id], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

export const getTicketById = (id) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM tickets WHERE id = ?`;

        db.query(sql, [id], (err, result) => {
            if (err) return reject(err);
            console.log("DB Result: ", result);
            resolve(result[0]);
        });
    });
};

