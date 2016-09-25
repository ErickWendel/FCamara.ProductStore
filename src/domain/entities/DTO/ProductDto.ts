import Product from '../Product';
export default class ProductDto {
    constructor() {
        this.products = new Array<Product>();
    }
    public products: Array<Product>;
    public count: number;
    
}
Object.seal(ProductDto);