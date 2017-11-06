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
/** Close splashscreen / show main screen. Ensure screen is visible for a min amount of time. */
const closeSplashScreen = (main: Electron.BrowserWindow, min: number): void => {
    if (splashScreen) {
        const timeout = min - (Date.now() - splashScreenTimestamp);
        setTimeout(() => {
            if (splashScreen) {
                splashScreen.close();
                splashScreen = null;
            }
            main.show();
        }, timeout);
    }
};
/** Splashscreen config object. */
export interface Config {
    /** Options for the window that is loading and tieing a splashscreen to. */
    windowOpts: Electron.BrowserWindowConstructorOptions;
    /** URL to the splashscreen template. */
    templateUrl: string;
    /**
     * Full set of browser window options for the splashscreen. We override key attributes to
     * make it look & feel like a splashscreen; the rest is up to you!
     */
    splashScreenOpts: Electron.BrowserWindowConstructorOptions;
    /** Number of ms the window will load before splashscreen appears (default: 500ms). */
    delay?: number;
    /** Minimum ms the splashscreen will be visible (default: 500ms).  */
    minVisible?: number;
}
/** Internal config object. */
interface XConfig {
    windowOpts: Electron.BrowserWindowConstructorOptions;
    templateUrl: string;
    splashScreenOpts: Electron.BrowserWindowConstructorOptions;
    delay: number;
    minVisible: number;
}
/**
 * Initializes a splashscreen that will show/hide smartly (and handle show/hiding of main window).
 * @param {Electron.BrowserWindow} main - the window that we are showing a splashscreen for
 * @returns {BrowserWindow} the main browser window ready for loading
 */
export const initSplashScreen = (config: Config): BrowserWindow => {
    const xConfig: XConfig = {
        delay: config.delay === undefined ? 500 : config.delay,
        minVisible: config.minVisible === undefined ? 500 : config.minVisible,
        windowOpts: config.windowOpts,
        templateUrl: config.templateUrl,
        splashScreenOpts: config.splashScreenOpts,
    };
    xConfig.splashScreenOpts.frame = false;
    xConfig.splashScreenOpts.center = true;
    xConfig.splashScreenOpts.show = false;
    xConfig.windowOpts.show = false;
    const window = new BrowserWindow(xConfig.windowOpts);
    splashScreen = new BrowserWindow(xConfig.splashScreenOpts);
    splashScreen.loadURL(`file://${xConfig.templateUrl}`);
    // Splashscreen is fully loaded and ready to view.
    splashScreen.webContents.on("did-finish-load", () => {
        splashScreenReady = true;
        showSplash();
    });
    // Startup is taking enough time to show a splashscreen.
    setTimeout(() => {
        slowStartup = true;
        showSplash();
    }, xConfig.delay);
    window.webContents.on("did-start-loading", (): void => {
        isMainLoading = true;
    });
    window.webContents.on("did-finish-load", (): void => {
        isMainLoading = false;
        closeSplashScreen(window, xConfig.minVisible);
    });
    return window;
};
