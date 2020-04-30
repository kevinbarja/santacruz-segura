import html from "./page.html";
import {MDCDialog} from '@material/dialog';
import app from "../common/app-dialog/page.html";
import mapDialog from '../common/map/page.html';
import { Map } from '../common/map/index.js';

export function open(name) {
    document.getElementById('app').innerHTML = html + app + mapDialog;
    const appDialog = new MDCDialog(document.querySelector('.app-dialog'));
	document.querySelector(".nav-app").addEventListener("click", () => {
		appDialog.open();
	});	

	// Init map.
	const map = new Map();

	// Add leyend to map
	/*Legend specific*/
	var legend = L.control({ position: "topleft" });

	legend.onAdd = function (map) {
		var div = L.DomUtil.create("div", "legend");
		div.innerHTML += "No hemos encontrado ningún productor online."
		div.innerHTML += "<br>Existe restricción de circulación hasta el medio día.";
		return div;
	};

	legend.addTo(map);	

	return Promise.resolve();
}

export function close() {
	return Promise.resolve();
}