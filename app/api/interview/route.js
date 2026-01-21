// import { db } from "@/utils/db";
// import { MockInterview } from "@/utils/schema";
// import { v4 as uuidv4 } from "uuid";

// export async function POST(req) {
//   try {
//     const { userEmail, jobRole, jobDescription, experience, questions, jsonData } = await req.json();

//     const inserted = await db.insert(MockInterview).values({
//       mockId: uuidv4(),
//       createdAt: new Date().toISOString(),
//       createdBy: userEmail || "unknown",
//       jobPos: jobRole,
//       jobDesc: jobDescription,
//         jobExperience: experience,
//       questions,
//       jsonMockInterviewData: JSON.stringify(jsonData),
//     }).returning({ mockId: MockInterview.mockId });

//     return new Response(JSON.stringify(inserted), { status: 200 });
//   } catch (err) {
//     console.error("DB insert error:", err);
//     return new Response(JSON.stringify({ error: "DB insert failed" }), { status: 500 });
//   }
// }



import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { v4 as uuidv4 } from "uuid";

export async function POST(req) {
  try {
    const {
      userEmail,
      jobRole,
      jobDescription,
      experience,
      questions, // now array of objects [{id, question, answer}]
      jsonData,
    } = await req.json();

    // Validate questions array
    if (!Array.isArray(questions) || questions.length === 0) {
      return new Response(
        JSON.stringify({ error: "Questions array is empty or invalid" }),
        { status: 400 }
      );
    }

    const mockId = uuidv4();

    const inserted = await db
      .insert(MockInterview)
      .values({
        mockId,
        createdAt: new Date().toISOString(),
        createdBy: userEmail || "unknown",
        jobPos: jobRole,
        jobDesc: jobDescription,
        jobExperience: experience,
        questions: JSON.stringify(questions), // store questions with answers
        jsonMockInterviewData: JSON.stringify(jsonData), // full AI response
      })
      .returning({ mockId: MockInterview.mockId });

    return new Response(JSON.stringify(inserted), { status: 200 });
  } catch (err) {
    console.error("DB insert error:", err);
    return new Response(
      JSON.stringify({ error: "DB insert failed", details: err.message }),
      { status: 500 }
    );
  }
}
