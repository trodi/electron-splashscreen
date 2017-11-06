import { app, BrowserWindow } from "electron";
import * as path from "path";
import * as url from "url";
import * as Splashscreen from "./index";

let window: BrowserWindow;
app.on("ready", () => {
    const windowOptions = {
        width: 800,
        height: 600,
        show: false,
    };
    window = Splashscreen.initSplashScreen({
        windowOpts: windowOptions,
        templateUrl: path.join(__dirname, "example-splashscreen.html"),
        delay: 0, // force show immediately since example will load fast
        // uncomment to force show splashscreeen for longer
        // minVisible: 5000,
        splashScreenOpts: {
            height: 200,
            width: 200,
        },
    });
    window.loadURL(`file://${path.join(__dirname, "example-app.html")}`);
});
app.on("window-all-closed", () => {
    app.quit();
});
