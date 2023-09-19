export {};
import { ipcRenderer } from 'electron';
import { Response } from 'node-fetch';

interface MusinkAPI {
  sendToMainProcess: typeof ipcRenderer.send;
  onMainProcessEvent: typeof ipcRenderer.on;
  invokeInMainProcess: typeof ipcRenderer.invoke;
  fetch: (...args: Parameters<typeof fetch>) => Promise<MusinkResponse>;
  fetchURL: (...args: Parameters<typeof fetch>) => Promise<string>;
}

export type MusinkAPIProvider = 'yandex' | 'spotify';
export type MusinkIPCEventAuth =
  | `${MusinkAPIProvider}-oauth-get-token`
  | `${MusinkAPIProvider}-oauth-refresh-token`;
export type MusinkIPCEvent = MusinkIPCEventAuth;

export type MusinkResponse = Pick<
  Response,
  'ok' | 'headers' | 'redirected' | 'status' | 'statusText' | 'url' | 'type'
> & {
  body?: object;
  error?: {
    message: string;
  };
};

declare global {
  // eslint-disable-next-line
  var musinkAPI: MusinkAPI;
}
