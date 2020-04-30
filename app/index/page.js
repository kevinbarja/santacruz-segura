import {MDCDialog} from '@material/dialog';
import app from "../common/app-dialog/page.html";

import html from "./page.html";
import disclaimer from "./disclaimer.html";


export function open() {
	document.getElementById('app').innerHTML = html + disclaimer + app;
	
	const disclaimerDialog = new MDCDialog(document.querySelector('.disclaimer-dialog'));
	document.querySelector(".nav-disclaimer").addEventListener("click", () => {
		disclaimerDialog.open();
	});

	const appDialog = new MDCDialog(document.querySelector('.app-dialog'));
	document.querySelector(".nav-app").addEventListener("click", () => {
		appDialog.open();
	});	
	return Promise.resolve();
}

export function close() {
	return Promise.resolve();
}

