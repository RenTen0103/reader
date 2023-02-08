/**
 * iframe分页器，接受一个Window对象
 * @param w
 * @returns
 */
export default function pager(w: Window) {
    const x = w.document



    const windowsSize: number = (document.body.clientHeight) * 0.95
    let i = 0;
    let s: Element;
    while (true) {
        s = x.elementsFromPoint(w.innerWidth / 2, w.innerHeight - i).find(e => {
            return e.tagName != "BODY" && e.tagName != "HTML"
        })!
        i++
        if (s != undefined) {
            break
        }
        if (i == 1000) {
            break
        }

    }


    let pageIndex = 0

    let crh = 0

    let Npager = (node: Element) => {

        if (node == undefined) {
            return
        }

        if (getHeight(node) > windowsSize) {

            crh = 0
            if (node.children.length == 0) {
                if (node.tagName != 'STYLE' && node.tagName != 'SCRIPT') {
                    pageIndex++
                    node.classList.add("PAGE" + pageIndex)
                    node.classList.add("HASPAGED")
                    node.setAttribute("pageID", String(pageIndex))
                    marginBottompre = 0
                }
                return
            } else
                for (let index = 0; index < node.children.length; index++) {
                    const element = node.children[index];
                    Npager(element)
                }
        } else {
            if (node.tagName != 'STYLE' && node.tagName != 'SCRIPT') {
                if (crh == 0) {
                    pageIndex++
                }
                crh += getHeight(node)

                if (crh > windowsSize) {
                    pageIndex++
                    crh = getHeight(node)
                }

                node.classList.add("PAGE" + pageIndex)
                node.classList.add("HASPAGED")
                node.setAttribute("pageID", String(pageIndex))
                marginBottompre = 0
            }
        }

    }



    Npager(x.body);

    return pageIndex
}

export function getCssObj(MaxIndex: number): Array<string> {
    let cssObj: Array<string> = []

    for (let index = 0; index < MaxIndex + 1; index++) {
        let css = `.PAGE` + index + `{
        display: none;
       }\n`

        cssObj.push(css)
    }
    return cssObj.concat()
}

let marginBottompre = 0

let getHeight = (node: Element): number => {
    let computedStyle = getComputedStyle(node, null);
    /**
     * 获取margin
     */
    let marginTop = parseFloat(computedStyle.marginTop.split('px')[0])

    let margin = Math.max(marginBottompre, marginTop)
    marginBottompre = parseFloat(computedStyle.marginBottom.split('px')[0])
    return node.clientHeight + margin
}