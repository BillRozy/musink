export {};
import { ipcRenderer } from 'electron';

interface MusinkAPI {
  sendToMainProcess: typeof ipcRenderer.send;
  onMainProcessEvent: typeof ipcRenderer.on;
  invokeInMainProcess: typeof ipcRenderer.invoke;
  fetchJSON: (...args: Parameters<typeof fetch>) => Promise<object>;
  fetchURL: (...args: Parameters<typeof fetch>) => Promise<string>;
}
declare global {
  // eslint-disable-next-line
  var musinkAPI: MusinkAPI;
}
