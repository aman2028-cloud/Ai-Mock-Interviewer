"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import { Mic, MicOff } from "lucide-react";
// import { chatSession } from "@/utils/geminichat";
import { GoogleGenAI } from "@google/genai";
import { useUser } from "@clerk/nextjs";
import { db } from "@/utils/db";
import { UserAnswers } from "@/utils/schema";

const ai = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
});
const chatSession = ai.chats.create({
  model: "gemini-2.5-flash",
});



const RecordAnswerSection = ({ questions, activeQuestionIndex,interviewData}) => {
  const recognitionRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [finalText, setFinalText] = useState("");
  const [interimText, setInterimText] = useState("");
  const [error, setError] = useState("");
  const [isWebcamOn, setIsWebcamOn] = useState(false);
  const {user}=useUser();
  const [loading, setLoading] = useState(false);

// console.log("Questions array:", questions);
// console.log("Active question:", questions?.[activeQuestionIndex]);


  useEffect(() => {
    if (finalText.trim()) {
      console.log("🎤 Final Transcript:", finalText);
    }
  }, [finalText]);


//   useEffect(() => {
//   setFinalText("");
//   setInterimText("");
//   setIsRecording(false);
//   setIsWebcamOn(false);
//   setError("");
//   setLoading(false);
//   recognitionRef.current?.stop();
// }, [interviewData?.mockId]);



  useEffect(() => {
    if (typeof window === "undefined") return;

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setError("Speech recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onstart = () => setIsRecording(true);
    recognition.onend = () => setIsRecording(false);

    recognition.onresult = (event) => {
      let interim = "";
      let final = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          final += transcript + " ";
        } else {
          interim += transcript;
        }
      }

      setFinalText((prev) => prev + final);
      setInterimText(interim);
    };

    recognition.onerror = (e) => {
      setError(e.error);
    };

    recognitionRef.current = recognition;

    return () => recognition.stop();
  }, []);

  const startRecording = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
      setIsWebcamOn(true);
      recognitionRef.current?.start();
    } catch (err) {
      console.error("Permission denied", err);
    }
  };

  const stopRecording = () => {
    recognitionRef.current?.stop();
    setIsWebcamOn(false);
  };

const saveUserAnswer = async () => {
  if (isRecording) {
    setLoading(true);
    if (finalText.length < 10) {
      setLoading(false);
      alert("Please provide a longer answer before stopping the recording.");
      return;
    }

    const feedbackPrompt = `
You are an expert interviewer.

STRICT RULES:
- Return ONLY valid JSON
- No markdown
- No extra text

Question:
${questions[activeQuestionIndex].question}

Correct Answer:
${questions[activeQuestionIndex].answer}

User Answer:
${finalText}

OUTPUT FORMAT:
{
  "rating": 1-5,
  "feedback": "3-5 lines of improvement"
}
`;

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          {
            role: "user",
            parts: [{ text: feedbackPrompt }],
          },
        ],
      });

      let rawText = "";

if (typeof response.text === "function") {
  rawText = response.text();
} else if (response.candidates?.length) {
  rawText = response.candidates[0].content.parts
    .map((p) => p.text || "")
    .join("");
} else {
  throw new Error("No text returned from Gemini");
}
      console.log(" Raw Feedback:", rawText);

      const parsed = JSON.parse(rawText.match(/\{[\s\S]*\}/)[0]);
      console.log("Parsed Feedback:", parsed);


//       console.log("Questions array:", questions);
// console.log("Active question:", questions?.[activeQuestionIndex]);



      const resp=await db.insert(UserAnswers).values({
        mockIdRef:interviewData?.mockId,
        question:questions[activeQuestionIndex].question,
        correctAns:questions[activeQuestionIndex].answer,
        userAns:finalText,
        feedback:parsed.feedback,
        rating:parsed.rating.toString(),
        userEmail:user?.emailAddresses[0]?.emailAddress || "guest",
        createdAt:new Date().toISOString(),
      }).returning();

      if(resp)
      {
        alert("Your answer and feedback have been saved!");
      }
      setLoading(false);
      setFinalText("");


      stopRecording();
    } catch (error) {
      console.error(" Gemini feedback error:", error);
    }
  } else {
    startRecording();
  }
};


  return (
    <div className="flex flex-col justify-center items-center">
      <div
        className="relative w-full flex justify-center items-center bg-black"
        style={{ height: 300 }}
      >
        <Image
          src="/record.png"
          alt="Record Answer"
          width={150}
          height={150}
          className="absolute z-0"
        />

        {isWebcamOn && (
          <Webcam
            mirrored
            className="z-10"
            style={{ width: "100%", height: "100%" }}
          />
        )}
      </div>


      <Button
        disabled={loading}
        variant="outline"
        className="my-6 cursor-pointer bg-blue-950"
        // onClick={isRecording ? stopRecording : startRecording}
        onClick={saveUserAnswer}
      >
        {isRecording ? (
          <>
            <MicOff className="w-5 h-5 text-red-500" />
            Stop Recording
          </>
        ) : (
          <>
            <Mic className="w-5 h-5" />
            Start Recording
          </>
        )}
      </Button>

      {error && <p className="text-black">{"Please allow the microphone access"}</p>}
    </div>
  );
};

export default RecordAnswerSection;

