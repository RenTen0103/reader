import { Menu, ipcMain, BrowserWindow } from 'electron';
import { fileReader } from "../fileReader"
import fs from 'fs';
import { win } from '../main';
import path from 'path';
import { startServer } from '../express';
import { configLoad } from '../configLoad';

let lable = "设置"
let lable2 = "显示目录"
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
        configLoad()
    })


    ipcMain.on('contextMenu', () => {
        Menu.buildFromTemplate([{
            label: lable2,
            accelerator: 'm',
            click: () => {
                if (lable2 == "显示目录") {
                    lable2 = "隐藏目录"
                }else lable2 = "显示目录"
                win.webContents.send("hidToc")
            }
        },
        {
            label: '下一章',
            accelerator: 'Right',
            click: () => {
                win.webContents.send("next")
            }
        },
        {
            label: '上一章',
            accelerator: 'Left',
            click: () => {
                win.webContents.send("pre")
            }
        }, {
            label: '上一页',
            accelerator: 'a',
            click: () => {
                win.webContents.send("prePage")
            }
        }, {
            label: '下一页',
            accelerator: 'd',
            click: () => {
                win.webContents.send("nextPage")
            }
        }, {
            label: lable,
            click: () => {
                if (lable == "设置") {
                    lable = "返回阅读器"
                    win.webContents.send('setting')
                } else {
                    lable = "设置"
                    win.webContents.send('returnReader')
                }

            }
        }

        ]).addListener('menu-will-show', () => {
            win.webContents.send('menuShow')
        }).addListener('menu-will-close', () => {
            win.webContents.send('menuClose')
        }).popup({
            window: win
        })

    })
}
