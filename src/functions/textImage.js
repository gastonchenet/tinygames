const Client = require("../structures/Client");
const Canvas = require("@napi-rs/canvas");
const themes = require("../storage/themes.json");
const { roundRect } = require("./canvasUtils");
const path = require("path");

const padding = 5;
const change = 150;

let halftone = null;
Canvas.loadImage(path.join(__dirname, "../assets/images/halftone.png")).then(
	(image) => (halftone = image)
);

/**
 * @param {Client} client
 * @param {themes["mainTheme"]} theme
 * @param {string} text
 */
async function textImage(client, theme, text) {
	const canvas = Canvas.createCanvas(500, 200);
	const ctx = canvas.getContext("2d");

	ctx.font = "40px FredokaOne";
	const { width } = ctx.measureText(text);
	canvas.width = Math.max(width, 500) + change;

	const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);

	gradient.addColorStop(0, theme.primaryColor);
	gradient.addColorStop(1, theme.secondaryColor);
	ctx.fillStyle = gradient;
	roundRect(
		ctx,
		padding,
		padding,
		canvas.width - padding * 2,
		canvas.height - padding * 2,
		20
	);
	ctx.clip();

	if (theme.halftone && halftone) {
		ctx.globalAlpha = 0.5;
		for (let i = 0; i < canvas.width; i += 300) {
			ctx.drawImage(halftone, i, 0, 300, canvas.height);
		}
	}

	ctx.globalAlpha = 1;
	ctx.lineWidth = 8;
	ctx.strokeStyle = theme.textBorderColor;
	ctx.fillStyle = theme.textFillColor;
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.font = "40px FredokaOne";
	ctx.strokeText(text, canvas.width / 2, canvas.height / 2 + 5);
	ctx.fillText(text, canvas.width / 2, canvas.height / 2 + 3);

	return client.globalData.addImage(await canvas.encode("png"));
}

module.exports = textImage;
