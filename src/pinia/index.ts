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

            if (this.md5.length != 32) {
                console.log("MD5ERROR");
                return
            }

            eStore.set(this.md5, { ...this.$state })



            console.log(eStore.get(this.md5));


        }
    }
})