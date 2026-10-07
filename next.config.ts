import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  agentRules: false,
  async redirects() {
    return [{ source: "/cv", destination: "/Alex-Polychroniadis-CV.pdf", permanent: false }];
  },
};

export default nextConfig;
