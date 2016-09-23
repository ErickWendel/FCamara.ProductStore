import * as Hapi from "hapi"; 
import ProductsController from '../../controllers/ProductsController';
import LoginController from '../../controllers/LoginController';
import Jwt from '../../../../infra.core/auth/jwt';
import Constants from '../../../../infra.core/config/constants/constants';
import { BaseRoutes } from '../base/BaseRoutes';
import { KernelConfig } from './../../../../infra.core.ioC/config/Config';
import { ILoginApplication } from './../../../../domain/contracts/application/ILoginApplication';
import { IBaseRoute } from '../../../../domain/contracts/routes/IBaseRoute';

export class AuthRoutes extends BaseRoutes implements IBaseRoute {
    private _loginController: LoginController;
    constructor(server: Hapi.Server) {
        super(server);
        const kernel = KernelConfig();
        const login = kernel.get<ILoginApplication>("LoginApplication");
        this._loginController = new LoginController(server, login);
    }

    
    configAuth(): Hapi.Server {
        this._server
            .auth
            .strategy(Constants.JWT.STRATEGY,
            Constants.JWT.SCHEME,
            true,
            Jwt.strategy);

        return this._server;
    }

    init(): Hapi.Server {
        this._server = this.configAuth();
        this._server.route({
            method: 'GET',
            path: '/token',
            config: {
                auth: false,
                handler: this._loginController.getToken,
                description: 'Get Token ',
                notes: 'Retorna um token para o usuario',
                tags: ['api'],
            }
        });
        return this._server;
    }
}