type EventMap = Map<keyof WindowEventMap, () => void>;


export class iframeUtils {
    window: Window
    events: EventMap
    constructor(x: Window) {
        this.window = x;
        this.init()
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
    }

}