import type { NextConfig } from "next";
const path = require("path");

const nextConfig = {
    webpack: (config: { resolve: { alias: any } }) => {
        config.resolve.alias = {
            ...config.resolve.alias,
            "@": path.resolve(__dirname, "src"), // Assicura che @ punti a /src
        };
        return config;
    },
};
