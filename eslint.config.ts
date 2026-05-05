import nextConfig from "eslint-config-next";
import type { Linter } from "eslint";

const config: Linter.Config[] = [
    ...nextConfig,
    {
        rules: {
            "@next/next/no-img-element": "off",
        },
    },
];

export default config;
