const Canvas = require("@napi-rs/canvas");
const Client = require("../structures/Client");
const path = require("path");
const { roundRect, roundImage } = require("./canvasUtils");

const titleFont = "28px SignikaNegative";
const contentFont = "24px SignikaNegative";

const difficulties = [
	{
		name: "EASY",
		color1: "#90e35d",
		color2: "#2fde5d",
	},
	{
		name: "MEDIUM",
		color1: "#f048ea",
		color2: "#8e4bf2",
	},
	{
		name: "HARD",
		color1: "#c40e0e",
		color2: "#f5462f",
	},
];

/**
 * @param {Client} client
 * @param {{
 * title: string,
 * content: string,
 * icon: string,
 * difficultyIndex: number
 * }} param1
 */
async function achievementGet(
	client,
	{ title, content, iconPath, difficultyIndex }
) {
	const difficulty = difficulties[difficultyIndex];
	const icon = await Canvas.loadImage(
		path.join(__dirname, "../assets/images/challenges", iconPath)
	);

	const canvas = Canvas.createCanvas(100, 100);
	const ctx = canvas.getContext("2d");

	ctx.font = titleFont;
	const { width: titleWidth } = ctx.measureText(title);

	ctx.font = contentFont;
	const { width: contentWidth } = ctx.measureText(content);

	canvas.width = Math.max(titleWidth, contentWidth) + canvas.height + 20;

	const accentColor = ctx.createLinearGradient(
		0,
		0,
		canvas.width,
		canvas.height
	);

	const background = ctx.createLinearGradient(
		0,
		0,
		canvas.width,
		canvas.height
	);

	accentColor.addColorStop(0, difficulty.color1);
	accentColor.addColorStop(1, difficulty.color2);

	background.addColorStop(0, "#414146");
	background.addColorStop(1, "#313136");

	ctx.fillStyle = accentColor;
	roundRect(ctx, 0, 0, canvas.width, canvas.height, 15);

	ctx.fillStyle = background;
	roundRect(ctx, 5, 5, canvas.width - 10, canvas.height - 10, 10);

	roundImage(ctx, icon, 20, 20, canvas.height - 40, canvas.height - 40, 0);

	ctx.font = titleFont;
	ctx.textBaseline = "top";
	ctx.fillStyle = accentColor;
	ctx.fillText(title, canvas.height, 20);

	ctx.font = contentFont;
	ctx.textBaseline = "bottom";
	ctx.fillStyle = "#fffd";
	ctx.fillText(content, canvas.height, canvas.height - 20);

	return client.globalData.addImage(await canvas.encode("png"));
}

module.exports = achievementGet;
