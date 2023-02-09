import { app } from 'electron';
import fs from 'fs';
import path from 'path';
import { win } from '../main';
import Store from 'electron-store'


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


export const cssLoad = () => {
  const store = new Store();
  let css = store.get('css')
  if (css) {
    win.webContents.send('cssload', css)
  } else {
    store.set('css', defaultCss)
    win.webContents.send('cssload', defaultCss)
  }
}