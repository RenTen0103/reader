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
        let history: number[] = []
        return {
            rawxHtml,
            nav,
            path,
            dirmap,
            md5,
            cover,
            title,
            history
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
                if (bookList.indexOf(this.md5) == -1) {
                    bookList.push(this.md5)
                }

                eStore.set('booklist', bookList)
            }

            console.log(eStore.get(this.md5));


            // this.$reset()
        }
    }
})