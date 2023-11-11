import type { BotData } from "@/types/BotData";
import { Poppins } from "next/font/google";
import Navbar from "./components/Navbar";
import "./globals.scss";
import Footer from "./components/Footer";
import { getBotData } from "@/utils/getBotData";

const poppins = Poppins({ subsets: ["latin"], weight: "400" });

export const metadata = {
	title: "Tiny Games",
	generator: "Tiny Games",
	applicationName: "Tiny Games",
	description:
		"Play to a variety of games with your friends on Discord with Tiny Games!",
	keywords: ["discord", "games", "fun", "discord bot", "discord games"],
	authors: [{ name: "Gaston Chenet", url: "https://gastonchenet.fr" }],
	creator: "Gaston Chenet",
	publisher: "Gaston Chenet",
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
	openGraph: {
		title: "Tiny Games",
		description:
			"Play to a variety of games with your friends on Discord with Tiny Games!",
		type: "website",
		publishedTime: "2023-11-11T00:00:00.000Z",
		authors: ["Gaston Chenet"],
	},
};

export const viewport = {
	themeColor: "#5865f2",
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const botData = await getBotData();

	return (
		<html lang="en">
			<body className={poppins.className} suppressHydrationWarning={true}>
				<Navbar bot={botData} />
				<main>
					{children}
					<Footer />
				</main>
			</body>
		</html>
	);
}
