/// <reference path="../../../../typings/tsd.d.ts" />

import BaseController from './base/Base';
import * as Hapi from "hapi";
import * as Boom from "boom";

// import * as TaskModel from '../models/taskModel';
// import { ITask, ITaskRepository } from '../libs/repository/interfaces'

export default class ProductsController extends BaseController {
    // private taskRepository: ITaskRepository;

    constructor(server: Hapi.Server) {
        super(server);
        // this.taskRepository = taskRepository;
    }
    public products(request: Hapi.Request, reply: Hapi.IReply): Hapi.Response {
        const id = request.params["id"];
        if (1 === 1)
            return reply(true)
                    .header("Authorization", request.headers.authorization);;

        // else if (2 === 2)
        //     return reply(Boom.notFound());

        return reply(Boom.badImplementation(null));
    }

}