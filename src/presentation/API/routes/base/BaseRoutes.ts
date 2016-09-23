import * as Hapi from "hapi";


export class BaseRoutes {
    protected _server: Hapi.Server;

    constructor(server: Hapi.Server) {
        this._server = server;
    }    

    
}