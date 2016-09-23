import * as Hapi from 'hapi';
export interface ILoginController {
    getToken(request: Hapi.Request, reply: Hapi.IReply): Hapi.Response;
}