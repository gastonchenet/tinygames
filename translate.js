const translate = require("translate");
const fs = require("fs");
const path = require("path");

translate.key = process.argv[2];
translate.engine = "deepl";

const _path = path.join(__dirname, "./src/lang");
const baseFile = "en.json";
const baseLang = require(path.join(_path, baseFile));
const files = fs.readdirSync(_path).filter((f) => f !== baseFile);

(async () => {
	for (const file of files) {
		const code = file.replace(".json", "");
		const language = require(path.join(_path, file));
		const translated = {};

		const object = Object.entries(baseLang)
			.filter((l) => !Object.keys(language).includes(l[0]) && l[0] !== "config")
			.map((i) => ({ key: i[0], value: i[1] }));

		if (!object.length) continue;

		for (let i in object) {
			try {
				const result = await translate(object[i].value, code).catch(
					console.error
				);
				translated[object[i].key] = result;

				process.stdout.write(
					"\r" +
						`${code}: ` +
						getProgress(Object.keys(translated).length, object.length, true)
				);

				fs.writeFileSync(
					path.join(_path, file),
					JSON.stringify({ ...language, ...translated }, null, 2)
				);

				if (Object.keys(translated).length === object.length) {
					process.stdout.write(` Translation ended ✓\n`);
				}
			} catch (error) {
				console.error(error);
			}
		}
	}
})();

function getProgress(value, maxValue, displayProgress = false) {
	const [blank, progress] = [" ", "█"];
	const progressBar = ["|"];

	const perventage = Math.round((value * 20) / maxValue);
	const percentage = Math.round((value * 100) / maxValue);

	for (let i = 0; i < perventage; i++) {
		progressBar.push(progress);
	}

	for (let i = 0; i < 20 - perventage; i++) {
		progressBar.push(blank);
	}

	progressBar.push("|");

	return (
		progressBar.join("") +
		blank +
		(displayProgress ? `${value}/${maxValue} - ${percentage}%` : "")
	);
}
