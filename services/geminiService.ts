
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generatePropertyDescription = async (details: {
  title: string;
  type: string;
  location: string;
  amenities: string[];
}) => {
  const prompt = `Write a high-end, persuasive real estate description for a ${details.type} called "${details.title}" located in ${details.location}. 
  Include these amenities: ${details.amenities.join(', ')}. 
  Make it sound luxury and professional for the Nigerian market.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.7,
      }
    });
    return response.text;
  } catch (error) {
    console.error('Gemini error:', error);
    return null;
  }
};

export const smartSearch = async (query: string, properties: any[]) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Based on this user query: "${query}", filter the following properties and return the IDs of the most relevant ones. 
    Properties: ${JSON.stringify(properties.map(p => ({ id: p.id, title: p.title, location: p.location, price: p.price })))}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          relevantIds: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        }
      }
    }
  });
  
  const result = JSON.parse(response.text || '{"relevantIds": []}');
  return result.relevantIds;
};
