"use client";
import { db } from "@/utils/db";
import { UserAnswers } from "@/utils/schema";
import { ChevronDown, Trophy, Home } from "lucide-react";
import React, { useEffect, useState } from "react";
import { eq } from "drizzle-orm";
import { use } from "react";
import { useRouter } from "next/navigation";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";

const Feedback = ({ params }) => {
  const { interviewId } = use(params);
  const [feedbackData, setFeedbackData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (interviewId) {
      GetFeedback();
    }
  }, [interviewId]);

  const GetFeedback = async () => {
    const result = await db
      .select()
      .from(UserAnswers)
      .where(eq(UserAnswers.mockIdRef, interviewId))
      .orderBy(UserAnswers.id);
    setFeedbackData(result);
  };

  // Optional: Calculate average rating dynamically
  const calculateAverageRating = () => {
    if (feedbackData.length === 0) return 0;
    const total = feedbackData.reduce((acc, item) => acc + Number(item.rating), 0);
    return (total / feedbackData.length).toFixed(1);
  };

  return (
    <div className="min-h-screen bg-black text-gray-200 p-5 md:p-10">
      <div className="max-w-5xl mx-auto">
        {feedbackData?.length == 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <h2 className="font-bold text-3xl text-gray-600">No Interview Feedback found.</h2>
            <Button 
                onClick={() => router.replace("/dashboard")} 
                className="mt-5 bg-white text-black hover:bg-gray-200"
            >
                Go Back to Dashboard
            </Button>
          </div>
        ) : (
          <>
            <div className="mb-10">
              <h2 className="text-4xl font-extrabold bg-linear-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
                Congratulations!
              </h2>
              <h2 className="font-bold text-2xl mt-2">Here is your Interview Feedback</h2>
              
              <div className="flex items-center gap-3 mt-5 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 w-fit">
                <Trophy className="text-blue-400 w-6 h-6" />
                <h2 className="text-blue-400 text-lg">
                  Your Overall Interview Rating: <strong>{calculateAverageRating()}/5</strong>
                </h2>
              </div>
              
              <p className="text-gray-500 mt-4 text-sm">
                Review your responses below to understand areas of improvement.
              </p>
            </div>

            {feedbackData &&
              feedbackData.map((item, index) => (
                <Collapsible key={index} className="group mb-4">
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-5 rounded-xl bg-gray-900/50 border border-white/10 hover:border-white/20 transition-all text-left">
                    <span className="font-medium flex gap-3">
                      <span className="text-gray-500">0{index + 1}.</span>
                      {item.question}
                    </span>
                    <ChevronDown className="w-5 h-5 text-gray-500 group-data-[state=open]:rotate-180 transition-transform" />
                  </CollapsibleTrigger>

                  <CollapsibleContent className="mt-2 rounded-xl bg-gray-900/80 border border-white/5 p-6 space-y-5 animate-in fade-in slide-in-from-top-2">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-bold border border-red-500/20">
                        Rating: {item.rating}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                      <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/10">
                        <h3 className="font-bold text-green-500 mb-2 uppercase tracking-wider text-[10px]">Correct Answer</h3>
                        <p className="text-gray-300 leading-relaxed">{item.correctAns}</p>
                      </div>

                      <div className="p-4 rounded-lg bg-blue-500/5 border border-blue-500/10">
                        <h3 className="font-bold text-blue-400 mb-2 uppercase tracking-wider text-[10px]">Your Answer</h3>
                        <p className="text-gray-300 leading-relaxed">{item.userAns}</p>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/10">
                      <h3 className="font-bold text-red-400 mb-2 uppercase tracking-wider text-[10px]">Feedback for Improvement</h3>
                      <p className="text-gray-300 leading-relaxed">{item.feedback}</p>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))}

            <div className="mt-10 pb-20 " >
              <Button 
                onClick={() => router.replace("/dashboard")}
                className="bg-white text-black hover:bg-gray-200 font-semibold px-10 h-12 rounded-full transition-all cursor-pointer"
              >
                <Home className="  w-4 h-4 mr-2" />
                Go to Dashboard
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Feedback;