"use client";

import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LoaderCircle, Plus } from "lucide-react";
import { generateInterviewQuestions } from "@/utils/gemini";
import { useRouter } from "next/navigation";

const AddNewInterview = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [jobRole, setJobRole] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [experience, setExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { user } = useUser();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("User not loaded yet.");

    setLoading(true);
    let res;

    try {
      res = await generateInterviewQuestions({
        jobRole,
        jobDescription,
        experience,
      });
    } catch (err) {
      console.error("AI generation error:", err);
      setLoading(false);
      return alert("Failed to generate interview questions.");
    }

    if (!res?.questions?.length) {
      setLoading(false);
      return alert("No questions were generated. Try again.");
    }

    try {
      const resp = await fetch("/api/interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userEmail: user?.emailAddresses?.[0]?.emailAddress || "unknown",
          jobRole,
          jobDescription,
          experience: parseInt(experience) || 0,
          questions: res.questions,
          jsonData: res,
        }),
      });

      const data = await resp.json();

      if (data?.[0]?.mockId) {
        setDialogOpen(false);
        router.push("/dashboard/interview/" + data[0].mockId);
      }
    } catch (err) {
      console.error("Failed to save interview:", err);
      alert("Failed to save interview to DB.");
    }

    setLoading(false);
  };

  return (
    <div>
      {/* INTERVIEW CARD */}
      <div
        onClick={() => setDialogOpen(true)}
        className="group cursor-pointer rounded-2xl border border-white/10 bg-black/50 backdrop-blur-xl p-10
                   flex flex-col items-center justify-center gap-3 text-white
                   transition-all hover:scale-105 hover:shadow-xl"
      >
        <Plus className="w-8 h-8 text-indigo-400 group-hover:text-indigo-300" />
        <h2 className="font-semibold text-lg">Add New Interview</h2>
        <p className="text-sm text-gray-400 text-center">
          Generate AI-powered mock interview questions
        </p>
      </div>

      {/* DIALOG */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl bg-black/90 backdrop-blur-xl border border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us about your interview
            </DialogTitle>
            <DialogDescription asChild>
              <form onSubmit={onSubmit} className="space-y-5 mt-4">
                <p className="text-sm text-gray-400">
                  Provide details about the job role and your experience.
                </p>

                <div>
                  <label className="font-medium">Job Role / Position</label>
                  <Input
                    className="mt-1 bg-[#111] border-white/10 text-white"
                    placeholder="Frontend Developer"
                    value={jobRole}
                    onChange={(e) => setJobRole(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="font-medium">
                    Job Description / Tech Stack
                  </label>
                  <Textarea
                    className="mt-1 bg-[#111] border-white/10 text-white"
                    placeholder="React, Next.js, Tailwind..."
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="font-medium">Years of Experience</label>
                  <Input
                    className="mt-1 bg-[#111] border-white/10 text-white"
                    type="number"
                    min="0"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    required
                  />
                </div>

                <div className="flex justify-end gap-3 pt-6">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setDialogOpen(false)}
                  >
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="bg-indigo-600 hover:bg-indigo-700"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <LoaderCircle className="animate-spin" />
                        Generating...
                      </span>
                    ) : (
                      "Start Interview"
                    )}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewInterview;
