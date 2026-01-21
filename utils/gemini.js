// "use server";

// import { GoogleGenAI } from "@google/genai";

// const ai = new GoogleGenAI({
//   apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY
// ,
// });

// export async function generateInterviewQuestions({
//   jobRole,
//   jobDescription,
//   experience,
// }) {
//   const prompt = `
// Job Position: ${jobRole}
// Job Description and Tech Stack: ${jobDescription}
// Years of Experience: ${experience}

// Generate exactly 5 interview questions.
// Return ONLY valid JSON in this format:
// {
//   "questions": [
//     "question 1",
//     "question 2",
//     "question 3",
//     "question 4",
//     "question 5"
//   ]
// }
// `;

//   const response = await ai.models.generateContent({
//     model: "gemini-2.5-flash", 
//     contents: [
//       {
//         role: "user",
//         parts: [{ text: prompt }],
//       },
//     ],
//   });

//   const text = response.text;
//   return JSON.parse(text);
// }


"use server";

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
});

export async function generateInterviewQuestions({
  jobRole,
  jobDescription,
  experience,
}) {
  const prompt = `
You are an expert technical interviewer.

STRICT RULES:
- Return ONLY valid JSON
- Do NOT add explanations, markdown, or text
- Do NOT wrap response in \`\`\`
- JSON must be parsable by JSON.parse()

CONTEXT:
Job Role: ${jobRole}
Job Description / Tech Stack: ${jobDescription}
Experience: ${experience} years

TASK:
Generate exactly 5 interview questions WITH answers.

OUTPUT FORMAT (EXACT):
{
  "questions": [
    {
      "id": 1,
      "question": "string",
      "answer": "string"
    }
  ]
}
`;


  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash", // supported Gemini model
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    });

    // Get raw text
    let text = response.text.trim();

    // Remove markdown code fences if present
    if (text.startsWith("```")) {
      text = text.replace(/```(json)?/g, "").trim();
    }

    // Extract JSON object using regex as a fallback
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) throw new Error("No JSON object found in Gemini output");

    return JSON.parse(match[0]);
  } catch (error) {
    console.error("Error generating interview questions:", error);
    throw new Error("Failed to generate interview questions. " + error.message);
  }
}





// "use server";

// import { GoogleGenAI } from "@google/genai";

// const ai = new GoogleGenAI({
//   apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
// });

// /**
//  * Generate 5 interview questions with answers using Gemini AI.
//  * Includes retry logic for overloaded model and robust parsing.
//  */
// export async function generateInterviewQuestions({
//   jobRole,
//   jobDescription,
//   experience,
//   retries = 3, // number of retry attempts
//   delayMs = 2000, // delay between retries in milliseconds
// }) {
//   const prompt = `
// You are an expert technical interviewer.

// STRICT RULES:
// - Return ONLY valid JSON
// - Do NOT add explanations, markdown, or text
// - Do NOT wrap response in \`\`\`
// - JSON must be parsable by JSON.parse()

// CONTEXT:
// Job Role: ${jobRole}
// Job Description / Tech Stack: ${jobDescription}
// Experience: ${experience} years

// TASK:
// Generate exactly 5 interview questions WITH answers.

// OUTPUT FORMAT (EXACT):
// {
//   "questions": [
//     {
//       "id": 1,
//       "question": "string",
//       "answer": "string"
//     }
//   ]
// }
// `;

//   for (let attempt = 1; attempt <= retries; attempt++) {
//     try {
//       const response = await ai.models.generateContent({
//         model: "gemini-2.5-flash",
//         contents: [{ role: "user", parts: [{ text: prompt }] }],
//       });

//       // Get raw text
//       let text = typeof response.text === "function" ? response.text() : response.text || "";
//       text = text.trim();

//       // Remove markdown code fences if present
//       if (text.startsWith("```")) {
//         text = text.replace(/```(json)?/g, "").trim();
//       }

//       // Extract JSON object
//       const match = text.match(/\{[\s\S]*\}/);
//       if (!match) throw new Error("No JSON object found in Gemini output");

//       const parsed = JSON.parse(match[0]);

//       // Validate output structure
//       if (!parsed.questions || !Array.isArray(parsed.questions) || parsed.questions.length !== 5) {
//         throw new Error("AI returned invalid questions array");
//       }

//       // Ensure each question has both 'question' and 'answer'
//       parsed.questions.forEach((q, idx) => {
//         if (!q.question || !q.answer) {
//           throw new Error(`Question ${idx + 1} is missing 'question' or 'answer' field`);
//         }
//       });

//       return parsed.questions; // return only the questions array

//     } catch (error) {
//       console.error(`Attempt ${attempt} - AI generation error:`, error);

//       // If last retry, throw
//       if (attempt === retries) {
//         throw new Error(
//           `Failed to generate interview questions after ${retries} attempts. Last error: ${error.message}`
//         );
//       }

//       // Wait before retrying
//       await new Promise((res) => setTimeout(res, delayMs));
//     }
//   }
// }
