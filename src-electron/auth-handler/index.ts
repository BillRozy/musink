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
        let url = await getOAuthURL();
        if (authProvider == 'yandex') {
          const yaURL = new URL(url);
          const retpath = yaURL.searchParams.get('retpath') ?? '';
          const retURL = new URL(retpath);
          retURL.searchParams.set(
            'client_id',
            '23cabbbdc6cd418abb4b39c32c41195d'
          );
          yaURL.searchParams.set('retpath', retURL.toString());
          url = yaURL.toString();
        }
        console.log('URL', url);
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
          console.log('CB URL', callbackUrl);
          const query = new URL(callbackUrl).searchParams;
          let code: string | null;
          if (authProvider == 'yandex') {
            const [_, stringedQuery] = callbackUrl.split('#');
            const yaQuery = new URLSearchParams(stringedQuery);
            code = yaQuery.get('access_token');
            const expires_in = yaQuery.get('expires_in');
            const token_type = yaQuery.get('token_type');
            return resolve({
              access_token: code,
              expires_in,
              token_type,
            });
          } else {
            code = query.get('code');
          }
          console.log('code=', code);
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
