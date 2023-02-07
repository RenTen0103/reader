import { app } from "electron";
import path from 'path';
import fs from 'fs'


let homeDir = path.dirname(app.getPath('exe'))

export const fileCopy =  (p: string):string => {
    const filePath = `${homeDir}\\book\\orginal\\${path.basename(p)}`
    fs.cpSync(p, filePath, { recursive: true })

    return filePath
}