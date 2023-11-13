"use client";

import { OptionType, type Command, type Option } from "@/types/Command";
import style from "./commands.module.scss";
import { Poppins } from "next/font/google";
import React, { useState } from "react";

const poppins = Poppins({ subsets: ["latin"], weight: "400" });

type SubOption = {
	name: string;
	description: string;
	type: OptionType;
	required: boolean;
};
type SubCommand = { name: string; options: SubOption[] };

function getSubCommands(name: string, options: Option[]): SubCommand[] {
	const subCommands: SubCommand[] = [];
	const subCommand: SubCommand = { name, options: [] };

	for (const option of options) {
		if (
			[OptionType.SubCommandGroup, OptionType.SubCommand].includes(option.type)
		) {
			subCommands.push(
				...getSubCommands(`${name} ${option.name}`, option.options ?? [])
			);
		} else {
			subCommand.options.push({
				name: option.name,
				description: option.description,
				type: option.type,
				required: option.required ?? false,
			});
		}
	}

	if (subCommands.length === 0) {
		subCommands.push(subCommand);
	}

	return subCommands;
}

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
						style={poppins.style}
					>
						{c}
					</button>
				))}
			</article>
			<article className={style.commands}>
				{filtered.map((c, k) => (
					<figure key={k} className={style.command} data-premium={c.premium}>
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
						<figcaption className={style.usages}>
							{getSubCommands(c.name, c.options ?? []).map(
								(subCommand, key) => (
									<div className={style.usage} key={key}>
										<div className={style.usage__name}>{subCommand.name} </div>
										{subCommand.options.map((c) => (
											<p
												className={style.usage__option}
												data-type={
													[
														"Text",
														"Integer",
														"Boolean",
														"User",
														"Channel",
														"Role",
														"Mentionable",
														"Number",
														"Attachment",
													][c.type - 3]
												}
											>
												{c.name}
												{c.required && (
													<span className={style.required}>*</span>
												)}
											</p>
										))}
									</div>
								)
							)}
						</figcaption>
						<figcaption className={style.command__textData}>
							<p className={style.command__textData__category}>
								{c.category_name}
							</p>
							<p className={style.command__textData__description}>
								{c.description}
							</p>
						</figcaption>
						<p className={style.command__usages}>
							Used {c.usages.toLocaleString()} times
						</p>
					</figure>
				))}
			</article>
		</section>
	);
}
