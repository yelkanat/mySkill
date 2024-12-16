/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Включение строгого режима React
  images: {
    domains: ["images.unsplash.com", "cdn.pixabay.com"], // Добавьте необходимые домены
  },
};

export default nextConfig;

const isProd = process.env.NODE_ENV === "production";

module.exports = {
  assetPrefix: isProd ? "/yelkanat/" : "",
  images: {
    unoptimized: true,
  },
  output: "export", // Генерация статического сайта
};
