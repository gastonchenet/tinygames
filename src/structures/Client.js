const Discord = require("discord.js");
const Command = require("./Command");
const fs = require("fs");
const path = require("path");
const { QuickDB } = require("quick.db");
const Game = require("./Game");
const GlobalData = require("./GlobalData");
const Party = require("./Party");
const Modal = require("./Modal");
const Event = require("./Event");
const Button = require("./Button");

class ClientUser extends Discord.ClientUser {
	static BASE_EMOTE = "<a:bot:1084914190004797490>";

	constructor() {
		super();
		this.emote = ClientUser.BASE_EMOTE;
	}
}

class Client extends Discord.Client {
	constructor() {
		const intents = [
			Discord.IntentsBitField.Flags.Guilds,
			Discord.IntentsBitField.Flags.DirectMessages,
			Discord.IntentsBitField.Flags.GuildMessages,
			Discord.IntentsBitField.Flags.MessageContent,
			Discord.IntentsBitField.Flags.GuildMessageReactions,
			Discord.IntentsBitField.Flags.GuildMembers,
			Discord.IntentsBitField.Flags.GuildInvites,
		];

		const partials = [Discord.Partials.Channel, Discord.Partials.Message];

		/** @type {Partial<Discord.RESTOptions>} */
		const rest = {
			offset: 0,
		};

		/** @type {Discord.MessageMentionOptions} */
		const allowedMentions = {
			repliedUser: true,
			parse: ["users"],
		};

		super({ intents, partials, rest, allowedMentions });

		const db = new QuickDB({
			filePath: processOptions.dev
				? path.join(__dirname, "../../json.dev.sqlite")
				: path.join(__dirname, "../../json.sqlite"),
		});

		this.db = {
			users: db.table("users"),
			guilds: db.table("guilds"),
			client: db.table("client"),
		};

		this.times = {
			short: 6e4,
			medium: 1.2e5,
			long: 3e5,
		};

		/** @type {Discord.Collection<string, Command>} */
		this.commands = new Discord.Collection();

		/** @type {Discord.Collection<string, Modal>} */
		this.modals = new Discord.Collection();

		/** @type {Discord.Collection<string, Button>} */
		this.buttons = new Discord.Collection();

		/** @type {Discord.Collection<string, Game>} */
		this.games = new Discord.Collection();

		/** @type {Discord.Collection<string, string>} */
		this.inGame = new Discord.Collection();

		/** @type {Discord.Collection<string, Party>} */
		this.parties = new Discord.Collection();

		/** @type {Discord.Collection<string, string>} */
		this.inParty = new Discord.Collection();

		/** @type {ClientUser | null} */
		this.user = null;

		/** @type {string | null} */
		this.inviteURL = null;

		/** @type {GlobalData | null} */
		this.globalData = null;

		/** @type {Discord.Collection<string, number>} */
		this.invites = new Discord.Collection();

		this.icons = Object.freeze({
			alert: "<:exclamationmark:980462076776550430> ",
			failure: "<:failure:1056328628234895466> ",
			success: "<:success:1056328626628460635> ",
			loading: "<a:loading:867315391939477514> ",
			crown: "<:crown:1046477148833198181>",
			crystal: "<:crystal:1046477149789507637>",
			on: "<:on:870024897315880991>",
			off: "<:off:869978532489617458>",
			join: "<:join:1109397402651209768>",
			leave: "<:leave:1109396558564306954>",
		});
	}

	#registerEvents() {
		const files = fs.readdirSync(path.join(__dirname, "../events"));
		files.forEach((file) => {
			/** @type {Event} */
			const event = require(path.join(__dirname, "../events", file));
			this.on(event.name, (...args) => event.execute(this, ...args));
		});

		logger.info(`${files.length} events loaded without errors.`);
	}

	#registerModals() {
		const files = fs.readdirSync(path.join(__dirname, "../modals"));
		files.forEach((file) => {
			/** @type {Modal} */
			const modal = require(path.join(__dirname, "../modals", file));
			this.modals.set(modal.modalCustomId, modal);
		});
	}

	#registerButtons() {
		const files = fs.readdirSync(path.join(__dirname, "../buttons"));
		files.forEach((file) => {
			/** @type {Button} */
			const button = require(path.join(__dirname, "../buttons", file));
			this.buttons.set(button.buttonCustomId, button);
		});
	}

	/**
	 * @param {string} token
	 */
	async start(token) {
		this.#registerEvents();
		this.#registerModals();
		this.#registerButtons();

		await this.login(token);
		await this.application.fetch();

		const globalData = {};
		const rawGlobalData = await this.db.client.all();
		rawGlobalData.forEach(({ id, value }) => {
			globalData[id] = value;
		});

		this.globalData = new GlobalData(this, globalData);

		this.user.emote = ClientUser.BASE_EMOTE;
		this.inviteURL = this.generateInvite({
			scopes: this.application.installParams.scopes,
			permissions: this.application.installParams.permissions,
			disableGuildSelect: false,
			guild: null,
		});

		return this;
	}
}

module.exports = Client;
