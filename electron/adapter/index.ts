import { Menu, MenuItem } from "electron"
import { win } from '../main/index';
export const adapterInit = () => {
    const menu = new Menu();
    menu.append(new MenuItem({
        label: 'pre',
        accelerator: 'a',
        click: () => {

            win.webContents.send("pre")
        }
    }))
    menu.append(new MenuItem({
        label: 'next',
        accelerator: 'd',
        click: () => {
            win.webContents.send("next")
        }
    }))




    Menu.setApplicationMenu(menu)
}