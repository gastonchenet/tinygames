"use client";

import type { Command } from "@/types/Command";
import style from "./commands.module.scss";
import { Poppins } from "next/font/google";
import React, { useState } from "react";

const poppins = Poppins({ subsets: ["latin"], weight: "400" });

export default function CommandList({
	commands,
	categories,
}: {
	commands: Command[];
	categories: string[];
}) {
	const [selected, setSelected] = useState("All");
	const [filtered, setFiltered] = useState(
		commands
			.filter((c) => c.category_name === selected || selected === "All")
			.sort((a, b) => b.usages - a.usages)
			.sort((a, b) => (a.premium && !b.premium ? -1 : 1))
	);

	function select(category: string) {
		setSelected(category);

		setFiltered(
			commands
				.filter((c) => c.category_name === category || category === "All")
				.sort((a, b) => b.usages - a.usages)
				.sort((a, b) => (a.premium && !b.premium ? -1 : 1))
		);
	}

	return (
		<section className={style.pageContent}>
			<article className={style.categories}>
				{categories.map((c, k) => (
					<button
						className={style.category}
						key={k}
						data-active={selected === c}
						onClick={() => select(c)}
					>
						<p className={poppins.className}>{c}</p>
					</button>
				))}
			</article>
			<article className={style.commands}>
				{filtered.map((c, k) => (
					<div key={k} className={style.command} data-premium={c.premium}>
						<div className={style.command__header}>
							<b className={style.command__name}>{c.name}</b>
							{c.requiresVote && (
								<img
									src="/voter.webp"
									alt="tiny games, voter icon, webp"
									className={style.badge}
								/>
							)}
							{c.premium && (
								<img
									src="/premium.webp"
									alt="tiny games, premium icon, webp"
									className={style.badge}
								/>
							)}
						</div>
						<p className={style.command__category}>{c.category_name}</p>
						<p className={style.command__description}>{c.description}</p>
						<p className={style.command__usages}>
							Used {c.usages.toLocaleString()} times
						</p>
					</div>
				))}
			</article>
		</section>
	);
}
