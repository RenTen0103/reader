import { ipcRenderer } from 'electron';
import { voidloadEpub } from '../epub';
import { navAns } from '../epub/nav';
import { tocAns } from '../epub/toc';
import { bookdataStore } from '../pinia';

export const ipcEventInit = () => {

    ipcRenderer.on('opfData', (_, data, fiePath) => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, "text/xml");

        tocAns(xmlDoc, fiePath)
    })

    

    ipcRenderer.on('navData', (_, data) => {
        let toc = navAns(data)
        const store = bookdataStore()
        store.nav = toc
    })


    ipcRenderer.on('dirmap', (_, data) => {
        const store = bookdataStore()
        store.dirmap.push(data)
    })

}


