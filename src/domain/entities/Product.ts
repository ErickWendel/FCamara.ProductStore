export default class Product {
    public id: number;
    public name: string;
    public description: string;
    public price: number;
    
}
Object.seal(Product);