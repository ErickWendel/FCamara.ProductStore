import * as async from 'bluebird'; 
import Product from '../../entities/Product';
export interface IProductApplication {
    list(skip: number, limit: number): async<Product[]>;
    insertMany(): async<Object>;
}
