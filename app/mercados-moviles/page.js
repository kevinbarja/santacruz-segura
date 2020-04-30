import html from "./page.html";
import mapDialog from '../common/map/page.html';
import { Map } from '../common/map/index.js';
import data from './data.json';
import 'leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import '../common/map/MarkerCluster.Custom.css';

export function open() {
	document.getElementById('app').innerHTML = html + mapDialog;
	// Init map.
	const map = new Map();

	var markets = data;

	var markers = L.markerClusterGroup({ 
		disableClusteringAtZoom: 14,
		spiderfyOnMaxZoom: false, 
		showCoverageOnHover: true, 
		zoomToBoundsOnClick: false 		
	});
	// Render markerts.
	markets.forEach(market => {
		markers.addLayer(L.marker(new L.LatLng(market.lat, market.lng), {
			icon: L.icon({
				iconRetinaUrl: require('../images/map/marker-local-shipping-icon-2x.png'),
				iconUrl: require('../images/map/marker-local-shipping-icon.png'),
				shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
				iconSize: [25, 41],
				iconAnchor: [12, 41],
				popupAnchor: [1, -34],
				tooltipAnchor: [16, -28],
				shadowSize: [41, 41]
			})
		}));
	});

	map.addLayer(markers);
	return Promise.resolve();
}

export function close() {
	return Promise.resolve();
}

