import Jwt from '../../../infra.core/auth/jwt';
import BaseController from './base/Base';
import LoginApp from '../../../application/Login';
import LoginModel from '../../../domain/entities/DTO/LoginDto';
import * as Hapi from "hapi";
import * as Boom from "boom";

export default class Login extends BaseController {
    private _loginApp: LoginApp;
    constructor(server: Hapi.Server) {
        super(server);

        this._loginApp = new LoginApp();

    }
    login = (request: Hapi.Request, reply: Hapi.IReply): Hapi.Response => {
        const token = new Jwt().setToken(123);
        const expiration = this._loginApp.getExpirationFromJwt(token);
        const model = <LoginModel> {token : token, expiration: expiration };
        return reply(model);
    }
}