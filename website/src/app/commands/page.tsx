import style from "./page.module.scss";
import CommandList from "./Commands";
import React from "react";
import getCommands from "@/utils/getCommands";

export const metadata = {
	title: "Tiny Games | Commands",
	description:
		"Play to a variety of games with your friends on Discord with Tiny Games!",
};

export default async function Page() {
	const commands = await getCommands();
	const categories: string[] = ["All"];

	commands.forEach((command) => {
		if (!categories.includes(command.category_name)) {
			categories.push(command.category_name);
		}
	});

	return (
		<div className={style.content}>
			<CommandList commands={commands} categories={categories} />
		</div>
	);
}
