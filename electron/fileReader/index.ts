import { fileCopy } from "./fileCopy";
import { fileUnzip } from "./fileUnzip";
import { epubAnalyze } from "./epubAnalyze";

export const fileReader = async (p: string) => {
    // console.log(p);
    
    const filePath = fileCopy(p)
    const bookPath = await fileUnzip(filePath);
    epubAnalyze(bookPath)
}