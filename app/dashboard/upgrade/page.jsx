"use client";
import React from "react";
import PricingPlan from "@/app/_data/PricingPlan";
import { useUser } from "@clerk/nextjs";
import { Check, Sparkles, ShieldCheck, Zap } from "lucide-react";

const Upgrade = () => {
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-black text-gray-200 flex flex-col">
      <div className="mx-auto max-w-5xl px-8 py-16 grow">

        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-blue-500 font-semibold tracking-widest uppercase text-sm mb-3">Pricing</h2>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Elevate Your Preparation</h1>
          <p className="text-gray-400 max-w-xl mx-auto text-lg">
            Upgrade to unlock unlimited AI mock interviews, advanced analytics, and priority support.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:items-stretch md:gap-12">
          {Array.isArray(PricingPlan) &&
            PricingPlan.map((plan, index) => (
              <div
                key={index}
                className={`relative flex flex-col rounded-3xl border p-8 transition-all duration-300 ${plan.price > 0
                  ? "border-blue-500/50 bg-blue-500/5 shadow-[0_0_30px_-15px_rgba(59,130,246,0.5)]"
                  : "border-white/10 bg-gray-900/40 backdrop-blur-sm"
                  }`}
              >
                {/* Special Tag for Premium */}
                {plan.price > 0 && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-950 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Recommended
                  </div>
                )}

                <div className="text-center grow">
                  <h2 className="text-xl font-bold text-white">
                    {plan.title}
                  </h2>

                  <p className="mt-6 flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-extrabold text-white">
                      ${plan.price}
                    </span>
                    <span className="text-gray-500 font-medium">
                      /{plan.duration}
                    </span>
                  </p>

                  <ul className="mt-10 space-y-4 text-left">
                    {(plan.features ?? []).map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className={`size-5 shrink-0 ${plan.price > 0 ? 'text-blue-400' : 'text-gray-500'}`} />
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={plan.link + '?prefilled_email=' + user?.primaryEmailAddress.emailAddress}
                  target="_blank"
                  className="mt-10"
                >
                  <button className={`cursor-pointer w-full rounded-full py-4 text-sm font-bold transition-all ${plan.price > 0
                    ? "bg-blue-950 text-white hover:bg-blue-700 shadow-lg shadow-blue-900/20"
                    : "bg-white text-black hover:bg-gray-200"
                    }`}>
                    Get Started
                  </button>
                </a>
              </div>
            ))}
        </div>

        {/* Bottom Trust Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-white/10 pt-10">
          <div className="flex flex-col items-center text-center gap-3">
            <Zap className="w-6 h-6 text-yellow-500" />
            <h4 className="text-white font-medium">Instant Analysis</h4>
            <p className="text-gray-500 text-xs text-balance">Get feedback within seconds of finishing your recording.</p>
          </div>
          <div className="flex flex-col items-center text-center gap-3">
            <ShieldCheck className="w-6 h-6 text-green-500" />
            <h4 className="text-white font-medium">Secure & Private</h4>
            <p className="text-gray-500 text-xs text-balance">Your recordings and data are encrypted and never shared.</p>
          </div>
          <div className="flex flex-col items-center text-center gap-3">
            <Sparkles className="w-6 h-6 text-purple-500" />
            <h4 className="text-white font-medium">Gemini Pro 1.5</h4>
            <p className="text-gray-500 text-xs text-balance">Powered by the latest LLMs for human-like interview accuracy.</p>
          </div>
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

export default Upgrade;