const express = require('express')
import { Express } from 'express-serve-static-core';

let server;
export const startServer = (p: string) => {
    let app: Express = express();


    if (server != null) {
        server.close()
    }


    // app.use((req, res, next)=>{
    //     res.header('Cache-Control','no-store')
    //     next()
    // })
    app.use(express.static(p))
    console.log(p);



    server = app.listen(12356, () => {
        console.log("服务启动");
    })
}

export const stopServer = () => {
    console.log("服务关闭");

    if (server != null) {
        server.close()
    }
}