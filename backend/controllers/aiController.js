import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import Course from "../models/courseModel.js";
dotenv.config();


export const searchWithAi = async (req, res) => {

  try {
    const { input } = req.body;

    if (!input) {
      return res.status(400).json({ message: "Search query is required" });
    }
    // case-insensitive
    const ai = new GoogleGenAI({});
    const prompt = `You are an intelligent assistant for an LMS platform. A user will type any query about what they want to learn. Your task is to understand the intent and return one **most relevant keyword** from the following list of course categories and levels:

- App Development  
- AI/ML  
- AI Tools  
- Data Science  
- Data Analytics  
- Ethical Hacking  
- UI UX Designing  
- Web Development  
- Others  
- Beginner  
- Intermediate  
- Advanced  

Only reply with one single keyword from the list above that best matches the query. Do not explain anything. No extra text.

Query: ${input}
`

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    // Attempt to extract text from common response shapes, then fallback to empty string
    let keyword = "";
    if (!keyword && response) {
      if (typeof response.text === 'string') keyword = response.text;
      else if (response.output && Array.isArray(response.output) && response.output.length) {
        keyword = String(response.output[0]).trim();
      } else if (response.candidates && Array.isArray(response.candidates) && response.candidates[0]) {
        // some SDKs use candidates with content
        keyword = response.candidates[0].content || response.candidates[0].text || "";
      }
    }
    if (keyword) keyword = keyword.trim();



    const courses = await Course.find({
      isPublished: true,
      $or: [
        { title: { $regex: input, $options: 'i' } },
        { subTitle: { $regex: input, $options: 'i' } },
        { description: { $regex: input, $options: 'i' } },
        { category: { $regex: input, $options: 'i' } },
        { level: { $regex: input, $options: 'i' } }
      ]
    });

    if (courses.length > 0) {
      return res.status(200).json(courses);
    } else {
      // If AI returned nothing useful, try a simple local keyword extraction fallback
      if (!keyword || keyword.length === 0) {
        const fallbackList = [
          'App Development', 'AI/ML', 'AI Tools', 'Data Science', 'Data Analytics', 'Ethical Hacking',
          'UI UX Designing', 'Web Development', 'Others', 'Beginner', 'Intermediate', 'Advanced'
        ];
        const lowerInput = input.toLowerCase();
        for (const item of fallbackList) {
          const key = item.toLowerCase();
          if (lowerInput.includes(key.split(' ')[0])) { // match first word
            keyword = item;
            break;
          }
        }
      }
      const courses = await Course.find({
        isPublished: true,
        $or: [
          { title: { $regex: keyword, $options: 'i' } },
          { subTitle: { $regex: keyword, $options: 'i' } },
          { description: { $regex: keyword, $options: 'i' } },
          { category: { $regex: keyword, $options: 'i' } },
          { level: { $regex: keyword, $options: 'i' } }
        ]
      });
      return res.status(200).json(courses);
    }


  } catch (error) {
    console.error('AI search error:', error?.message || error);
    // Fallback: perform a local regex search using the user's input so the feature still returns results
    try {
      const fallbackInput = (req.body && req.body.input) ? req.body.input : '';
      if (!fallbackInput) {
        return res.status(500).json({ message: 'AI search failed and no fallback input available', error: error?.message || String(error) });
      }
      const fallbackCourses = await Course.find({
        isPublished: true,
        $or: [
          { title: { $regex: fallbackInput, $options: 'i' } },
          { subTitle: { $regex: fallbackInput, $options: 'i' } },
          { description: { $regex: fallbackInput, $options: 'i' } },
          { category: { $regex: fallbackInput, $options: 'i' } },
          { level: { $regex: fallbackInput, $options: 'i' } }
        ]
      });
      console.warn('AI service unavailable - returning fallback search results');
      // Return the array directly so frontend code expecting an array continues to work
      return res.status(200).json(fallbackCourses);
    } catch (e) {
      console.error('Fallback search error:', e?.message || e);
      return res.status(500).json({ message: 'AI search failed', error: error?.message || String(error) });
    }
  }
}