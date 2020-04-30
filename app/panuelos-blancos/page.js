import html from "./page.html";
import {MDCTabBar} from '@material/tab-bar';
import L from 'leaflet';
import 'leaflet-fullscreen';
import 'leaflet-easybutton';
import 'leaflet/dist/leaflet.css';
import 'leaflet-easybutton/src/easy-button.css';
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css'
import {MDCSnackbar} from '@material/snackbar';
import mapDialog from '../common/map/page.html';
import { MovingMarker } from './MovingMarker.js';

export function open() {
	new MovingMarker();
	
	document.getElementById('app').innerHTML = html + mapDialog;
    const snackbar = new MDCSnackbar(document.querySelector('.mdc-snackbar'));	

	// Map
	//This code is needed to properly load the images in the Leaflet CSS
	delete L.Icon.Default.prototype._getIconUrl;
	L.Icon.Default.mergeOptions({
		iconRetinaUrl: require('../images/map/marker-pb-icon-2x.png'),
		iconUrl: require('../images/map/marker-pb-icon.png'),
		shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
	});

	const gmsantacruz = L.tileLayer('https://guiaurbana.gmsantacruz.gob.bo/TILESERVER/dpns/{z}/{x}/{y}.png', {
		maxZoom: 18,
		minZoom: 10,
		attribution: '<b>Datos e imágenes del mapa:</b> <a href="https://guiaurbana.gmsantacruz.gob.bo" target="_blank">GMSantaCruz</a>'
	});	


	const mapbox = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoic2FudGFjcnV6c2VndXJhIiwiYSI6ImNrOHhkMmVvZDEzcWozZXFoYWpna3pucGwifQ.Dslx-pROA3bA4kRS7sQFJA', {
		id: "mapbox.streets",
		maxZoom: 18,
		minZoom: 10,
		attribution: '<b>Datos del mapa:</b> Contribuyentes de &copy; <a href="https://www.openstreetmap.org/" target="_blank">OpenStreetMap</a>, <a href="https://creativecommons.org/licenses/by-sa/2.0/" target="_blank">CC-BY-SA</a>, <b>Imágenes del mapa:</b> © <a href="https://www.mapbox.com/" target="_blank">Mapbox</a>'
	});	

	// Current location
	var currentLocationMarker = null;
	
	// Map
	var map = L.map('map', {
		center: [-17.783308, -63.182128],
		zoom: 12,
		zoomControl: false,
		attributionControl: false,
		layers: [mapbox]
	});	
	
	map.on('locationfound', function (location) { 
		if (currentLocationMarker == null)
		{
			//Create marker and add to map.
			currentLocationMarker = L.marker(location.latlng, { 
				icon: L.icon({
					iconRetinaUrl: require('../images/map/marker-person-icon-2x.png'),
					iconUrl: require('../images/map/marker-person-icon.png'),
					shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
					iconSize: [25,41],
					iconAnchor: [12,41],
					popupAnchor: [1,-34],
					tooltipAnchor: [16, -28],
					shadowSize:[41,41]
				})
			});
			currentLocationMarker.addTo(map);		
		} else {
			//Update marker location.
			currentLocationMarker.setLatLng(location.latlng);	
		}
		//Open popup.
		currentLocationMarker.bindPopup("Te encuentras aquí actualmente").openPopup();
	});
	
	map.on('locationerror', function (e) { 
		snackbar.open();
	});	

	// Options
	L.control.layers({
		"Calles": mapbox,
		"UV-MZ": gmsantacruz
	}).addTo(map);

	L.control.zoom({
		position: 'topright',
		zoomInTitle: "Acercar",
		zoomOutTitle: "Alejar"
	}).addTo(map);
	
	map.addControl(new L.Control.Fullscreen({
		position: 'topright',
		title: {
			'false': 'Pantalla completa',
			'true': 'Salir de pantalla completa'
		}
	}));
	
	L.easyButton({
		position: 'topright',
		states: [{
			icon: '<span class="material-icons"> gps_fixed </span>',
			title: 'Ubicación actual',
			onClick: function (control) {
				map.locate({setView: true, maxZoom: 13});
			}
		}]
	}).addTo(map);	

	var bounds = [
		[-17.770271, -63.171322],
		[-17.770457, -63.182601],
		[-17.767372, -63.182189],
		[-17.759627, -63.179110],
		[-17.757967, -63.178456],
		[-17.757941, -63.175747],
		[-17.758037, -63.173867],
		[-17.758426, -63.171037],
		[-17.759435, -63.166976],
		[-17.761402, -63.167782],
		[-17.770183, -63.171241]
	];

	L.polygon(bounds, {
		color: 'yellow',
		fillColor: '#37966f',
		fillOpacity: 0.25
	}).addTo(map);	

	



	const tabBar = new MDCTabBar(document.querySelector('.mdc-tab-bar'));

	tabBar.listen('MDCTabBar:activated', (activatedEvent) => {
	  document.querySelectorAll('.pb-body').forEach((element, index) => {
		if (index === activatedEvent.detail.index) {
		  element.classList.remove('pb-body--hidden');
		} else {
		  element.classList.add('pb-body--hidden');
		}

		if  (activatedEvent.detail.index == 1) {
			//Remove markers 
			map.eachLayer(function (layer) {
				if (layer.hasOwnProperty("_currentDuration")) {
					console.log(layer);
				 	map.removeLayer(layer);
				 	return false;
				}
			});

			// Create Markers 
			L.Marker.movingMarker([[-17.770271, -63.171322],
					[-17.770457, -63.182601],
					[-17.767372, -63.182189],
					[-17.759627, -63.179110]],
				[20000]).addTo(map).bindPopup(marketFormatUserFriendly("Juan Perez", "70000000")).start();

			L.Marker.movingMarker([[-17.763884, -63.176221],
					[-17.765898, -63.169604]],
			[20000]).addTo(map).bindPopup(marketFormatUserFriendly("Hugo Boss", "60000000")).start();	

			L.Marker.movingMarker([[-17.758006, -63.178456],
				[-17.758319, -63.171482],
				[-17.759454, -63.167028]
			],[20000]).addTo(map).bindPopup(marketFormatUserFriendly("Julio Verne", "60000000")).start();	
			
			L.Marker.movingMarker([[-17.768077, -63.182325],
				[-17.768071, -63.178015]
			],[20000]).addTo(map).bindPopup(marketFormatUserFriendly("Jonh Doe", "60000000")).start();	 
			
			L.Marker.movingMarker([[-17.763177, -63.173582],
				[-17.764362, -63.168985]
			],[20000]).addTo(map).bindPopup(marketFormatUserFriendly("Martin J.", "70000000")).start();	

			L.Marker.movingMarker([[-17.759463, -63.174902],
				[-17.770237, -63.178794]
			],[20000]).addTo(map).bindPopup(marketFormatUserFriendly("Carlos B.", "70000000")).start();		

			L.Marker.movingMarker([[-17.761585, -63.177006],
				[-17.759511, -63.176212]
			],[20000]).addTo(map).bindPopup(marketFormatUserFriendly("Voluntario 1.", "70000000")).start();		
			
			L.Marker.movingMarker([[-17.767583, -63.176360],
				[-17.764927, -63.175266]
			],[20000]).addTo(map).bindPopup(marketFormatUserFriendly("Voluntario 2.", "70000000")).start();	



			map.setView(L.latLng(-17.764599, -63.175187), 15.4, { animation: true });
			map.invalidateSize();			
		}

	  });
	});		

	// Add leyend to map
	var legend = L.control({ position: "topleft" });

	legend.onAdd = function (map) {
		var div = L.DomUtil.create("div", "legend");
		div.innerHTML += "Los marcadores azules son una simulación de los ";
		div.innerHTML += "<br>voluntarios que recojerán tu donación casa por casa.";
		return div;
	};	
	legend.addTo(map);	

	return Promise.resolve();
}

function marketFormatUserFriendly(name, phone) {
		return `<div style='text-align:center'>` +
		`<b>Información del voluntario</b>` +
		`</div>` +		
			`<table class='table'>` +
			`<tr> <td><b>Nombre</b> <td><b>:</b> ${name}</td>` +
			`<tr> <td><b>Celular</b>  <td><b>:</b> <a target='_blank' href='tel:${phone}'> ${phone}</a></td>` +
			`</table>`;
}

export function close() {
	return Promise.resolve();
}

