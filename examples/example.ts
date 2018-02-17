import { app, BrowserWindow } from "electron";
import * as path from "path";
import * as url from "url";
import * as Splashscreen from "../index";

let window: BrowserWindow;
app.on("ready", () => {
    const windowOptions = {
        width: 500,
        height: 375,
        show: false,
    };
    window = Splashscreen.initSplashScreen({
        windowOpts: windowOptions,
        templateUrl: path.join(__dirname, "..", "icon.svg"),
        delay: 0, // force show immediately since example will load fast
        minVisible: 1500, // show for 1.5s so example is obvious
        splashScreenOpts: {
            height: 500,
            width: 500,
            transparent: true,
        },
    });
    window.loadURL(`file://${path.join(__dirname, "example-app.html")}`);
});
app.on("window-all-closed", () => {
    app.quit();
});
