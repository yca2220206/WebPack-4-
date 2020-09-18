import "babel-polyfill";
import heading from "./components/heading/heading";
import kiwiImage from "./components/kiwi-image/kiwi-image";
const header = new heading();
const kiwi = new kiwiImage();
header.render();
kiwi.render();
