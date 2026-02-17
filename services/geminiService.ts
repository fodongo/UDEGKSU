import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const refineBiography = async (text: string): Promise<string> => {
  if (!apiKey) {
    console.warn("API Key is missing. Returning original text.");
    return text;
  }

  try {
    const prompt = `Actúa como un editor académico profesional. Reescribe y mejora la siguiente biografía para un perfil de investigador. 
    
    Reglas:
    1. Mantén el tono profesional y académico.
    2. Resume el contenido para que tenga un máximo de 150 palabras.
    3. Corrige cualquier error gramatical.
    4. El idioma debe ser Español.
    
    Biografía original:
    "${text}"`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || text;
  } catch (error) {
    console.error("Error refining biography with Gemini:", error);
    return text; // Fallback to original
  }
};