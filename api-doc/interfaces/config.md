[@trodi/electron-splashscreen](../README.md) > [Config](../interfaces/config.md)



# Interface: Config


`electron-splashscreen` config object.


## Properties
<a id="delay"></a>

### «Optional» delay

**●  delay**:  *`undefined`⎮`number`* 




Number of ms the window will load before splashscreen appears (default: 500ms).




___

<a id="minvisible"></a>

### «Optional» minVisible

**●  minVisible**:  *`undefined`⎮`number`* 




Minimum ms the splashscreen will be visible (default: 500ms).




___

<a id="splashscreenopts"></a>

###  splashScreenOpts

**●  splashScreenOpts**:  *`BrowserWindowConstructorOptions`* 




Full set of browser window options for the splashscreen. We override key attributes to make it look & feel like a splashscreen; the rest is up to you!




___

<a id="templateurl"></a>

###  templateUrl

**●  templateUrl**:  *`string`* 




URL to the splashscreen template. This is the path to an `HTML` or `SVG` file. If you want to simply show a `PNG`, wrap it in an `HTML` file.




___

<a id="windowopts"></a>

###  windowOpts

**●  windowOpts**:  *`BrowserWindowConstructorOptions`* 




Options for the window that is loading and having a splashscreen tied to.




___


