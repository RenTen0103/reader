import { defineStore } from "pinia";
export const bookdataStore = defineStore('main', {
    state: () => {
        let dirmap:string[] = []
        let path: string = ''
        let rawxHtml: any[] = []
        let nav: any[] = []
        return {
            rawxHtml,
            nav,
            path,
            dirmap
        }
    },
})