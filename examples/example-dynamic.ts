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
    const ret: Splashscreen.DynamicSplashScreen = Splashscreen.initDynamicSplashScreen({
        windowOpts: windowOptions,
        templateUrl: path.join(__dirname, "example-dynamic-splashscreen.html"),
        delay: 0, // force show immediately to better illustrate example
        splashScreenOpts: {
            height: 500,
            width: 500,
            transparent: true,
            // backgroundColor: "white",
        },
    });
    window = ret.main;
    /** Send information to the splashscreen. */
    const update = (i: number): void => {
        ret.splashScreen.webContents.send("update", i);
        if (i > 0) {
            setTimeout(() => update(i - 1), 500);
        } else {
            // Done sending updates to mock progress while loading window, so
            // go ahead and load the main window.
            window.loadURL(`file://${path.join(__dirname, "example-app.html")}`);
        }
    };
    update(5);
});
app.on("window-all-closed", () => {
    app.quit();
});
