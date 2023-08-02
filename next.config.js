/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
  basePath: process.env.NODE_ENV === "production" ? "/your-app-base-path" : "",
};
