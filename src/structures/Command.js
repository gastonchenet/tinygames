const Discord = require("discord.js");
const Client = require("./Client");
const { SlashInteraction, AutocompleteInteraction } = require("./Interaction");
const { TranslateFunction } = require("./Translator");
const english = require("../lang/en.json");

/**
 * @param {{ client: Client, slash: SlashInteraction, translate: TranslateFunction }} params
 */
function ExecuteFunction(params) {}

/**
 * @param {{ client: Client, interaction: AutocompleteInteraction, translate: TranslateFunction }} params
 */
function AutocompleteFunction(params) {}

class Game {
	static Tags = Object.freeze({
		STRATEGY: "STRATEGY",
		MEMORY: "MEMORY",
		KNOWLEDGE: "KNOWLEDGE",
		LUCK: "LUCK",
		SPEED: "SPEED",
	});

	static SettingTypes = Object.freeze({
		MENU: 0,
		COUNTER: 1,
	});

	/**
	 * @typedef {{
	 * type: 0,
	 * title: keyof english,
	 * list: { value: keyof english, description: (keyof english) | null, emoji: string | null }[],
	 * default: string[],
	 * multiple: boolean
	 * }} menu
	 *
	 * @typedef {{
	 * type: 1,
	 * title: keyof english,
	 * default: number,
	 * max: number,
	 * min: number,
	 * step: number
	 * }} counter
	 *
	 * @param {{
	 * name: string,
	 * rules: keyof english,
	 * tags: number[],
	 * players: { min: number, max: number },
	 * maxCPU: number,
	 * needDMPermission: boolean,
	 * measureTurns: boolean,
	 * needThread: boolean,
	 * settings: (menu | counter)[]
	 * }} param0
	 */
	constructor({
		name,
		rules,
		tags,
		players,
		maxCPU,
		needDMPermission,
		measureTurns,
		needThread,
		settings,
	}) {
		this.name = name;
		this.rules = rules;
		this.tags = tags;
		this.players = players;
		this.maxCPU = maxCPU;
		this.needDMPermission = needDMPermission || false;
		this.measureTurns = measureTurns || false;
		this.needThread = needThread || false;
		this.settings = settings || [];
	}
}

class Command {
	static Game = Game;

	static Categories = {
		UTILITY: {
			name: "UTILITY",
			description: "UTILITY_DESCRIPTION",
		},
		GAMES: {
			name: "GAMES",
			description: "GAMES_DESCRIPTION",
		},
		MATCH: {
			name: "MATCH",
			description: "MATCH_DESCRIPTION",
		},
		INFO: {
			name: "INFO",
			description: "INFO_DESCRIPTION",
		},
		CUSTOMIZATION: {
			name: "CUSTOMIZATION",
			description: "CUSTOMIZATION_DESCRIPTION",
		},
		ECONOMY: {
			name: "ECONOMY",
			description: "ECONOMY_DESCRIPTION",
		},
	};

	static OptionTypes = Discord.ApplicationCommandOptionType;

	static DEFAULT_VERSION = "1.0.0";

	/**
	 * @param {{
	 * data: Discord.ApplicationCommandDataResolvable,
	 * category: { name: string, description: string },
	 * premium: boolean,
	 * requiresVote: boolean,
	 * game: Game | null,
	 * disabled: boolean,
	 * version: string,
	 * execute: ExecuteFunction,
	 * autocomplete: AutocompleteFunction
	 * }} param0
	 */
	constructor({
		data,
		category,
		premium,
		requiresVote,
		game,
		disabled,
		version,
		execute,
		autocomplete,
	}) {
		this.data = data;
		this.category = category;
		this.premium = premium || false;
		this.requiresVote = requiresVote || false;
		this.disabled = disabled || false;
		this.game = game || null;
		this.version = version || Command.DEFAULT_VERSION;
		this.execute = execute || (() => {});
		this.autocomplete = autocomplete || (() => {});
	}
}

module.exports = Command;
