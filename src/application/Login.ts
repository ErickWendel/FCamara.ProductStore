export default class LoginApplication {

    getExpirationFromJwt(jwt: Object): any {
        const stringBuffer = jwt.toString().split('.')[1];
        const tokenObj = new Buffer(stringBuffer, 'base64').toString();
        const expiration = JSON.parse(tokenObj).exp;
        return expiration;
    }
}