import * as Hapi from 'hapi';
import * as async from 'bluebird';
    export interface IProductController {
    insertMany(request: Hapi.Request, reply: Hapi.IReply): async<Object>;
    list(request: Hapi.Request, reply: Hapi.IReply): async<Object>;

}