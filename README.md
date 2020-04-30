# santacruz-segura

Super simple webpack PWA (Progressive Web App) featuring

* Routing with **On Demand Loading**
* Offline support
* Fetching some data from network
* App Shell approache
* By intent: No framework, only simple JavaScript and DOM
  * Yes with `innerHTML` and `innerText`

## Build and Run it

``` shell
npm install
npm run build
cd dist
npm install node-static -g
static
open http://localhost:8080/
```

## Architecture

* Total size is smaller
* Initial load requests three files: `index.html`, `shell-1234.js`, `3456.js`
* Initial load needs to load: Shell + Router + content
* The shell is visible earlier than with Page Shell approach.