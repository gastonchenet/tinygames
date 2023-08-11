const Discord = require("discord.js");
const Guild = require("./Guild");
const User = require("./User");

class UserWithData extends Discord.User {
	constructor() {
		super();
		this.db = new User();
	}
}

class GuildWithData extends Discord.Guild {
	constructor() {
		super();
		this.db = new Guild();
	}
}

class SlashInteraction extends Discord.ChatInputCommandInteraction {
	constructor() {
		super();

		this.user = new UserWithData();
		this.guild = new GuildWithData();
	}
}

class AutocompleteInteraction extends Discord.AutocompleteInteraction {
	constructor() {
		super();

		this.user = new UserWithData();
		this.guild = new GuildWithData();
	}
}

class ModalInteraction extends Discord.ModalSubmitInteraction {
	constructor() {
		super();

		this.user = new UserWithData();
		this.guild = new GuildWithData();
	}
}

class ButtonInteraction extends Discord.ButtonInteraction {
	constructor() {
		super();

		this.user = new UserWithData();
		this.guild = new GuildWithData();
	}
}

module.exports.SlashInteraction = SlashInteraction;
module.exports.AutocompleteInteraction = AutocompleteInteraction;
module.exports.ModalInteraction = ModalInteraction;
module.exports.ButtonInteraction = ButtonInteraction;
module.exports.UserWithData = UserWithData;
module.exports.GuildWithData = GuildWithData;
