import * as Hapi from 'hapi';
import *  as  path from 'path'; 
export class ProductController {
    home = (request: Hapi.Request, reply: Hapi.IReply): Hapi.Response => {

        // return reply.file(path.join(__dirname, "../../content/index.html"));
        return reply(true);
    }
    generateToken = (request: Hapi.Request, reply: Hapi.IReply): Hapi.Response => {

        return reply(true);
    }

    updateProducts = (request: Hapi.Request, reply: Hapi.IReply): Hapi.Response => {

        return reply(true);
    }
}