"use client";

import type { Command, Game } from "@/types/Command";
import { useEffect, useRef, useState } from "react";
import style from "./gamesection.module.scss";

export default function GameSection({
	games,
}: {
	games: (Command & { game: Game })[];
}) {
	const loopRef = useRef<null | NodeJS.Timeout>(null);
	const [command, setCommand] = useState<Command & { game: Game }>(games[0]);

	useEffect(() => {
		if (!loopRef.current) {
			loopRef.current = setInterval(() => {
				setCommand(games[Math.floor(Math.random() * games.length)]);
			}, 5_000);
		}
	});

	return (
		<section className={style.gameSection}>
			<h2 className={style.title}>{games.length} Fancy mini-Games</h2>
			<article className={style.games}>
				{games.map((c, key) => (
					<button
						key={key}
						className={style.games__button}
						onClick={() => {
							setCommand(c);
							if (loopRef.current) clearInterval(loopRef.current);
						}}
						data-active={c.name === command.name}
					>
						{c.game.name}
					</button>
				))}
			</article>
			<article className={style.game}>
				<img
					src={`http://129.151.234.121:8080/api/commands/${command.name}/icon`}
					alt={`${command.game.name} icon, png, game`}
					className={style.icon}
				/>
				<div className={style.textContent}>
					<div className={style.gameHeader}>
						{command.new && <p className={style.new}>New</p>}
						<h2 className={style.gameName}>{command.game.name}</h2>
						{command.game.players.min === command.game.players.max ? (
							<p className={style.players}>
								{command.game.players.min} player
								{command.game.players.min > 1 && "s"}
							</p>
						) : (
							<p className={style.players}>
								{command.game.players.min} to {command.game.players.max} players
							</p>
						)}
					</div>
					<p className={style.played}>
						Played {command.usages.toLocaleString()} times
					</p>
					<p className={style.rules}>{command.game.rules}</p>
					<div className={style.tags}>
						{command.game.tags.map((tag, key) => (
							<p key={key} className={style.tag}>
								{tag}
							</p>
						))}
					</div>
				</div>
			</article>
		</section>
	);
}
