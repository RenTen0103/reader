import { ipcRenderer } from "electron";


ipcRenderer.on('ready',console.log(1))