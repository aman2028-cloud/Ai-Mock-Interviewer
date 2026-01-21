import { UserButton } from "@clerk/nextjs";
import Link from "next/link";


const Header = () => {
  return (
    <header className="w-full bg-linear-to-br from-black via-gray-900 to-black border-b border-white/10">
      
      <div className="w-full px-8 h-16 flex items-center">

        {/* LEFT — LOGO */}
        <Link
          href="/dashboard"
          className="flex items-center gap-3 text-white font-semibold text-lg"
        >
          <div className="w-9 h-9 rounded-xl bg-white text-black flex items-center justify-center font-bold shadow">
            AI
          </div>
          <span className="hidden sm:block tracking-tight">
            Interview Mocker
          </span>
        </Link>

        {/* CENTER — NAV */}
        <nav className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-10 text-sm font-medium text-gray-300">
          <Link href="/dashboard" className="hover:text-white transition">
            Dashboard
          </Link>
          <Link href="/dashboard/questions" className="hover:text-white transition">
            Questions
          </Link>
          <Link href="/dashboard/howitworks" className="hover:text-white transition">
            How it works
          </Link>
          <Link
            href="/dashboard/upgrade"
            className="px-5 py-2 rounded-full bg-white text-black hover:bg-gray-200 transition"
          >
            Upgrade
          </Link>
          
        </nav>

        {/* RIGHT — USER */}
        <div className="ml-auto">
          <UserButton
            appearance={{
              elements: {
                avatarBox: "w-9 h-9",
              },
            }}
            afterSignOutUrl="/"
          />
        </div>

      </div>
    </header>
  );
};

export default Header;
