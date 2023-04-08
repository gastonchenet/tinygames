const Client = require("../structures/Client");
const Discord = require("discord.js");

/**
 *
 * @param {Client} client
 * @param {string} guildId
 * @param {string} channelId
 * @param {Discord.MessageCreateOptions} data
 */
async function sendToChannel(client, guildId, channelId, data) {
	if (client.shard) {
		await client.shard.broadcastEval(
			(client, context) => {
				const guild = client.guilds.cache.get(context.guildId);
				if (!guild) return;

				const channel = guild.channels.cache.get(context.channelId);
				if (!channel) return;

				channel.send(context.data);
			},
			{
				context: { guildId, channelId, data },
			}
		);
	} else {
		const guild = client.guilds.cache.get(guildId);
		if (!guild) return console.log("Guild not found");

		const channel = guild.channels.cache.get(channelId);
		if (!channel) return console.log("Channel not found");

		await channel.send(data);
	}
}

module.exports = sendToChannel;
