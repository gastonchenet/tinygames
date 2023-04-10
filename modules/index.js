const prompt = require("prompt-sync")({ sigint: true });
const fs = require("fs");
const { Categories, Game } = require("../src/structures/Command");

/**
 * @param {{
 * name: string,
 * description: string,
 * category: string,
 * premium: boolean
 * }} param0
 */
const commandData = ({
	name,
	description,
	category,
	premium,
}) => `const Command = require("../../structures/Command");

module.exports = new Command({
	data: {
		name: "${name}",
		description: "${description}",
	},
	category: Command.Categories.${category.toUpperCase()},
	premium: ${premium},
	requiresVote: false,
	game: null,
	execute: async function ({ client, slash, translate }) {},
});`;

/**
 * @param {{
 * name: string,
 * description: string,
 * category: string,
 * premium: boolean,
 * gameName: string,
 * minPlayers: number,
 * maxPlayers: number,
 * tags: string[]
 * }} param0
 */
const gameData = ({
	name,
	description,
	category,
	premium,
	gameName,
}) => `const Command = require("../../structures/Command");

module.exports = new Command({
  data: {
    name: "${name}",
    description: "${description}",
  },
  category: Command.Categories.${category.toUpperCase()},
  premium: ${premium},
  requiresVote: false,
  game: new Command.Game({
    name: "${gameName}",
    rules: null,
    players: { min: ${minPlayers}, max: ${maxPlayers} },
    tags: [${tags.map((tag) => `"${tag}"`)}],
    maxCPU: 0,
		needDMPermission: false,
		measureTurns: false,
  }),
  execute: async function ({ client, slash, translate }) {},
});`;

const commands = {
	"create-command"() {
		const commandName = prompt("Command name: ").toLowerCase();
		if (/[^a-z0-9]/.test(commandName)) throw new Error("Invalid command name.");

		const commandDescription = prompt("Command description: ").replace(
			'"',
			'\\"'
		);

		const commandCategory = prompt("Command category: ").toLowerCase();
		if (!Object.keys(Categories).includes(commandCategory.toUpperCase()))
			throw new Error("Invalid category.");

		const premium = prompt("Premium (Y/n): ").toLowerCase() === "y";

		if (commandCategory === "games") {
			const gameName = prompt("Game name: ");
			const minPlayers = Number(prompt("Minimum players: "));
			if (isNaN(minPlayers)) throw new Error("Invalid number of players.");

			const maxPlayers = Number(prompt("Maximum players: "));
			if (isNaN(minPlayers)) throw new Error("Invalid number of players.");

			const tags = prompt("Tags (separated by commas): ")
				.split(",")
				.map((tag) => tag.trim().toLowerCase());

			tags.forEach((tag) => {
				if (!Game.Tags.includes(tag))
					throw new Error("Invalid game tag '" + tag + "'.");
			});

			var command = gameData({
				category: commandCategory,
				description: commandDescription,
				gameName,
				maxPlayers,
				minPlayers,
				name: commandName,
				premium,
				tags,
			});
		} else {
			var command = commandData({
				category: commandCategory,
				description: commandDescription,
				name: commandName,
				premium,
			});
		}

		fs.writeFileSync(
			`./src/commands/${commandCategory}/${commandName}.js`,
			command
		);
	},
};

if (process.argv[2]) {
	const command = commands[process.argv[2]];

	if (command) command();
	else console.log("Invalid command.");
}
