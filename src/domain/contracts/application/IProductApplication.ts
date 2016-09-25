import * as async from 'bluebird'; 
import Product from '../../entities/Product';
import ProductDto from '../../entities/dto/ProductDto';
export interface IProductApplication {
    list(skip: number, limit: number): async<ProductDto>;
    insertMany(): async<Object>;
}
