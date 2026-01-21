import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-linear-to-br from-black via-gray-900 to-black">

      <div className="hidden md:flex flex-col justify-center px-16 text-white">
        <h1 className="text-5xl font-bold mb-6 tracking-tight">
          AI Interview Mocker
        </h1>

        <p className="text-xl text-gray-300 mb-8 leading-relaxed">
          Practice real interviews with AI-generated questions,
          receive instant feedback, and improve your confidence.
        </p>

        <ul className="space-y-4 text-gray-300 text-lg">
          {[
            "AI-powered mock interviews",
            "Role & company specific questions",
            "Smart feedback & scoring",
            "Track your improvement over time",
          ].map((text, index) => (
            <li
              key={index}
              className="
                flex items-center gap-3
                transition-all duration-300 ease-out
                hover:-translate-x-2 hover:text-white
                cursor-pointer
              "
            >
              <span className="text-green-400 text-xl">✔</span>
              <span>{text}</span>
            </li>
          ))}
        </ul>

        <p className="mt-12 text-sm text-gray-400">
          Built for students, developers & job seekers 
        </p>
      </div>

      <div className="flex items-center justify-center px-6">
        <SignIn
          appearance={{
            variables: {
              colorPrimary: "#ffffff",
              colorBackground: "#0b0b0b",
              colorText: "#ffffff",
              colorInputBackground: "#111111",
              colorInputText: "#ffffff",
              borderRadius: "12px",
            },
            elements: {
              card:
                "bg-black/70 backdrop-blur-xl border border-white/10 shadow-2xl",
              headerTitle: "text-white text-2xl",
              headerSubtitle: "text-gray-400",
              formFieldLabel: "text-gray-300",
              formFieldInput:
                "bg-[#111] text-white border border-white/10 focus:border-white",
              formButtonPrimary:
                "bg-white text-black hover:bg-gray-200 transition",
              footerActionText: "text-gray-400",
              footerActionLink:
                "text-white hover:text-gray-300",
              dividerLine: "bg-white/10",
              dividerText: "text-gray-500",
              identityPreviewText: "text-white",
            },
          }}
        />
      </div>

    </div>
  );
}
