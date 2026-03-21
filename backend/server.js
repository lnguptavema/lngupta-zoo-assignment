const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// MAIN  ROUTE
app.post("/api/summarize", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || typeof text !== "string" || !text.trim()) {
      return res.status(400).json({ error: "Text is required" });
    }

    // ✅ DEMO MODE (IMPORTANT FIX)
    if (process.env.DEMO_MODE === "true") {
      return res.json({
        summary: "The text describes a mixed experience with both positive and negative aspects.",
        keyPoints: [
          "The user liked the product",
          "There were issues with delivery",
          "Customer support was unsatisfactory"
        ],
        sentiment: "neutral"
      });
    }

    // 🔥 Real API call (only if demo=false)
    const result = await summarizeText(text);
    return res.json(result);

  } catch (error) {
    console.error("ERROR:", error.message);
    return res.status(500).json({ error: "Failed to summarize text" });
  }
});

//  Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});