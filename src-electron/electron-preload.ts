/**
 * This file is used specifically for security reasons.
 * Here you can access Nodejs stuff and inject functionality into
 * the renderer thread (accessible there through the "window" object)
 *
 * WARNING!
 * If you import anything from node_modules, then make sure that the package is specified
 * in package.json > dependencies and NOT in devDependencies
 *
 * Example (injects window.myAPI.doAThing() into renderer thread):
 *
 *   import { contextBridge } from 'electron'
 *
 *   contextBridge.exposeInMainWorld('myAPI', {
 *     doAThing: () => {}
 *   })
 *
 * WARNING!
 * If accessing Node functionality (like importing @electron/remote) then in your
 * electron-main.ts you will need to set the following when you instantiate BrowserWindow:
 *
 * mainWindow = new BrowserWindow({
 *   // ...
 *   webPreferences: {
 *     // ...
 *     sandbox: false // <-- to be able to import @electron/remote in preload script
 *   }
 * }
 */
const { contextBridge, ipcRenderer } = require('electron');
import { MusinkResponse } from '../src/types/global';

function invoke<P extends any[], R>(channel: string, ...args: P) {
  return ipcRenderer.invoke(channel, ...args) as Promise<R>;
}

contextBridge.exposeInMainWorld('musinkAPI', {
  sendToMainProcess: ipcRenderer.send,
  onMainProcessEvent: ipcRenderer.on,
  invokeInMainProcess: ipcRenderer.invoke,
  fetch(...args: Parameters<typeof fetch>) {
    return invoke<Parameters<typeof fetch>, MusinkResponse>('fetch', ...args);
  },
  fetchURL(...args: Parameters<typeof fetch>): Promise<string> {
    return invoke('fetchURL', ...args) as Promise<string>;
  },
});

export {};
