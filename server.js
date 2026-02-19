const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(__dirname));

// Handle message saving
app.post("/save-message", (req, res) => {
  const message = req.body.message;

  if (!message) {
    return res.status(400).json({ error: "Message is empty" });
  }

  const filePath = path.join(__dirname, "messages.txt");

  const content = `Message: ${message}\nTime: ${new Date().toLocaleString()}\n\n`;

  fs.appendFile(filePath, content, (err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to save message" });
    }
    res.json({ success: true });
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
