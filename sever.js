const express = require("express");
const app = express();
const port = 3000;

app.use(express.static("public")); // Serve static files
app.use(express.json()); // Parse JSON body

app.post("/chat", (req, res) => {
    const userMessage = req.body.message;
    console.log("User:", userMessage);
    res.json({ reply: "Hello! How can I help you?" }); // Dummy response
});

app.listen(port, () => {
    console.log(Server running at http://localhost:${port});
});