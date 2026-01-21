

import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-linear-to-br from-black via-gray-900 to-black">

      {/* LEFT SIDE – SIMPLE BRANDING */}
      <div className="hidden md:flex flex-col justify-center px-16 text-white">
        <h1 className="text-5xl font-bold mb-6 tracking-tight">
          Join AI Interview Mocker
        </h1>

        <p className="text-xl text-gray-300 leading-relaxed">
          Create your account and start practicing
          AI-powered interviews in minutes.
        </p>

        <p className="mt-10 text-sm text-gray-400">
          Free to start • No credit card required
        </p>
      </div>

      {/* RIGHT SIDE – CLERK SIGN UP */}
      <div className="flex items-center justify-center px-6">
        <SignUp
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
