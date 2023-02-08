import { ipcMain, ipcRenderer } from 'electron';
import { fileReader } from "../fileReader"
import fs from 'fs';
import { win } from '../main';
import path from 'path';
import { startServer } from '../express';


export const eventInit = () => {
    ipcMain.on('filePath', (_, p) => {
        fileReader(p)
    })


    ipcMain.on('getNav', (_, p) => {

        win.webContents.send('navData', fs.readFileSync(p).toString())
    })

    ipcMain.on('bookReady', (_, p) => {
        while (p = path.dirname(p)) {
            if (path.basename(path.dirname(p)) == 'unziped') {
                break
            }
        }

        startServer(p)

        win.webContents.send('start', p)
    })


    ipcMain.on('ready', () => {
        win.webContents.send('text', process.argv)
    })
}
