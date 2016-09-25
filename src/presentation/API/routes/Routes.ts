import * as Hapi from "hapi";
import * as async from 'bluebird';
import AuthRoutes  from '../routes/auth/AuthRoutes';
import ProductRoutes from '../routes/products/ProductRoutes';
import BaseRoutes from './base/BaseRoutes';
import { IBaseRoute } from '../../../domain/contracts/routes/IBaseRoute';
let hapiJwt = require('hapi-auth-jwt2');

export default class Routes {
    private _server: Hapi.Server;
    private _authRoutes: AuthRoutes;
    private _productRoutes: ProductRoutes;

    constructor(server: Hapi.Server) {
        this._server = server;
        this._authRoutes = new AuthRoutes(server);
        this._productRoutes = new ProductRoutes(server);
        this.init();
    }

    init() {
        async.cast(this._server.register(hapiJwt)).then((err) => {
            [this._authRoutes, this._productRoutes]
                .map((fn: IBaseRoute) => this._server = fn.init())

        });

    }
}

