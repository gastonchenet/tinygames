const dotenv = require("dotenv");
const Discord = require("discord.js");
const { AutoPoster } = require("topgg-autoposter");
const path = require("path");
const Logger = require("./structures/Logger");

globalThis.logger = new Logger();

globalThis.processOptions = {
	dev: process.argv.includes("--dev") || process.argv.includes("-d"),
	generateLogs:
		process.argv.includes("--generate-logs") || process.argv.includes("-gl"),
	avoidErrors:
		process.argv.includes("--avoid-errors") || process.argv.includes("-ae"),
};

if (processOptions.dev) {
	dotenv.config({ path: path.join(__dirname, "../.env.dev") });
} else {
	dotenv.config({ path: path.join(__dirname, "../.env") });
}

console.clear();
logger.info("Starting Tiny Games...");

const manager = new Discord.ShardingManager(path.join(__dirname, "index.js"), {
	token: process.env.TOKEN,
	totalShards: "auto",
	respawn: true,
	shardArgs: process.argv.slice(2),
});

const shards = [];

manager.on("shardCreate", (shard) => {
	shards.push(shard);
	logger.info(`Started shard #${shard.id}`);

	shard.on("message", (data) => {
		shards.forEach((shard) => shard.send(data));
	});
});

manager
	.spawn({ amount: "auto", delay: 15500, timeout: 60000 })
	.then(() => shards.forEach((shard) => shard.send({ type: "ready" })))
	.catch(logger.error);

if (!processOptions.dev) {
	const ap = AutoPoster(process.env.TOPGG_TOKEN, manager);

	ap.on("posted", () => {
		logger.info("Bot statistics posted on Top.gg");
	});
}

if (processOptions.avoidErrors) {
	process.on("unhandledRejection", logger.error);
	process.on("uncaughtException", logger.error);
	process.on("uncaughtExceptionMonitor", logger.error);
	process.on("warning", logger.warn);
	process.on("rejectionHandled", logger.error);
}
