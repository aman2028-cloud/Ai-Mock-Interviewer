import { db } from "@/utils/db";
import { UserAnswers } from "@/utils/schema";

export async function POST(req) {
  try {
    const { mockId, questionId, userAnswer } = await req.json();

    if (!mockId || !questionId || !userAnswer) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      );
    }

    await db.insert(UserAnswers).values({
      mockId,
      questionId,
      userAnswer,
      createdAt: new Date().toISOString(),
    });

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Save User Answer Error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to save user answer" }),
      { status: 500 }
    );
  }
}
