import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini API with your API key
const ai = new GoogleGenerativeAI("AIzaSyAZdJroTN6jksZ4MXq7i07tgeXbNO_zUrU");


export async function main(prompt) {
  try {
    console.log("Prompt being sent:", prompt);

    const model = ai.getGenerativeModel({ model: "gemini-2.5-flash-preview-04-17" });

    // Instruct Gemini to format response in clean HTML
    const wrappedPrompt = `
      Respond to the following in professional, clean HTML format. 
      Use <h2> for main headings, <strong> for key terms, <ul><li> for lists.
      Avoid using any external CSS or scripts. The response must be valid and well-structured HTML only.

      Prompt: ${prompt}
    `;

    const result = await model.generateContent(wrappedPrompt);
    const response = await result.response;
    const text = response.text();

    console.log("AI response:", text);
    return text;

  } catch (error) {
    console.error("Error generating content:", error);
    throw error;
  }
}

