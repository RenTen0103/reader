import compressing from 'compressing'
import path from 'path';

export const fileUnzip = async (filePath: string):Promise<string> => {
    const bookPath = `${path.dirname(path.dirname(filePath))}//unziped/${path.basename(filePath,'.epub')}`
    
    await compressing.zip.uncompress(filePath, bookPath)

    return bookPath
}