import L from 'leaflet';
import 'leaflet-fullscreen';
import 'leaflet-easybutton';
import 'leaflet/dist/leaflet.css';
import 'leaflet-easybutton/src/easy-button.css';
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css'

import {MDCSnackbar} from '@material/snackbar';


export function Map() {
    const snackbar = new MDCSnackbar(document.querySelector('.mdc-snackbar'));
    
	//This code is needed to properly load the images in the Leaflet CSS
	delete L.Icon.Default.prototype._getIconUrl;
	L.Icon.Default.mergeOptions({
		iconRetinaUrl: require('../../images/map/marker-person-icon-2x.png'),
		iconUrl: require('../../images/map/marker-person-icon.png'),
		shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
	});

	// Base layers

	// const google = L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
	// 	subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
	// 	maxZoom: 18,
	// 	minZoom: 10,
	// 	attribution: '<b>Datos e imágenes del mapa:</b> &copy; <a href="https://google.com" target="_blank">Google</a>'
	// });		

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

	// Map
	var map = L.map('map', {
		center: [-17.783308, -63.182128],
		zoom: 12,
		zoomControl: false,
		attributionControl: true,
		layers: [gmsantacruz]
	});	

	// Current location
	var currentLocationMarker = null;

	map.on('locationfound', function (location) { 
		if (currentLocationMarker == null)
		{
			//Create marker and add to map.
			currentLocationMarker = L.marker(location.latlng, { 
				icon: L.icon({
					iconRetinaUrl: require('../../images/map/marker-person-icon-2x.png'),
					iconUrl: require('../../images/map/marker-person-icon.png'),
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
		"D-UV-MZ": gmsantacruz,
		"Calles": mapbox
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

	//Show location request
	map.locate({setView: true, maxZoom: 13});
	
    return map;
}