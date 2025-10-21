const express = require("express");
const db = require("./db");
const app = express();

// ✅ Middleware to parse form and JSON data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");

// ✅ (Optional but recommended) Set the 'views' folder if it's not default
// app.set("views", __dirname + "/views");

app.get("/", (req, res) => {
  db.query("SELECT * FROM students", (err, results) => {
    if (err) throw err;
    res.render("index", { students: results });
  });
});

app.post("/add", (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).send("Name and email are required.");
  }

  db.query(
    "INSERT INTO students (name, email) VALUES (?, ?)",
    [name, email],
    (err, results) => {
      if (err) throw err;
      res.redirect("/");
    }
  );
});

app.post("/delete/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM students WHERE id = ?", [id], (err, results) => {
    if (err) throw err;
    res.redirect("/");
  });
});

app.listen(3011, () => {
  console.log("✅ Server running on port 3011");
});
