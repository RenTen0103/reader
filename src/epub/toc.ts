import { voidloadEpub } from ".";

export const tocAns = (xmlDoc: Document, fielPath: string) => {
    let tocRef;
    let cover;
    let type;

    const items = xmlDoc.getElementsByTagName('dc:rights')
    if (items[0].innerHTML == 'voidlord') {
        type = 'voidload'
    }


    switch (type) {
        case 'voidload':
            voidloadEpub(xmlDoc, fielPath)
            break;

        default:
            break;
    }
}