/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "thumbnail.image.rakuten.co.jp" },
      { protocol: "https", hostname: "sneakerbardetroit.com" },
      { protocol: "https", hostname: "www.highsnobiety.com" },
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },
};
export default nextConfig;
