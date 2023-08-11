const chalk = require("chalk");
const path = require("path");
const moment = require("moment");
const fs = require("fs");
const readline = require("readline");

const LOGS_DIR = "./logs";

const LogLevels = {
	event: {
		color: "magenta",
		enabled: true,
	},
	info: {
		color: "green",
		enabled: true,
	},
	database: {
		color: "cyanBright",
		enabled: true,
	},
	warn: {
		color: "yellow",
		enabled: true,
	},
	error: {
		color: "red",
		enabled: true,
	},
};

function getFormattedCurrentDate() {
	return moment(new Date()).format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS);
}

/**
 * @param {string} level
 * @param {string} message
 */
function writeToFile(level, message) {
	const data =
		JSON.stringify({
			level: level.toUpperCase(),
			message: message,
			timestamp: getFormattedCurrentDate(),
		}) + "\r\n";

	if (!fs.existsSync(LOGS_DIR)) {
		fs.mkdirSync(LOGS_DIR);
	}

	const options = {
		encoding: "utf8",
		mode: 438,
	};

	fs.appendFileSync(`${LOGS_DIR}/${level}.log`, data, options);
}

/**
 * @param {keyof LogLevels} levelName
 * @param {string} message
 * @param {Error | null} error
 */
function writeToConsole(levelName, message, error = null) {
	const level = LogLevels[levelName];
	if (!level.enabled) return;

	const chalkFunction = chalk[level.color];
	message = error
		? `${chalkFunction(`${error.message}\n${error.stack}`)}`
		: message;

	const header = `[${levelName.toUpperCase()}]: [${getFormattedCurrentDate()}]`;

	console.log(`${chalkFunction(header)} ${chalkFunction(message)}`);
}

/**
 * @param {{
 * level: keyof LogLevels,
 * message?: string,
 * error?: Error
 * }} options
 */
function log(options) {
	const levelName = options.level ?? "info";
	let message = options.message ?? "Unindentified Error";
	const error = options.error ?? null;

	writeToConsole(levelName, message, error);

	if (processOptions.generateLogs) {
		writeToFile(levelName, message);
	}
}

class Logger {
	constructor() {}

	/**
	 * @param {string | null} fileName
	 */
	readLog(fileName = null) {
		return new Promise((resolve, reject) => {
			const file = path.join(
				LOGS_DIR,
				fileName.includes(".") ? fileName : `${fileName}.log`
			);

			const lineReader = readline.createInterface({
				input: fs.createReadStream(file),
			});

			const logs = [];
			lineReader.on("line", (line) => {
				logs.push(JSON.parse(line));
			});

			lineReader.on("close", () => {
				console.log(
					chalk.yellow(`${fileName.toUpperCase()} Logs have been accessed.`)
				);
				console.table(logs);
				resolve(logs);
			});

			lineReader.on("error", reject);
		});
	}

	/**
	 * @param {string} message
	 */
	event(message) {
		return log({ level: "event", message });
	}

	/**
	 * @param {string} message
	 */
	info(message) {
		return log({ level: "info", message });
	}

	/**
	 * @param {string} message
	 */
	database(message) {
		return log({ level: "database", message });
	}

	/**
	 * @param {string} message
	 */
	warn(message) {
		return log({ level: "warn", message });
	}

	/**
	 * @param {string | Error} error
	 */
	error(error) {
		if (typeof error === "string") {
			return log({ level: "error", message: error });
		} else {
			return log({ level: "error", error });
		}
	}
}

module.exports = Logger;
