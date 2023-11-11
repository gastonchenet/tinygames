import type { Command } from "@/types/Command";

export default async function getCommands(): Promise<Command[]> {
	const commands = await fetch("http://129.151.234.121:8080/api/commands", {
		next: {
			revalidate: 86_400,
		},
	});

	return commands.json();
}
