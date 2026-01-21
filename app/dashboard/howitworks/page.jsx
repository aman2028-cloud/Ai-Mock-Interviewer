"use client";
import React from 'react';
import { Settings, Mic, MessageSquareQuote, LineChart, ChevronRight } from 'lucide-react';

const Howitworks = () => {
  const steps = [
    {
      id: 1,
      icon: <Settings className="w-6 h-6 text-blue-500" />,
      title: "Setup Interview",
      desc: "Provide your job role, job description, and years of experience to help our AI generate tailored questions."
    },
    {
      id: 2,
      icon: <Mic className="w-6 h-6 text-purple-500" />,
      title: "Record Answers",
      desc: "Enable your camera and microphone. Speak your answers naturally as if you are in a real interview."
    },
    {
      id: 3,
      icon: <MessageSquareQuote className="w-6 h-6 text-green-500" />,
      title: "AI Analysis",
      desc: "Our Gemini-powered AI transcribes your speech and analyzes your response against industry standards."
    },
    {
      id: 4,
      icon: <LineChart className="w-6 h-6 text-yellow-500" />,
      title: "Get Feedback",
      desc: "Receive an instant rating and detailed feedback on how to improve your answers and communication."
    }
  ];

  return (
    <div className="min-h-screen bg-black text-gray-200 flex flex-col">
      <div className="max-w-6xl mx-auto px-8 py-16 grow">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-blue-500 font-semibold tracking-widest uppercase text-sm mb-3">Process</h2>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">How it Works</h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Master your next interview in four simple steps. Our AI technology helps you practice, 
            refine, and succeed.
          </p>
        </div>

        {/* Steps Grid */}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.id} className="relative group">
              <div className="p-8 rounded-3xl border border-white/10 bg-gray-900/40 backdrop-blur-sm h-full hover:border-white/20 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {step.desc}
                </p>
                
                {/* Step Number Badge */}
                <span className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gray-800 border border-white/10 flex items-center justify-center text-xs font-bold text-gray-400">
                  {step.id}
                </span>
              </div>

              {/* Arrow Connector (only for desktop) */}
              {index !== steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-6 -translate-y-1/2 z-10">
                  <ChevronRight className="w-6 h-6 text-white/10" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Call to Action Note */}
        <div className="mt-20 p-8 rounded-3xl bg-linear-to-r from-blue-600/10 to-purple-600/10 border border-blue-500/20 text-center">
          <h3 className="text-white font-semibold text-xl mb-2">Ready to give it a try?</h3>
          <p className="text-gray-400 text-sm mb-0">Navigate to your dashboard to start your first mock session.</p>
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

export default Howitworks;