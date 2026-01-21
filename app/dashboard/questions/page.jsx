"use client";
import React from 'react';
import { HelpCircle, BookOpen, Lightbulb, Code2, BrainCircuit } from 'lucide-react';

const Questions = () => {
  return (
    <div className="min-h-screen bg-black text-gray-200 flex flex-col">
      <div className="max-w-4xl mx-auto px-8 py-16 grow">
        
        {/* Simple Header */}
        <div className="mb-12 border-b border-white/10 pb-8">
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center gap-3">
            <HelpCircle className="text-blue-500 w-8 h-8" />
            Interview Library
          </h1>
          <p className="text-gray-400 text-lg">
            A curated collection of essential questions to sharpen your interview performance.
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-12">
          
          {/* Section 1: Technical Fundamentals */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-blue-400 font-semibold uppercase tracking-widest text-xs">
              <Code2 className="w-4 h-4" />
              Core Engineering
            </div>
            <div className="bg-gray-900/40 p-6 rounded-2xl border border-white/5 space-y-6">
              <div className="border-b border-white/5 pb-4">
                <p className="text-white font-medium">1. How do you optimize a slow React application?</p>
                <p className="text-gray-400 text-sm mt-2 leading-relaxed">
                  Focus on reducing re-renders using <code className="text-blue-300">memo</code>, 
                  <code className="text-blue-300">useMemo</code>, and <code className="text-blue-300">useCallback</code>. 
                  Also, consider code-splitting with Dynamic Imports and optimizing asset delivery.
                </p>
              </div>
              <div className="border-b border-white/5 pb-4">
                <p className="text-white font-medium">2. What is the difference between SQL and NoSQL?</p>
                <p className="text-gray-400 text-sm mt-2 leading-relaxed">
                  SQL databases are relational, structured, and use predefined schemas (best for complex queries). 
                  NoSQL databases are non-relational, flexible, and scale horizontally (best for unstructured data).
                </p>
              </div>
              <div>
                <p className="text-white font-medium">3. Explain REST vs. GraphQL.</p>
                <p className="text-gray-400 text-sm mt-2 leading-relaxed">
                  REST exposes multiple endpoints for different resources, while GraphQL uses a single endpoint 
                  allowing clients to request exactly the data they need, preventing over-fetching.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: Behavioral Prep */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-yellow-500 font-semibold uppercase tracking-widest text-xs">
              <Lightbulb className="w-4 h-4" />
              Soft Skills & Culture
            </div>
            <div className="bg-gray-900/40 p-6 rounded-2xl border border-white/5 space-y-6">
              <div className="border-b border-white/5 pb-4">
                <p className="text-white font-medium">How do you handle tight deadlines?</p>
                <p className="text-gray-400 text-sm mt-2 font-light italic leading-relaxed">
                  "I prioritize tasks using the Eisenhower Matrix, communicate early if blockers arise, 
                  and focus on delivering a Minimum Viable Product (MVP) first."
                </p>
              </div>
              <div>
                <p className="text-white font-medium">Describe a time you failed.</p>
                <p className="text-gray-400 text-sm mt-2 font-light italic leading-relaxed">
                  Avoid saying "I never fail." Instead, pick a genuine mistake, explain what you learned, 
                  and how you implemented a system to ensure it never happened again.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Data & Logic */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-purple-400 font-semibold uppercase tracking-widest text-xs">
              <BrainCircuit className="w-4 h-4" />
              Advanced Concepts
            </div>
            <div className="bg-gray-900/40 p-6 rounded-2xl border border-white/5 space-y-4">
              <div>
                <p className="text-white font-medium">What is "Time Complexity" and why does it matter?</p>
                <p className="text-gray-400 text-sm mt-2 leading-relaxed">
                  It quantifies the amount of time an algorithm takes to run as the input size grows. 
                  Understanding Big O notation helps in building scalable applications that don't crash under load.
                </p>
              </div>
            </div>
          </section>

        </div>
      </div>

      {/* FOOTER */}
      <footer className="w-full border-t border-white/10 bg-black py-10">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-white text-black flex items-center justify-center font-bold text-sm">
              AI
            </div>
            <span className="text-white font-semibold tracking-tight">
              Interview Mocker
            </span>
          </div>
          
          <p className="text-gray-500 text-sm">
            © 2026 AI Interview Mocker. All rights reserved.
          </p>

          <div className="flex gap-6 text-sm text-gray-400">
            <span className="hover:text-white transition-colors cursor-default">Privacy</span>
            <span className="hover:text-white transition-colors cursor-default">Terms</span>
            <span className="hover:text-white transition-colors cursor-default">Contact</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Questions;