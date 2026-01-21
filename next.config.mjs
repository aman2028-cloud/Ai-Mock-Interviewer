if (!process.stdout) process.stdout = { isTTY: false };
/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
   turbo: false,
};

export default nextConfig;

