const express = require("express");
const bodyParser = require("body-parser");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const modalApp = express();

modalApp.use(bodyParser.json());

const key=process.env.GEMINI_API_KEY
const genAI = new GoogleGenerativeAI(key);

modalApp.post("/generate-pitch", async (req, res) => {
  const pitchData = req.body;

  const prompt = `
    Generate a professional and structured startup pitch using the following inputs:
    
    Title: ${pitchData.title}
    Target Audience: ${pitchData.targetAudience}
    Problem: ${pitchData.problem}
    Solution: ${pitchData.solution}
    Features: ${pitchData.features}
    Market Potential: ${pitchData.marketPotential}
    Timeline: ${pitchData.timeline}
    Budget: ${pitchData.budget}

    Provide clear and concise paragraphs for each section.
  `;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);
    const response = result.response;
    const generatedPitch = response.text();

    res.json({ success: true, generatedPitch });
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ success: false, error: "Failed to generate pitch." });
  }
});



module.exports = modalApp;
