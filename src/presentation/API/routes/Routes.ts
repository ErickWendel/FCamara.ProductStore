import * as Hapi from "hapi";
import * as Boom from "boom";
import * as Joi from "joi";
import ProductsController from '../controllers/Products';
import LoginController from '../controllers/Login';
import Jwt from '../../../infra.core/auth/jwt';
import Constants from '../../../infra.core/config/constants/constants';
let hapiJwt = require('hapi-auth-jwt2');

export default class Routes {
    private _server: Hapi.Server;
    private _productController: ProductsController;
    private _loginController: LoginController;

    constructor(server: Hapi.Server) {
        this._server = server;
        this._productController = new ProductsController(server);
        this._loginController = new LoginController(server);
        this.init();
    }

    init() {

        this._server.register(hapiJwt, (err) => {

            this._server.auth
                .strategy(
                Constants.JWT.STRATEGY,
                Constants.JWT.SCHEME,
                true,
                Jwt.strategy);


            this._server.route({
                method: 'GET',
                path: '/token',
                config: {
                    auth: false,
                    handler: this._loginController.login,

                    description: 'Get Token ',
                    notes: 'Retorna um token para o usuario',
                    tags: ['api'],
                }
            });
            this._server.route({
                method: 'GET',
                path: '/products',
                config: {
                    handler: this._productController.products,
                    description: 'Listar Produtos ',
                    notes: 'Retorna a lista de produtos',
                    tags: ['api'],
                    auth: {
                        strategies: [Constants.JWT.STRATEGY]
                    }
                },
            });


        });

    }
}

