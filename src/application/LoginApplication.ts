import "reflect-metadata";
import { injectable, inject, } from "inversify";
import { ILoginApplication  } from '../domain/contracts/application/ILoginApplication';

@injectable()
export default class LoginApplication implements ILoginApplication {
    
    getExpirationFromJwt(jwt: Object): number {
        const stringBuffer = jwt.toString().split('.')[1];
        const tokenObj = new Buffer(stringBuffer, 'base64').toString();
        const expiration = JSON.parse(tokenObj).exp;
        return expiration;
    }
}
Object.seal(LoginApplication);