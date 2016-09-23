import * as Hapi from "hapi";
import * as Boom from "boom";
import * as Joi from "joi";
import { AuthRoutes } from '../routes/auth/AuthRoutes';
import { ProductRoutes } from '../routes/products/ProductRoutes';
import { BaseRoutes } from './base/BaseRoutes';
import Jwt from '../../../infra.core/auth/jwt';
import { IBaseRoute as IBaseRoute } from '../../../domain/contracts/routes/BaseRoute';
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

        this._server.register(hapiJwt, (err) => {

            [this._authRoutes, this._productRoutes]
                .map((fn: IBaseRoute) => this._server = fn.init())


            // this._server = this._productRoutes.init()
            // this._server.route({
            //     method: 'GET',
            //     path: '/token',
            //     config: {
            //         auth: false,
            //         handler: this._loginController.login,

            //         description: 'Get Token ',
            //         notes: 'Retorna um token para o usuario',
            //         tags: ['api'],
            //     }
            // });
            // this._server.route({
            //     method: 'GET',
            //     path: '/products',
            //     config: {
            //         handler: this._productController.products,
            //         description: 'Listar Produtos ',
            //         notes: 'Retorna a lista de produtos',
            //         tags: ['api'],
            //         auth: {
            //             strategies: [Constants.JWT.STRATEGY]
            //         }
            //     },
            // });


        });

    }
}

