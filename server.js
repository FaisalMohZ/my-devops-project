const express = require("express");
const lodash = require("lodash");
const ejs = require("ejs");
const { exec } = require("child_process");

const app = express();
app.set("view engine", "ejs");

// Simulated Insecure Route (Prototype Pollution)
app.get("/unsafe", (req, res) => {
  let obj = {};
  try {
    lodash.merge(obj, JSON.parse(req.query.data || "{}"));  // 🚨 Vulnerable to prototype pollution
    res.json(obj);
  } catch (error) {
    res.status(400).send("Invalid JSON input");
  }
});

// Simulated Insecure Route (Command Injection)
app.get("/exec", (req, res) => {
  const command = req.query.cmd;
  exec(command, (error, stdout, stderr) => {  // 🚨 Vulnerable to command injection
    if (error) return res.send(stderr);
    res.send(stdout);
  });
});

app.get("/", (req, res) => {
  res.send("Vulnerable Node.js App Running...");
});

// Start Server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
