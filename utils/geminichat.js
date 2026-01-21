"use client";

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
});

export const chatSession = ai.chats.create({
  model: "gemini-2.5-flash",
});