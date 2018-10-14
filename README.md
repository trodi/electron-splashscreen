<img src="https://raw.githubusercontent.com/trodi/electron-splashscreen/master/icon.svg?sanitize=true" width="200" height="200" align="right" />

# electron-splashscreen [![Build Status](https://travis-ci.org/trodi/electron-splashscreen.svg)](https://travis-ci.org/trodi/electron-splashscreen)
> *Simple splashscreen for [Electron](http://electron.atom.io) applications.*

Ideally, your application loads instantaneously. However, some applications are larger and/or may be running on a slower machine, causing the load to take longer. If the application is taking a bit to load, `electron-splashscreen` will appear so the user knows the application is loading, but can't interact with a partially loaded application.

`electron-splashscreen` is simple to incorperate, while allowing you the freedom to customize with any look, feel, and functionality.

*No external dependencies.*

<p align="center"><img src="https://raw.githubusercontent.com/trodi/electron-splashscreen/master/demo.gif" width="400"></p>

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
    splashScreenOpts: {
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

## API
[API Documentation](https://github.com/trodi/electron-splashscreen/blob/master/api-doc/README.md)

## Build
`npm run build`

## Publish
* `npm version <patch|minor|major>`
* `npm publish`
* Commit and push changes to git

## License
[MIT License](LICENSE)
