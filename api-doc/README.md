[@trodi/electron-splashscreen - v1.0.0](README.md)

# @trodi/electron-splashscreen - v1.0.0

## Index

### Interfaces

* [Config](interfaces/config.md)
* [DynamicSplashScreen](interfaces/dynamicsplashscreen.md)

### Functions

* [initDynamicSplashScreen](README.md#const-initdynamicsplashscreen)
* [initSplashScreen](README.md#const-initsplashscreen)

## Functions

### `Const` initDynamicSplashScreen

▸ **initDynamicSplashScreen**(`config`: [Config](interfaces/config.md)): *[DynamicSplashScreen](interfaces/dynamicsplashscreen.md)*

Initializes a splashscreen that will show/hide smartly (and handle show/hiding of main window).
Use this function if you need to send/receive info to the splashscreen (e.g., you want to send
IPC messages to the splashscreen to inform the user of the app's loading state).

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`config` | [Config](interfaces/config.md) | Configures splashscren |

**Returns:** *[DynamicSplashScreen](interfaces/dynamicsplashscreen.md)*

the main browser window and the created splashscreen

___

### `Const` initSplashScreen

▸ **initSplashScreen**(`config`: [Config](interfaces/config.md)): *BrowserWindow*

Initializes a splashscreen that will show/hide smartly (and handle show/hiding of main window).

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`config` | [Config](interfaces/config.md) | Configures splashscren |

**Returns:** *BrowserWindow*

the main browser window ready for loading
