const { GlobalFonts } = require("@napi-rs/canvas");
const path = require("path");

const DIR = path.join(__dirname, "./assets/fonts");

GlobalFonts.registerFromPath(path.join(DIR, "FredokaOne.ttf"), "FredokaOne");
GlobalFonts.registerFromPath(path.join(DIR, "Mynerve.ttf"), "Mynerve");
GlobalFonts.registerFromPath(path.join(DIR, "Helvetica.otf"), "Helvetica");
GlobalFonts.registerFromPath(
	path.join(DIR, "SignikaNegative.ttf"),
	"SignikaNegative"
);
