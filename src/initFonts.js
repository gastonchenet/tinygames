const { registerFont } = require("canvas");
const path = require("path");

const DIR = path.join(__dirname, "./assets/fonts");

registerFont(path.join(DIR, "FredokaOne.ttf"), {
	family: "FredokaOne",
});

registerFont(path.join(DIR, "Mynerve.ttf"), {
	family: "Mynerve",
});
