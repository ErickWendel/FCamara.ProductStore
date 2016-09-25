import * as Hapi from "hapi";


export default class BaseRoutes {
    protected _server: Hapi.Server;

    constructor(server: Hapi.Server) {
        this._server = server;
    }      
}