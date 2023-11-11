import type { Metadata } from "next";
import type { Command, Game } from "@/types/Command";
import React from "react";
import style from "./page.module.scss";
import { Source_Code_Pro } from "next/font/google";
import dynamic from "next/dynamic";
import Icon from "./components/Icon";
import RainbowText from "./RainbowText";
import GameSection from "./GameSection";
import getCommands from "@/utils/getCommands";
import getTopGuilds from "@/utils/getTopGuilds";
import { getBotData } from "@/utils/getBotData";

const GlitchText = dynamic(() => import("./GlitchText"), {
	ssr: false,
});

const titleFont = Source_Code_Pro({
	subsets: ["latin"],
	weight: "900",
});

const descriptionFont = Source_Code_Pro({
	subsets: ["latin"],
	weight: "400",
});

export const metadata: Metadata = {
	title: "Tiny Games | Home Page",
};

export default async function Page() {
	const bot = await getBotData();
	const guilds = await getTopGuilds();
	const commands = await getCommands();

	const games = commands.filter((command) => command.game) as (Command & {
		game: Game;
	})[];

	return (
		<div>
			<section className={style.landing}>
				<h1 className={style.title} style={titleFont.style}>
					<GlitchText>{bot.username}</GlitchText>
				</h1>
				<p className={style.description} style={descriptionFont.style}>
					Play to an <RainbowText>infinite</RainbowText> number of games with
					your friends !
				</p>
			</section>
			<section className={style.guildSection}>
				<h2 className={style.guildCount}>
					+
					{Math.floor(
						bot.guild_count /
							(bot.guild_count.toString().length -
								Math.min(bot.guild_count.toString().length - 1, 2))
					).toLocaleString()}{" "}
					servers trusts {bot.username}
				</h2>
				<article className={style.guilds}>
					{guilds.map((guild, key) => (
						<div className={style.guild} key={key}>
							<Icon guild={guild} size={128} className={style.guild__icon} />
							<div className={style.guild__content}>
								<b className={style.guild__content__name}>{guild.name}</b>
								<p className={style.guild__content__memberCount}>
									{guild.memberCount.toLocaleString()} members
								</p>
							</div>
						</div>
					))}
				</article>
			</section>
			<GameSection games={games} />
		</div>
	);
}
