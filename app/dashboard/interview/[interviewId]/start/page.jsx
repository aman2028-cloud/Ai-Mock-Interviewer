"use client";
import React, { use, useEffect, useState } from "react";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import QuestionSection from "./_components/QuestionSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft, ChevronRight, StopCircle } from "lucide-react";

const StartInterview = ({ params }) => {
  const { interviewId } = use(params);

  const [interviewData, setInterviewData] = useState(null);
  const [mockInterviewQuestions, setMockInterviewQuestions] = useState([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  useEffect(() => {
    if (interviewId) {
      GetInterviewDetails();
    }
  }, [interviewId]);

  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, interviewId));

    if (!result || result.length === 0) {
      console.error("No interview found");
      return;
    }

    const parsed = JSON.parse(result[0].jsonMockInterviewData);
    const questionsArray = Array.isArray(parsed) ? parsed : parsed.questions || [];

    setMockInterviewQuestions(questionsArray);
    setInterviewData(result[0]);
  };

  return (
    <div className=" bg-black text-gray-200 md:p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          
          {/* LEFT: Questions Section */}
          <div className="rounded-2xl border border-white/10 bg-gray-900/50 backdrop-blur-sm p-4 h-fit">
             <QuestionSection 
                questions={mockInterviewQuestions} 
                activeQuestionIndex={activeQuestionIndex}
             />
          </div>

          {/* RIGHT: Record Answer Section + Integrated Controls */}
          <div className="flex flex-col gap-6">
            <div className="rounded-2xl border border-white/10 bg-gray-900/50 backdrop-blur-sm p-4 relative min-h-112.5 flex flex-col justify-between">
              
              {/* The Recorder Component */}
              <RecordAnswerSection
                questions={mockInterviewQuestions}
                activeQuestionIndex={activeQuestionIndex}
                interviewData={interviewData}
              />

              {/* NAVIGATION BUTTONS - Now inside the Right Container bottom corner */}
              <div className="flex justify-end items-center gap-3 mt-8">
                {activeQuestionIndex > 0 && (
                  <Button 
                    variant="outline"
                    className="border-white/20 text-black cursor-pointer hover:bg-white/10 px-6"
                    onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" /> Previous
                  </Button>
                )}

                {activeQuestionIndex !== mockInterviewQuestions?.length - 1 && (
                  <Button 
                    className="bg-white cursor-pointer text-black hover:bg-gray-200 font-semibold px-8 shadow-lg shadow-white/5"
                    onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}
                  >
                    Next <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                )}

                {activeQuestionIndex === mockInterviewQuestions?.length - 1 && (
                  <Link href={`/dashboard/interview/${interviewId}/feedback`}>
                    <Button className="bg-red-600 cursor-pointer hover:bg-red-700 text-white font-semibold px-8 shadow-lg shadow-red-500/20">
                      End Interview <StopCircle className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                )}
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default StartInterview;