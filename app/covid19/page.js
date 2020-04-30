import html from "./page.html";

export function open(name) {
	document.getElementById('app').innerHTML = html;
	return Promise.resolve();
}

export function close() {
	return Promise.resolve();
}