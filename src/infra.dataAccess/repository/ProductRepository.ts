import * as async from 'bluebird';
import "reflect-metadata";
import { injectable, inject, } from "inversify";

import { ProductSchema } from '../schemas/ProductSchema';
import DataAccess from '../DataAccess';
import Product from '../../domain/entities/Product';
import { IProductRepository } from '../../domain/contracts/repository/IProductRepository';
import Constants from '../../infra.core/config/constants/constants';
@injectable()
export class ProductRepository implements IProductRepository {
    private _db: any;
    constructor() {
        this._db = async.promisifyAll(ProductSchema.getSchema());
        
    }
    getAll(): async<Product[]> {
        return this._db.findAsync({}); 
        
    }
    remove(): async<Object> {
        return this._db.removeAsync({});
    }

    mockData(products: Product[]): async<Object> {
        
        return this.remove()
                    .then(() => this.insertMany(products));

    }
   private  insertMany(products: Product[]): async<Object> {
        return this._db.createAsync(products);
    }
    

}