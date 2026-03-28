import db from "../db/db.js";

export const addCommentDB = (ticket_id, user_id, message) => {
    return new Promise((resolve, reject) => {
        const sql = `
            INSERT INTO comments (ticket_id, author_id, message)
            VALUES (?, ?, ?)
        `;

        db.query(sql, [ticket_id, user_id, message], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

export const getCommentsByTicket = (ticket_id) => {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT c.*, u.name
            FROM comments c
            JOIN users u ON c.author_id = u.id
            WHERE c.ticket_id = ?
            ORDER BY c.created_at ASC
        `;

        db.query(sql, [ticket_id], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};