import * as Hapi from 'hapi';
export interface IProductController {
    products(request: Hapi.Request, reply: Hapi.IReply): Hapi.Response;
}