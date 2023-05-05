const translate = require("translate");
const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

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
					getProgress({
						value: Object.keys(translated).length,
						maxValue: object.length,
						displayProgress: true,
						prefix: `${code}: `,
					})
				);

				fs.writeFileSync(
					path.join(_path, file),
					JSON.stringify({ ...language, ...translated }, null, 2)
				);

				if (Object.keys(translated).length === object.length) {
					const space = `${code}: Translation done ✓`.length;

					process.stdout.write(
						`\r${chalk.green(
							`${code}: Translation done ${chalk.cyan("✓")}`
						)}${" ".repeat(process.stdout.columns - space)}\n`
					);
				}
			} catch (error) {
				console.error(error);
			}
		}
	}
})();

function getProgress({
	value,
	maxValue,
	displayProgress = false,
	prefix = "",
	length = null,
}) {
	const [blank, progress] = [" ", "█"];
	const percentage = Math.round((value * 100) / maxValue);

	let suffix = "|";
	let progressBar = prefix + "|";
	const maxSuffix = suffix + ` ${maxValue}/${maxValue} - 100%`;

	if (displayProgress) suffix += ` ${value}/${maxValue} - ${percentage}%`;
	length ??= process.stdout.columns - progressBar.length - maxSuffix.length;

	const ratio = Math.round((value * length) / maxValue);

	for (let i = 0; i < ratio; i++) {
		const color = chalk.hsl(Math.round((i / length) * 360), 100, 50);
		progressBar += color(progress);
	}

	progressBar += blank.repeat(length - ratio);

	return "\r" + progressBar + suffix;
}
