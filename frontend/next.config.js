/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS === "true"

const rawBase =
  process.env.NEXT_PUBLIC_BASE_PATH ??
  (isGithubActions ? "/ACHIdigital" : "")

const basePath = String(rawBase || "").replace(/\/+$/, "")

const nextConfig = {
  experimental: { externalDir: true },

  transpilePackages: ["translations"],

  output: isGithubActions ? "export" : undefined,
  trailingSlash: true,

  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,

  images: { unoptimized: true },
}

module.exports = nextConfig
