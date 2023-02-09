import { Menu, MenuItem } from "electron"
import { win } from '../main/index';
export const adapterInit = () => {
    const template = [{
        label: 'hidToc',
        accelerator: 'm',
        click: () => {
            win.webContents.send("hidToc")
        }
    },
    {
        label: 'next',
        accelerator: 'Right',
        click: () => {
            win.webContents.send("next")
        }
    },
    {
        label: 'pre',
        accelerator: 'Left',
        click: () => {
            win.webContents.send("pre")
        }
    }, {
        label: 'prePage',
        accelerator: 'a',
        click: () => {
            win.webContents.send("prePage")
        }
    }, {
        label: 'nextPage',
        accelerator: 'd',
        click: () => {
            win.webContents.send("nextPage")
        }
    }, {
        label: 'page',
        accelerator: 'p',
        click: () => {
            win.webContents.send("paging")
        }
    }

    ]


    Menu.setApplicationMenu(Menu.buildFromTemplate([{
        label: 'action',
        submenu: template
    }]))



}