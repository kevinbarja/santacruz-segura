require("./scss/style.scss");

import {MDCDialog} from '@material/dialog';
import { MDCTopAppBar } from '@material/top-app-bar';
import { MDCDrawer } from "@material/drawer";
import { MDCList } from "@material/list";
import firebase from 'firebase/app';

export function Template() {
  const shareDialog = new MDCDialog(document.querySelector('.share-dialog'));
	document.getElementById("share").addEventListener("click", () => {
		shareDialog.open();
	});	  


  var app = firebase.initializeApp({
    apiKey: "AIzaSyDysZHX41MHiWNzaaBlYDUoadkFMkpuMBY",
    authDomain: "santa-cruz-segura.firebaseapp.com",
    databaseURL: "https://santa-cruz-segura.firebaseio.com",
    projectId: "santa-cruz-segura",
    storageBucket: "santa-cruz-segura.appspot.com",
    messagingSenderId: "672000372188",
    appId: "1:672000372188:web:27473036164e2e9123f319",
    measurementId: "G-7QE4SSJE10"
  });  


  // Select DOM elements
  const topAppBarElement = document.querySelector('.mdc-top-app-bar');
  const listEl = document.querySelector('.mdc-drawer .mdc-list');
  const drawerElement = document.querySelector('.mdc-drawer');
  const mainContentEl = document.querySelector('.main-content');

  // App bar and list item selected
  document.querySelectorAll(".mdc-list-item").forEach( listItem => {
    if (window.location.href == listItem.href ) {
      //Set list item selected
      listItem.classList.add("mdc-list-item--selected");
      //Set app bar title
      document.querySelector("span.mdc-top-app-bar__title").innerHTML = 
      listItem.querySelector(".mdc-list-item__text").innerHTML;
    }
	});

  // Drawer
  const initModalDrawer = () => {
    drawerElement.classList.add("mdc-drawer--modal");
    const drawer = MDCDrawer.attachTo(drawerElement);
    drawer.open = false;

    const topAppBar = MDCTopAppBar.attachTo(topAppBarElement);
    topAppBar.setScrollTarget(mainContentEl);
    topAppBar.listen('MDCTopAppBar:nav', () => {
      drawer.open = !drawer.open;
    });

    listEl.addEventListener('click', (event) => {
      drawer.open = false;
    });

    return drawer;
  }

  initModalDrawer();

  const initPermanentDrawer = () => {
    drawerElement.classList.remove("mdc-drawer--modal");
    const list = new MDCList(listEl);
    list.wrapFocus = true;
    list.action
    return list;
  }

  let drawer = window.matchMedia("(max-width: 900px)").matches ?
    initModalDrawer() : initPermanentDrawer();

  // Toggle between permanent drawer and modal drawer at breakpoint 900px

  const resizeHandler = () => {
    if (window.matchMedia("(max-width: 900px)").matches && drawer instanceof MDCList) {
      drawer.destroy();
      drawer = initModalDrawer();
    } else if (window.matchMedia("(min-width: 900px)").matches && drawer instanceof MDCDrawer) {
      drawer.destroy();
      drawer = initPermanentDrawer();
    }
  }
  window.addEventListener('resize', resizeHandler);
}