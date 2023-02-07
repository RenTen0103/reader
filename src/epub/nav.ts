import path from 'path';
export const navAns = (data: string) => {
    let toc = []


    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(data, "text/xml");
    const navs = xmlDoc.getElementsByTagName('nav')
    for (let index = 0; index < navs.length; index++) {
        const nav = navs[index];

        if (nav.id == 'toc' || nav.getAttribute('epub:type') == 'toc') {
            const As = nav.getElementsByTagName('a')

            for (let i = 0; i < As.length; i++) {

                const a = As[i];


                toc.push({
                    href: a.getAttribute('href'),
                    title: a.innerText
                })
            }
        }
    }



    return toc
}