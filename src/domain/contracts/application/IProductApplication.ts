import * as async from 'bluebird'; 
import Product from '../../entities/Product';
export interface IProductApplication {
    list(): async<Product[]>;
    insertMany(): async<Object>;
}
