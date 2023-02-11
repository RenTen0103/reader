import { defineStore } from "pinia";
import Store from 'electron-store';
const eStore = new Store()
export const bookdataStore = defineStore('main', {
    state: () => {
        let md5: string = ''
        let dirmap: string[] = []
        let path: string = ''
        let rawxHtml: any[] = []
        let nav: any[] = []
        let cover = ''
        let title = ''
        return {
            rawxHtml,
            nav,
            path,
            dirmap,
            md5,
            cover,
            title
        }
    },
    actions: {
        clrear() {
            this.dirmap = []
            this.path = ''
            this.rawxHtml = []
            this.nav = []
        },
        storeLocal() {

            console.log({ ...this.$state });


            eStore.set(this.md5, { ...this.$state })

            if (!eStore.has('booklist')) {
                eStore.set('booklist', [this.md5])
            } else {
                const bookList = <Array<string>>eStore.get('booklist')
                bookList.push(this.md5)
                eStore.set('booklist', bookList)
            }

            this.$reset()
        }
    }
})