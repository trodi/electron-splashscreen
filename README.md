# electron-splashscreen [![Build Status](https://travis-ci.org/trodi/electron-splashscreen.svg)](https://travis-ci.org/trodi/electron-splashscreen)
> *Simple splashscreen for [Electron](http://electron.atom.io) applications.*

Ideally, your application loads instantaneously. However, some applications are larger and/or may be running on a slower machine, causing the load to take longer. If the application is taking a bit to load, this splashscreen will appear so the user knows the application is loading, but can't interact with a partially loaded page.

*No external dependencies.*

## Install
```
npm install @trodi/electron-splashscreen
```

## Usage

### Typescript Usage (javascript would be similar)

*Example of your Electron browser process.*
```typescript
// import the module
import * as Splashscreen from "@trodi/electron-splashscreen";
const mainOpts: Electron.BrowserWindowConstructorOptions = ...
// configure the splashscreen
const config: Splashscreen.Config = {
    windowOpts: mainOpts;
    templateUrl: `${__dirname}/splash-screen.html`;
    splashScreenOptions: {
        width: 425,
        height: 325,
    },
};
// initialize the splashscreen handling
const main: BrowserWindow = Splashscreen.initSplashScreen(config);
// load your browser window per usual
main.loadURL(`file://index.html`);
```

You can run examples via `npm run example` and `npm run example-dynamic`.

## Build
`npm run build`

## License
[MIT License](LICENSE)
