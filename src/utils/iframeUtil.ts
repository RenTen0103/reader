type EventMap = Map<keyof WindowEventMap, () => void>;
import pager from "./pager";


export class iframeUtils {
    isPage:boolean
    window: Window
    events: EventMap
    isPre: boolean;
    constructor(x: Window) {
        this.isPre = false
        this.window = x;
        this.isPage = false
        // this.init()
        this.events = new Map();
    }


    private addEvenntListener<K extends keyof WindowEventMap>(type: K, cb: (...args: any[]) => void) {
        this.window.addEventListener(type, cb)
    }

    addEvent<K extends keyof WindowEventMap>(type: K, cb: (...args: any[]) => void) {
        this.events.set(type, cb)
    }

    private loadEvent() {
        this.events?.forEach((k, v) => {
            this.addEvenntListener(v, k)
        })
    }

    private hiddenSb() {
        let style = document.createElement('style');
        style.innerHTML = `body::-webkit-scrollbar {display: none; /* Chrome Safari */}`;
        this.window.document.getElementsByTagName('head').item(0)?.appendChild(style);

    }


    init() {
        this.hiddenSb()
        this.loadEvent()
        if (this.isPage) {
            this.pager()
        }

    }

    pager() {
        console.log("paged");
        
        (window as any)._pager = pager
        const a = ` 
let currentPage1 = 0

let isPaging = 0

let maxPageIndex = 0

let cssContent = []

let fontSize = 100
let body = document.body
let changePage = (np) => {
    body.appendChild(cssContent[currentPage1])
    body.removeChild(cssContent[np])
    currentPage1 = np
}


maxPageIndex = window.parent._pager(window)
for (let index = 0; index < maxPageIndex; index++) {
    let sty = document.createElement('style')
    sty.innerHTML = ".PAGE" + (index + 1) + "{display: none;}"
    cssContent.push(sty)
    body.appendChild(cssContent[index])
}   
body.removeChild(cssContent[${this.isPre ? 'maxPageIndex-1' : '0'}])
currentPage1 = ${this.isPre ? 'maxPageIndex-1' : '0'}   

window.nextPage = ()=>{
    if(cssContent[currentPage1+1]){
        changePage(currentPage1+1)
    }
}

window.prePage = ()=>{
    if(cssContent[currentPage1-1]){
        changePage(currentPage1-1)
    }
}

`


        let script = document.createElement('script')
        script.innerHTML = a
        this.window.document.getElementsByTagName('head').item(0)?.appendChild(script);
    }

}

