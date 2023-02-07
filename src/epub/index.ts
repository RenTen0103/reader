import path from 'path'
import { ipcRenderer } from 'electron';
import { bookdataStore } from '../pinia';

export const voidloadEpub = (xmlDoc: Document, filePath: string) => {
    let rawxHtml = [];

    const manifest = xmlDoc.getElementsByTagName('manifest')[0];
    const spine = xmlDoc.getElementsByTagName('spine')[0]
    const guide = xmlDoc.getElementsByTagName('guide')[0]

    const mainfestItems = manifest.getElementsByTagName('item')

    let nav;

    for (let index = 0; index < mainfestItems.length; index++) {
        const mainfestItem = mainfestItems[index];
        if (mainfestItem.getAttribute('properties') == 'nav') {
            nav = mainfestItem
        }
    }


    const navHref = nav?.getAttribute('href')
    let navpath;
    if (navHref) {
        navpath = (path.join(path.dirname(filePath), navHref));
    }
    // console.log(spine);

    for (let index = 0; index < spine.children.length; index++) {
        const itemref = spine.children[index];
        if (path.extname(itemref.getAttribute('idref')!) != '.xhtml') {
            break
        }
        rawxHtml.push({
            ifref: itemref.getAttribute('idref')
        })
    }



    ipcRenderer.send('getNav', navpath)

    const store = bookdataStore()
    store.rawxHtml = rawxHtml

    ipcRenderer.send('bookReady', filePath)
    console.log(store.$state);

}