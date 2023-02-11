import fs from 'fs'
import path from 'path'
import { ipcMain } from 'electron';
import { win } from '../main';
function walkSync(currentDirPath: string, callback: (...args: any[]) => void) {
    fs.readdirSync(currentDirPath, { withFileTypes: true }).forEach(function (dirent) {
        var filePath = path.join(currentDirPath, dirent.name);
        if (dirent.isFile()) {
            callback(filePath, dirent);
        } else if (dirent.isDirectory()) {
            walkSync(filePath, callback);
        }
    });
}


export const epubAnalyze = (p: string) => {

    walkSync(p, function (filePath, stat) {
        win.webContents.send('dirmap', filePath)
        if (path.extname(filePath) == '.opf') {


            const fileData = fs.readFileSync(filePath).toString()

            win.webContents.send('opfData', fileData, filePath)
        } else {
            if (['.webp', '.png', '.jpg', '.jpeg'].includes(path.extname(filePath))) {
                if (path.basename(filePath).indexOf('cover') != -1) {
                    win.webContents.send('cover', filePath)
                }
            }

        }
    });

}