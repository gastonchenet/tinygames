const { Client } = require("discord.js");

/**
 * @param {Client} client
 * @param {string} commandName
 */
function slashCommand(client, commandName) {
	let post = client.application.commands;
	if (process.argv.includes("--dev")) {
		const guild = client.guilds.cache.get(process.env.SUPPORT_GUILD_ID);
		if (guild) {
			post = guild.commands;
		}
	}

	const commandId = post.cache.find(
		(c) => c.name === commandName.split(/\s+/)[0]
	)?.id;

	if (!commandId) return "`/" + commandName + "`";
	return `</${commandName}:${commandId}>`;
}

module.exports = slashCommand;
