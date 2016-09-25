import "reflect-metadata";
import * as async from 'bluebird';
import { injectable, inject, } from "inversify";
import ProductSchema from '../schemas/ProductSchema';
import DataAccess from '../DataAccess';
import Product from '../../domain/entities/Product';
import Constants from '../../infra.core/config/constants/constants';
import { IProductRepository } from '../../domain/contracts/repository/IProductRepository';

@injectable()
export default class ProductRepository implements IProductRepository {
    private _db: any;
    constructor() {
        this._db = async.promisifyAll(ProductSchema.getSchema());
        
    }
    getAll(skip: number, limit: number): async<Product[]> {
        return this._db.paginateAsync({}, { __v: 0, page: skip, limit: limit });
        
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
Object.seal(ProductRepository);