const Discord = require("discord.js");
const Client = require("./Client");

/**
 * @template {keyof Discord.ClientEvents} K
 * @param {Client} client
 * @param {Discord.ClientEvents[K]} args
 */
function ExecuteFunction(client, ...args) {}

/** @template {keyof Discord.ClientEvents} K */
class Event {
	/**
	 * @param {K} name
	 * @param {ExecuteFunction<K>} execute
	 */
	constructor(name, execute) {
		this.name = name;
		this.execute = execute;
	}
}

module.exports = Event;
