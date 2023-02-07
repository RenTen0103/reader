import { fileCopy } from "./fileCopy";
import { fileUnzip } from "./fileUnzip";
import { epubAnalyze } from "./epubAnalyze";
import path from 'path';

export const fileReader = async (p: string) => {
    const filePath = fileCopy(p)
    const bookPath = await fileUnzip(filePath);
    epubAnalyze(bookPath)
}