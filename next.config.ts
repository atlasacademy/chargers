import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    basePath: "/chargers",
    output: "export",
    allowedDevOrigins: ["127.0.0.1"],
};

export default nextConfig;
