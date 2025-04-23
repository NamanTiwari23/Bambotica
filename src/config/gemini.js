import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini API with your API key
const ai = new GoogleGenerativeAI("AIzaSyAZdJroTN6jksZ4MXq7i07tgeXbNO_zUrU");

export async function main(prompt) {
  try {
    console.log("Prompt being sent:", prompt);

    const model = ai.getGenerativeModel({ model: "gemini-2.5-flash-preview-04-17" });

    // Just send the prompt as-is without any formatting instructions
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log("AI response:", text);
    return text;

  } catch (error) {
    console.error("Error generating content:", error);
    throw error;
  }
}
