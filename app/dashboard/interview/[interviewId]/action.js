"use server";

import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";

export async function getInterviewQuestions(interviewId) {
  const result = await db
    .select({
      jsonMockInterviewData: MockInterview.jsonMockInterviewData,
    })
    .from(MockInterview)
    .where(eq(MockInterview.mockId, interviewId));

  const raw = result[0]?.jsonMockInterviewData;

  // handle stringified JSON just in case
  return typeof raw === "string" ? JSON.parse(raw) : raw;
}
