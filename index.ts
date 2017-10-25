/**
 * Module handles splash screen to show while app is loading.
 */

import { BrowserWindow } from "electron";

/** When splashscreen was shown. */
let splashScreenTimestamp: number = 0;
/** The actual splashscreen browser window. */
let splashScreen: Electron.BrowserWindow | null;
/** Splashscreen is loaded and ready to show. */
let splashScreenReady = false;
/** Main window has been loading for a min amount of time. */
let slowStartup = false;
/** Main window is loading. */
let isMainLoading = false;
/** Show splashscreen if criteria are met. */
const showSplash = () => {
    if (splashScreen && isMainLoading && splashScreenReady && slowStartup) {
        splashScreen.show();
        splashScreenTimestamp = Date.now();
    }
};
/** Close splashscreen. Ensure screen is visible for a min amount of time. */
const closeSplashScreen = (main: Electron.BrowserWindow): void => {
    if (splashScreen) {
        const timeout = 500 - (Date.now() - splashScreenTimestamp);
        setTimeout(() => {
            if (splashScreen) {
                splashScreen.close();
                splashScreen = null;
            }
            main.show();
        }, timeout);
    }
};
/**
 * Initializes a splashscreen that will show/hide smartly (and handle show/hiding of main window).
 * @param {Electron.BrowserWindow} main - the window that we are showing a splashscreen for
 */
export const initSplashScreen = (main: Electron.BrowserWindow): void => {
    main.hide(); // hide just in case you're visible
    splashScreen = new BrowserWindow({
        width: 425, // a bit bigger than the splash-screen.png
        height: 325,
        // transparent: true,
        frame: false,
        center: true,
        show: false,
    });
    splashScreen.loadURL(`file://${__dirname}/splash-screen.html`);
    // Splashscreen is fully loaded and ready to view.
    splashScreen.webContents.on("did-finish-load", () => {
        splashScreenReady = true;
        showSplash();
    });
    // Startup is taking enough time to show a splashscreen.
    setTimeout(() => {
        slowStartup = true;
        showSplash();
    }, 500);
    main.webContents.on("did-start-loading", (): void => {
        isMainLoading = true;
    });
    main.webContents.on("did-finish-load", (): void => {
        isMainLoading = false;
        closeSplashScreen(main);
    });
};
