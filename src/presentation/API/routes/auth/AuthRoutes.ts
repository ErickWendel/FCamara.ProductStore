import * as Hapi from "hapi";
import ProductsController from '../../controllers/ProductsController';
import LoginController from '../../controllers/LoginController';
import Jwt from '../../../../infra.core/auth/jwt';
import Constants from '../../../../infra.core/config/constants/constants';
import KernelConfig from './../../../../infra.core.ioC/config/Config';
import BaseRoutes from '../base/BaseRoutes';
import { ILoginApplication } from './../../../../domain/contracts/application/ILoginApplication';
import { IBaseRoute } from '../../../../domain/contracts/routes/IBaseRoute';
const config = require('../../../../../config');
 
export default class AuthRoutes extends BaseRoutes implements IBaseRoute {
    private _loginController: LoginController;
    constructor(server: Hapi.Server) {
        super(server);
        const kernel = KernelConfig();
        const login = kernel.get<ILoginApplication>("ILoginApplication");
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
        this._server.route(
            <Hapi.IRouteConfiguration>{
                method: config.endpoints.auth.token.type,
                path: config.endpoints.auth.token.url, 
                config: {
                    auth: false,
                    handler: this._loginController.getToken,
                    description: 'Get Token ',
                    notes: 'Returns the user token',
                    tags: ['api']
                }
            });
        return this._server;
    }
}
Object.seal(AuthRoutes);