import db from "../db/db.js";

export const computePriority = (impact, urgency, category, reopenCount = 0) => {
    return new Promise((resolve, reject) => {

        const sql = `
            SELECT priority
            FROM priority_matrix
            WHERE impact = ? AND urgency = ? AND category = ?
            LIMIT 1
        `;

        db.query(sql, [impact, urgency, category], (err, result) => {
            if (err) return reject(err);

            let priority = "P3";

            if (result.length > 0) {
                priority = result[0].priority;
            }

            if (reopenCount > 0) {
                if (priority === "P3") priority = "P2";
                else if (priority === "P2") priority = "P1";
                else if (priority === "P1") priority = "P0";
            }

            resolve(priority);
        });

    });
};