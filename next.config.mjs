/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "lh3.googleusercontent.com" },
      { hostname: "raw.githubusercontent.com" },
      // Todo: Temp for demo purposes, needs to be removed in production
      { hostname: "picsum.photos" },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dkyoa6any/**",
        port: "",
      },
    ],
  },
};

export default nextConfig;
