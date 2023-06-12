const express = require("express");
const fs = require("fs");

const app = express();
const port = 3000;

// Middleware to parse JSON data
app.use(express.json());

// Endpoint to serve the HTML and CSS files
app.use(express.static("public"));

// Endpoint to get all tasks
app.get("/tasks", (req, res) => {
  fs.readFile("tasks.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error:", err);
      res.status(500).json({ error: "Server error" });
    } else {
      const tasks = JSON.parse(data);
      res.json(tasks);
    }
  });
});

// Endpoint to add a task
app.post("/tasks", (req, res) => {
  const { task } = req.body;

  fs.readFile("tasks.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error:", err);
      res.status(500).json({ error: "Server error" });
    } else {
      const tasks = JSON.parse(data);
      tasks.push(task);

      fs.writeFile("tasks.json", JSON.stringify(tasks), (err) => {
        if (err) {
          console.error("Error:", err);
          res.status(500).json({ error: "Server error" });
        } else {
          res.json(tasks);
        }
      });
    }
  });
});

// Endpoint to delete a task
app.delete("/tasks/:id", (req, res) => {
  const taskId = req.params.id;

  fs.readFile("tasks.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error:", err);
      res.status(500).json({ error: "Server error" });
    } else {
      let tasks = JSON.parse(data);

      tasks = tasks.filter((task, index) => index !== taskId);

      fs.writeFile("tasks.json", JSON.stringify(tasks), (err) => {
        if (err) {
          console.error("Error:", err);
          res.status(500).json({ error: "Server error" });
        } else {
          res.json(tasks);
        }
      });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
