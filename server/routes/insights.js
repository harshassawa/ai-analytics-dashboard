const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { data } = req.body;

  if (!data || data.length === 0) {
    return res.status(400).json({ error: "No data provided" });
  }

  const preview = JSON.stringify(data.slice(0, 20));

  const prompt = `You are a data analyst. Analyze this dataset and provide:
1. A 2-3 line summary of what this data is about
2. 3 key insights or trends you notice
3. 1 recommendation based on the data

Data (first 20 rows): ${preview}

Respond in plain text, no markdown.`;

  try {
    // Add this console log to verify API key is loading
    console.log("API Key loaded:", process.env.CLAUDE_API_KEY ? "YES" : "NO");

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.CLAUDE_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1024,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    // Log the raw response status
    console.log("Claude API response status:", response.status);

    const result = await response.json();

    // Log full result to see what Claude returned
    console.log("Claude API result:", JSON.stringify(result));

    if (!response.ok) {
      return res.status(500).json({ error: result.error?.message || "Claude API error" });
    }

    const insight = result.content[0].text;
    res.json({ insight });

  } catch (error) {
    console.error("Insight error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;