import { createHash } from 'crypto'
import { createReadStream } from 'fs';
import { ipcMain } from 'electron';
import { win } from '../main/index';

export const computeMd5 = (p: string) => {
    const stream = createReadStream(p);
    const hash = createHash('md5');
    stream.on('data', chunk => {
        hash.update(<any>chunk, 'utf8');
    });
    stream.on('end', () => {
        const md5 = hash.digest('hex');
        win.webContents.send('md5', md5)
    });
}