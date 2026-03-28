import db from "../db/db.js";

export const login = (req, res) => {
  const { email, password } = req.body;

  const sql = `SELECT * FROM users WHERE email = ? AND password = ?`;

  db.query(sql, [email, password], (err, result) => {
    if (err) return res.send("Error");

    if (result.length === 0) {
      return res.send("Invalid credentials");
    }

    const user = result[0];

    req.session.user = user; 

    // redirect based on role
    if (user.role === "admin") {
      return res.redirect("/tickets/admin/dashboard");
    } else {
      return res.redirect("/tickets/home");
    }
  });
};