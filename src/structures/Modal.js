const Client = require("./Client");
const { ModalInteraction } = require("./Interaction");
const { TranslateFunction } = require("./Translator");

/**
 * @param {{ client: Client, modal: ModalInteraction, translate: TranslateFunction }} params
 */
function ExecuteFunction(params) {}

class Modal {
	/**
	 * @param {{
	 * modalCustomId: string,
	 * execute: ExecuteFunction,
	 * }} data
	 */
	constructor(data) {
		this.modalCustomId = data.modalCustomId;
		this.execute = data.execute;
	}
}

module.exports = Modal;
