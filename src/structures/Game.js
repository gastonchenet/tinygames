const { UserWithData, SlashInteraction } = require("./Interaction");
const Client = require("./Client");
const Discord = require("discord.js");
const playerIcons = require("../storage/player-icons.json");

class GameUser extends UserWithData {
	constructor() {
		super();
		this.emote = this.db.emote;
	}
}

class Game {
	static GameTypes = Object.freeze({
		NORMAL_MODE: "normal-mode",
		FRIENDLY_MODE: "friendly-mode",
	});

	/**
	 * @param {Client} client
	 * @param {SlashInteraction} slash
	 * @param {string} name
	 */
	constructor(client, slash, name) {
		this.client = client;
		this.slash = slash;
		this.name = name;

		/** @type {string} */
		this.hostId = slash.user.id;

		/** @type {GameUser[]} */
		this.players = [];

		/** @type {Discord.Collector[]} */
		this.collectors = [];

		/** @type {string[]} */
		this.settings = [];

		this.type = Game.GameTypes.NORMAL_MODE;
		this.ended = false;
		this.turn = 0;
		this.startTimestamp = null;
		this.duration = null;

		this.client.games.set(this.hostId, this);
	}

	/**
	 * @param {string[]} settings
	 */
	setSettings(settings) {
		this.settings = settings;
		return this;
	}

	/**
	 * @param {GameUser} user
	 */
	addPlayer(user) {
		if (this.client.inGame.has(user.id)) return false;

		user.emote = user.db.emote || playerIcons[this.players.length];
		this.client.inGame.set(user.id, this.hostId);
		this.players.push(user);

		return true;
	}

	/**
	 * @param {string} userId
	 */
	removePlayer(userId) {
		if (!this.players.find((p) => p.id === userId)) return false;

		this.client.inGame.delete(userId);
		this.players.splice(
			this.players.findIndex((u) => u.id === userId),
			1
		);

		return true;
	}

	async stop() {
		this.ended = true;
		this.players.forEach((player) => this.removePlayer(player.id));
		this.collectors.forEach((collector) => collector.stop());
		this.collectors = [];

		this.duration = Date.now() - this.startTimestamp;
		this.client.games.delete(this.hostId);

		const reply = await this.slash;
		reply.components.forEach((row) => {
			row.components.forEach((component) => {
				component.data.disabled = true;
			});
		});

		return reply.edit({ components: reply.components });
	}

	start() {
		this.startTimestamp = Date.now();
	}

	addTurn() {
		this.turn++;
	}

	addCPU() {
		this.players.push(this.client.user);
	}

	removeCPU() {
		for (let i = this.players.length - 1; i <= 0; i--) {
			if (this.players[i].bot) {
				this.players.splice(i, 1);
				break;
			}
		}
	}

	shufflePlayers() {
		this.players = this.players.sort(() => Math.random() - 0.5);
	}

	registerCollector(collector) {
		this.collectors.push(collector);
		return collector;
	}

	get started() {
		return this.startTimestamp !== null;
	}

	get playerIds() {
		return this.players.map((u) => u.id);
	}

	get turnPlayer() {
		return this.players[this.turn % this.players.length];
	}

	get otherPlayers() {
		return this.players.filter((_, i) => i !== this.turn % this.players.length);
	}

	get CPUTurn() {
		return this.turnPlayer.id === this.client.user.id;
	}
}

module.exports = Game;
module.exports.GameUser = GameUser;
