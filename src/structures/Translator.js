const english = require("../lang/en.json");
const path = require("path");

const Languages = {
	English: "en",
	French: "fr",
	Spanish: "es",
};

/**
 * @param {keyof english} key
 * @param {...any} values
 */
function TranslateFunction(key, ...values) {}

class Translator {
	static Languages = Languages;

	/**
	 * @param {string} langCode
	 */
	constructor(langCode) {
		this.langCode = langCode;
	}

	/**
	 * @param {keyof english} key
	 * @param {...any} values
	 * @returns {string}
	 */
	translate(key, ...values) {
		const language = require(path.join(
			__dirname,
			"../lang",
			this.langCode + ".json"
		));

		let text = language[key] || english[key];
		for (const i in values) {
			const value = values[i];
			text = text.replace("%" + "s".repeat(Number(i) + 1), value?.toString());
		}

		return text;
	}
}

module.exports = Translator;
module.exports.TranslateFunction = TranslateFunction;
