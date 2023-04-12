import { BrowserWindow, ipcMain } from 'electron';
import type {
  MusinkAPIProvider,
  MusinkIPCEventAuth,
} from '../../src/types/global.d.ts';
import useAuthProvider from '../../oauth-api';

let modalWindow: BrowserWindow; // only one modal window

export const useAuthHandler = (authProvider: MusinkAPIProvider) => {
  const { getOAuthURL, requestToken, refreshToken } =
    useAuthProvider(authProvider);
  ipcMain.handle(
    `${authProvider}-oauth-refresh-token` as MusinkIPCEventAuth,
    async (event, token) => {
      return refreshToken(token);
    }
  );
  ipcMain.handle(
    `${authProvider}-oauth-get-token` as MusinkIPCEventAuth,
    async () => {
      return new Promise(async (resolve, reject) => {
        const url = await getOAuthURL();
        modalWindow = new BrowserWindow({
          modal: true,
          webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            sandbox: true,
          },
        });
        const {
          session: { webRequest },
        } = modalWindow.webContents;
        const filter = {
          urls: [
            process.env[`VITE_${authProvider.toUpperCase()}_REDIRECT_URI`] +
              '*' ?? '',
          ],
        };
        webRequest.onBeforeRequest(filter, async ({ url: callbackUrl }) => {
          const query = new URL(callbackUrl).searchParams;
          const code = query.get('code');
          if (code == null) {
            return reject(new Error('"code" was not in query'));
          }
          try {
            return resolve(await requestToken(code));
          } catch (err) {
            return reject(err);
          } finally {
            modalWindow?.close();
          }
        });
        modalWindow.loadURL(url);
        // modalWindow.on('error', (event) => {});
      });
    }
  );
};
