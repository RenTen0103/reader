import { ipcRenderer } from 'electron';
import { navAns } from '../epub/nav';
import { tocAns } from '../epub/toc';
import { bookdataStore } from '../pinia';
import router from '../router';
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

    // ipcRenderer.on('nextPage', () => {
    //     (document.getElementsByTagName('iframe')[0].contentWindow as any).nextPage()
    // })


    // ipcRenderer.on('prePage', () => {
    //     (document.getElementsByTagName('iframe')[0].contentWindow as any).prePage()
    // })

    ipcRenderer.on('setting', () => {
        router.push('/setting')
    })


    ipcRenderer.on('returnReader', () => {
        router.push('/')
    })

}


