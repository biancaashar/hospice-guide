import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateConversationScript = async (topic: string, relationship: string, context: string): Promise<string> => {
  try {
    const prompt = `
      You are a compassionate communication coach helping a user navigate a difficult end-of-life care conversation.
      
      Scenario: The user needs to speak TO their "${relationship}".
      Topic: "${topic}".
      Context: "${context}".

      Please generate a script and guide specifically for the USER to say. 
      The speaker in this script is the USER. The listener is the "${relationship}".

      Instructions:
      - If the listener is a medical professional (e.g. Doctor), the script should help the user sound empowered, clear, and advocate for their needs.
      - If the listener is a family member, the tone should be loving, gentle, and vulnerable.
      - Do NOT write the script as if you are the ${relationship} (e.g. do not speak as the Doctor).

      Structure the response as:
      1. **Preparation**: A brief tip on mindset before starting.
      2. **The Opener**: A specific sentence for the user to start the conversation.
      3. **Key Talking Points**: 2-3 specific scripts/questions the user can say to address the topic.
      4. **Closing**: A gentle way to wrap up the conversation.

      Keep the tone warm, supportive, and practical.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Unable to generate script at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "An error occurred while generating the script. Please try again later.";
  }
};