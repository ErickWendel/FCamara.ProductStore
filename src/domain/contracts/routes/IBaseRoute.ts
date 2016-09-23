import * as Hapi from 'hapi';
export interface IBaseRoute {
    init(): Hapi.Server;
}