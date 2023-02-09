import { app, ipcMain } from 'electron';
import fs from 'fs';
import path from 'path';
import { win } from '../main';

const defaultCss = `.progressbar {
  width: 80%;
  height: 20px;
  background-color: #ffccff;
  position: fixed;
  left: 10%;
  bottom: 20px;
}

.innerBar {
  background-color: black;
  margin-left: 0;
  height: 100%;
}

.toc {
  width: 200px;
  height: 400px;
  background-color: beige;
  opacity: 0.7;
  border: 1px solid black;
  position: fixed;
  overflow: scroll;
}

.tocItem {
  width: 90%;
  margin-left: 5%;
  margin-top: 3px;
  border-bottom: 1px solid black;
  cursor: pointer;
}



.rate {
  position: fixed;
  right: 5px;
  bottom: 5px;
}`


let homeDir = path.dirname(app.getPath('exe'))
export const cssLoad = () => {
  fs.access(path.join(homeDir, '/config/style.css'), (e) => {
    if (e) {
      fs.mkdir(`${homeDir}/config`, err => {
        if (err) {
          console.error(err)
        }
      })
      fs.writeFile(path.join(homeDir, '/config/style.css'), defaultCss, (e) => {
        console.log(e);
      })
      win.webContents.send('cssload', defaultCss)
    } else {

      win.webContents.send('cssload', fs.readFileSync(path.join(homeDir, '/config/style.css')).toString())
    }
  })


}