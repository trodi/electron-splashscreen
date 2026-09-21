[@trodi/electron-splashscreen - v1.0.3](../README.md) › [Config](config.md)

# Interface: Config

`electron-splashscreen` config object.

## Hierarchy

* **Config**

## Index

### Properties

* [closeWindow](config.md#optional-closewindow)
* [delay](config.md#optional-delay)
* [minVisible](config.md#optional-minvisible)
* [splashScreenOpts](config.md#splashscreenopts)
* [templateUrl](config.md#templateurl)
* [windowOpts](config.md#windowopts)

## Properties

### `Optional` closeWindow

• **closeWindow**? : *undefined | false | true*

Close window that is loading if splashscreen is closed by user (default: true).

___

### `Optional` delay

• **delay**? : *undefined | number*

Number of ms the window will load before splashscreen appears (default: 500ms).

___

### `Optional` minVisible

• **minVisible**? : *undefined | number*

Minimum ms the splashscreen will be visible (default: 500ms).

___

###  splashScreenOpts

• **splashScreenOpts**: *BrowserWindowConstructorOptions*

Full set of browser window options for the splashscreen. We override key attributes to
make it look & feel like a splashscreen; the rest is up to you!

___

###  templateUrl

• **templateUrl**: *string*

URL to the splashscreen template. This is the path to an `HTML` or `SVG` file.
If you want to simply show a `PNG`, wrap it in an `HTML` file.

___

###  windowOpts

• **windowOpts**: *BrowserWindowConstructorOptions*

Options for the window that is loading and having a splashscreen tied to.
