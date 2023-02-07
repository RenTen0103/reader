const express = require('express')
import { Express } from 'express-serve-static-core';
let app: Express = express();
let server;
export const startServer = (p: string) => {


    if (server != null) {
        server.close()
    }

    app.use(express.static(p))
    server = app.listen(12356)
}
