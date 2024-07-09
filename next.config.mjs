/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "lh3.googleusercontent.com" },
      { hostname: "raw.githubusercontent.com" },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dkyoa6any/**",
        port: ""
      },
    ],
  },
};

export default nextConfig;
