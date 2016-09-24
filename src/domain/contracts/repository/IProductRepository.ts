import * as async from 'bluebird'; 
import Product from '../../entities/Product';
export interface IProductRepository {
    getAll(): async<Product[]>;
    mockData(products: Product[]): async<Object>;
}