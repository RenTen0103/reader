import { ipcMain, ipcRenderer } from 'electron';
export const configLoad = () => {
    loadCss()
}



let style: HTMLStyleElement;
const loadCss = () => {
    ipcRenderer.on('cssload', (_, css) => {
        // console.log(css);
        style = document.createElement('style')
        style.innerHTML = css
        document.getElementsByTagName('head').item(0)?.appendChild(style);
    })
}

export const reloadCss = (css: string) => {
    document.getElementsByTagName('head').item(0)?.removeChild(style);
    style.innerHTML = css
    document.getElementsByTagName('head').item(0)?.appendChild(style);
}
