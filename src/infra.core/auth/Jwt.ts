import * as Hapi from 'hapi';
import Constants from './../config/constants/constants';
const jwt = require('jsonwebtoken');
export default class Jwt {

    public static strategy: Object = {
        key: Constants.JWT.PRIVATE_KEY_JWT,
        validateFunc: Jwt.validateToken,
        verifyOptions: { algorithms: [Constants.JWT.ALGORITHM] }
    };


    public setToken(accountId: Object): Object {
        //REVER O MOTIVO DE NAO GUARDAR O OBJETO
        return jwt.sign(Constants.JWT.DEFAULT_OBJECT,

            Constants.JWT.PRIVATE_KEY_JWT,
            {
                algorithm: Constants.JWT.ALGORITHM,
                expiresIn: Constants.JWT.TIME_SEC // 1 minuto
            });


    }

    public static validateToken(request, decodedToken, callback) {
        console.log('decodedToken', decodedToken.teste);
        var error;
        var credentials = { 'teste': 1 };

        if (!credentials) {
            return callback(error, false, credentials);
        }

        return callback(error, true, credentials);
    };

}
