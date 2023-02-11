import { bookdataStore } from "../pinia"

export const dirUtiles = () => {
    const store = bookdataStore()
    store.rawxHtml.forEach(e => {
        const idref = e.ifref
        const fulldir = store.dirmap.find((e) => {
            return e.indexOf(idref) != -1
        })
        if (fulldir == undefined) {
            console.log(idref);

        }

        e.link = fulldir?.replace(store.path, 'http://localhost:12356').replaceAll('\\', '/');

    })


}