"use client";
import React from 'react'
import AddNewInterview from './_components/AddNewInterview'
import InterviewList from './_components/InterviewList';
import { Sparkles } from 'lucide-react';

const Dashboard = () => {
  return (
    // min-h-screen ensures the black background covers the whole page
    <div className="min-h-screen bg-black text-gray-200">

      <div className="max-w-7xl mx-auto px-8 py-12">

        {/* Welcome Section */}
        <div className="space-y-2 mb-10">
          <h2 className="font-bold text-4xl tracking-tight text-white">
            Dashboard
          </h2>
          <div className="flex items-center gap-2 text-gray-400">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <p className="text-lg font-medium">
              Create and start your AI-powered mock interview
            </p>
          </div>
        </div>

        {/* Action Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="transition-transform duration-300 hover:scale-[1.01]">
            <AddNewInterview />
          </div>
          {/* You can add more summary cards here later (e.g., Total Interviews, Avg Score) */}
        </div>

        {/* Previous Activity Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h3 className="text-xl font-semibold text-white/90">
              Recent Interviews
            </h3>
          </div>

          <div className="rounded-2xl bg-gray-900/20 backdrop-blur-md">
            <InterviewList />
          </div>
        </div>

      </div>
    </div>
  )
}

export default Dashboard




