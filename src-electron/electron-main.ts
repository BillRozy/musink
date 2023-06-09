import { app, BrowserWindow, nativeTheme, ipcMain } from 'electron';
import { initialize } from '@electron/remote/main';
import path from 'path';
import os from 'os';
import fetch from 'node-fetch';
import { useAuthHandler } from './auth-handler';
import { MusinkAPIProvider } from '../src/types/global';
// needed in case process is undefined under Linux
const platform = process.platform || os.platform();
initialize();

try {
  if (platform === 'win32' && nativeTheme.shouldUseDarkColors === true) {
    require('fs').unlinkSync(
      path.join(app.getPath('userData'), 'DevTools Extensions')
    );
  }
} catch (_) {}

let mainWindow: BrowserWindow | undefined;

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    icon: path.resolve(__dirname, 'icons/icon.png'), // tray icon
    width: 1000,
    height: 600,
    useContentSize: true,
    // frame: false, // <-- add this
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false,
      // More info: https://v2.quasar.dev/quasar-cli-vite/developing-electron-apps/electron-preload-script
      preload: path.resolve(__dirname, process.env.QUASAR_ELECTRON_PRELOAD),
    },
  });

  mainWindow.webContents.session.webRequest.onBeforeSendHeaders(
    (details, callback) => {
      callback({ requestHeaders: { Origin: '*', ...details.requestHeaders } });
    }
  );

  mainWindow.webContents.session.webRequest.onHeadersReceived(
    (details, callback) => {
      callback({
        responseHeaders: {
          ...(details.url.includes('yastatic.net') ||
          details.url.includes('api/token') ||
          details.url.includes('/me')
            ? {}
            : {
                'Access-Control-Allow-Origin': ['*'],
                'Access-Control-Allow-Methods': ['*'],
                'Access-Control-Allow-Headers': ['*'],
              }),
          ...details.responseHeaders,
        },
      });
    }
  );

  mainWindow.loadURL(process.env.APP_URL);

  if (process.env.DEBUGGING) {
    // if on DEV or Production with debug enabled
    mainWindow.webContents.openDevTools();
  } else {
    // we're on production; no access to devtools pls
    mainWindow.webContents.on('devtools-opened', () => {
      mainWindow?.webContents.closeDevTools();
    });
  }

  mainWindow.on('closed', () => {
    mainWindow = undefined;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === undefined) {
    createWindow();
  }
});

ipcMain.handle(
  'fetchJSON',
  async (event, ...args: Parameters<typeof fetch>) => {
    const resp = await fetch(...args);
    console.log(resp.url);
    return resp.json();
  }
);

ipcMain.handle('fetchURL', async (event, ...args: Parameters<typeof fetch>) => {
  const resp = await fetch(...args);
  return resp.url;
});

const apiProviders: MusinkAPIProvider[] = ['spotify', 'yandex'];
apiProviders.map((provider) => {
  useAuthHandler(provider);
});
