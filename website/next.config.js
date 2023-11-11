/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "http",
				hostname: "localhost",
				pathname: "**",
				port: "8080",
			},
			{
				protocol: "https",
				hostname: "cdn.discordapp.com",
				pathname: "**",
			},
		],
		formats: ["image/webp", "image/avif"],
	},
};

module.exports = nextConfig;
