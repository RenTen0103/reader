import { ipcMain, ipcRenderer } from 'electron';
export const configLoad = () => {
    loadCss()
}

const loadCss = () => {
    ipcRenderer.on('cssload', (_, css) => {
        console.log(css);
        const style = document.createElement('style')
        style.innerHTML = css
        document.getElementsByTagName('head').item(0)?.appendChild(style);
        
    })
}