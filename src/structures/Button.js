const Client = require("./Client");
const { ButtonInteraction } = require("./Interaction");
const { TranslateFunction } = require("./Translator");

/**
 * @param {{ client: Client, button: ButtonInteraction, args: string[], translate: TranslateFunction }} params
 */
function ExecuteFunction(params) {}

class Button {
	/**
	 * @param {{
	 * buttonCustomId: string,
	 * execute: ExecuteFunction,
	 * }} data
	 */
	constructor(data) {
		this.buttonCustomId = data.buttonCustomId;
		this.execute = data.execute;
	}
}

module.exports = Button;
