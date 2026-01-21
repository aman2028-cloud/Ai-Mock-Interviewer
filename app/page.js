// import { Button } from "@/components/ui/button";

// export default function Home() {
//   return (
//     <div >
//       <h1>hello</h1>
//       <Button>gvgchbhjhjg</Button>
//     </div>
//   );
// }

"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-black via-gray-900 to-black">
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">

        {/* LEFT SECTION */}
        <div className="flex flex-col justify-center px-6 sm:px-10 md:px-16 text-white">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 tracking-tight">
            AI Interview Mocker
          </h1>

          <p className="text-base sm:text-xl text-gray-300 leading-relaxed max-w-xl">
            Practice real interview questions with AI feedback and
            improve your confidence before the real interview.
          </p>

          {/* CTA BUTTONS */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link href="/sign-up" className="w-full sm:w-auto">
              <Button className="cursor-pointer w-full sm:w-auto bg-white text-black hover:bg-gray-200 px-8 py-6 text-base sm:text-lg">
                Get Started
              </Button>
            </Link>

            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button className="cursor-pointer w-full sm:w-auto bg-white text-black hover:bg-gray-200 px-8 py-6 text-base sm:text-lg">
                Go to Dashboard
              </Button>
            </Link>
          </div>

          <p className="mt-8 text-sm text-gray-400">
            Free plan available • Upgrade anytime
          </p>
        </div>

        {/* RIGHT SECTION */}
        <div className="hidden md:flex items-center justify-center px-6">
          <div className="w-full max-w-md rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 p-8 shadow-2xl text-white">
            <h3 className="text-2xl font-semibold mb-4">
              What you’ll get
            </h3>

            <ul className="space-y-4 text-gray-300">
              <li>✔ AI-powered mock interviews</li>
              <li>✔ Real-time feedback & scoring</li>
              <li>✔ Interview history & analytics</li>
              <li>✔ Upgrade anytime for Pro features</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}
