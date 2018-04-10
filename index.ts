/**
 * Module handles configurable splashscreen to show while app is loading.
 */

import { BrowserWindow } from "electron";

/**
 * When splashscreen was shown.
 * @private
 */
let splashScreenTimestamp: number = 0;
/**
 * Splashscreen is loaded and ready to show.
 * @private
 */
let splashScreenReady = false;
/**
 * Main window has been loading for a min amount of time.
 * @private
 */
let slowStartup = false;
/**
 * Show splashscreen if criteria are met.
 * @private
 */
const showSplash = () => {
    if (splashScreen && splashScreenReady && slowStartup) {
        splashScreen.show();
        splashScreenTimestamp = Date.now();
    }
};
/**
 * Close splashscreen / show main screen. Ensure screen is visible for a min amount of time.
 * @private
 */
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
/** `electron-splashscreen` config object. */
export interface Config {
    /** Options for the window that is loading and having a splashscreen tied to. */
    windowOpts: Electron.BrowserWindowConstructorOptions;
    /**
     * URL to the splashscreen template. This is the path to an `HTML` or `SVG` file.
     * If you want to simply show a `PNG`, wrap it in an `HTML` file.
     */
    templateUrl: string;
    /**
     * Full set of browser window options for the splashscreen. We override key attributes to
     * make it look & feel like a splashscreen; the rest is up to you!
     */
    splashScreenOpts: Electron.BrowserWindowConstructorOptions;
    /** Number of ms the window will load before splashscreen appears (default: 500ms). */
    delay?: number;
    /** Minimum ms the splashscreen will be visible (default: 500ms). */
    minVisible?: number;
}
/**
 * Internal config object.
 * @private
 */
interface XConfig {
    windowOpts: Electron.BrowserWindowConstructorOptions;
    templateUrl: string;
    splashScreenOpts: Electron.BrowserWindowConstructorOptions;
    delay: number;
    minVisible: number;
}
/**
 * The actual splashscreen browser window.
 * @private
 */
let splashScreen: Electron.BrowserWindow | null;
/**
 * Initializes a splashscreen that will show/hide smartly (and handle show/hiding of main window).
 * @param config - Configures splashscren
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
    window.webContents.on("did-finish-load", (): void => {
        closeSplashScreen(window, xConfig.minVisible);
    });
    return window;
};
/** Return object for `initDynamicSplashScreen()`. */
export interface DynamicSplashScreen {
    /** The main browser window ready for loading */
    main: BrowserWindow;
    /** The splashscreen browser window so you can communicate with splashscreen in more complex use cases. */
    splashScreen: Electron.BrowserWindow;
}
/**
 * Initializes a splashscreen that will show/hide smartly (and handle show/hiding of main window).
 * Use this function if you need to send/receive info to the splashscreen (e.g., you want to send
 * IPC messages to the splashscreen to inform the user of the app's loading state).
 * @param config - Configures splashscren
 * @returns {DynamicSplashScreen} the main browser window and the created splashscreen
 */
export const initDynamicSplashScreen = (config: Config): DynamicSplashScreen => {
    return {
        main: initSplashScreen(config),
        // initSplashScreen initializes splashscreen so this is a safe cast.
        splashScreen: splashScreen as Electron.BrowserWindow,
    };
};
