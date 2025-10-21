const mysql = require("mysql2");

// ✅ Create a connection pool (fixed property names and improved stability)
const connection = mysql.createPool({
  host: "203.91.116.122",
  user: "teams",
  password: "superSecretPassword!123",
  database: "Javkhlan_B_lab_db",
  port: 22136,
  waitForConnections: true, // fixed: correct property name
  connectionLimit: 10,
  maxIdle: 10,              // optional: only supported in recent mysql2 versions
  idleTimeout: 60000,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

// ✅ Optional: quick test to verify connection works
connection.getConnection((err, conn) => {
  if (err) {
    console.error("❌ Database connection failed:", err.message);
  } else {
    console.log("✅ Database connected successfully!");
    conn.release();
  }
});

module.exports = connection;
