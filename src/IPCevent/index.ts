import { ipcRenderer } from 'electron';
import { navAns } from '../epub/nav';
import { tocAns } from '../epub/toc';
import { bookdataStore } from '../pinia';
import router from '../router';
import { dirUtiles } from '../utils/dirUtil';
import store from 'electron-store';
import path from 'path';

export const ipcEventInit = () => {
    const estore = new store()
    const bdstore = bookdataStore()
    ipcRenderer.on('opfData', (_, data, fiePath) => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, "text/xml");

        tocAns(xmlDoc, fiePath)
    })


    ipcRenderer.on('navData', (_, data, p) => {
        let toc = navAns(data)
        const store = bookdataStore()
        store.nav = toc
        bdstore.path = path.dirname(p)
        dirUtiles()
        bdstore.storeLocal()
        bdstore.$reset()
        ipcRenderer.send('readFinish')
    })


    ipcRenderer.on('dirmap', (_, data) => {
        const store = bookdataStore()
        store.dirmap.push(data)
    })


    ipcRenderer.on('setting', () => {
        router.push('/setting')
    })


    ipcRenderer.on('returnReader', () => {
        router.push('/bookReader')
    })

    ipcRenderer.on('md5', (_, md5) => {
        bookdataStore().md5 = md5
        if (estore.get(md5)) {
            // console.log("此书已被解析");
            ipcRenderer.send('startServer', (estore.get('md5') as any).path)
        } else {

            ipcRenderer.send('fileVerify')
        }
    })

    // ipcRenderer.on('finish', (_, p) => {
    // bdstore.path = p
    // dirUtiles()
    // bdstore.storeLocal()
    // })

    ipcRenderer.on('cover', (_, url) => {
        bdstore.cover = url
    })

    ipcRenderer.on('mainPage', () => {
        router.push('/')
    })
}


