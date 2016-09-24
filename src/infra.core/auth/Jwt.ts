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
        return jwt.sign(Constants.JWT.DEFAULT_OBJECT,

            Constants.JWT.PRIVATE_KEY_JWT,
            {
                algorithm: Constants.JWT.ALGORITHM,
                expiresIn: Constants.JWT.TIME_SEC // 1 minuto
            });


    }

    public static validateToken(request, decodedToken, callback) {
        var error;
        var credentials = { 'fakeUser': 'erickwendel' };
        return callback(error, false, credentials);

    };

}
