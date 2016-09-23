export default class Constants {

    static DB_CONNECTION_STRING: string = "mongodb://localhost/product-store";

    static SERVER = {
        PORT: 3000,
        HOST: 'localhost'
    };

    static JWT = {
        PRIVATE_KEY_JWT: "BbZJjyoXAdr8BUZuiKKARWimKfrSmQ6fv8kZ7OFfc",
        ALGORITHM: 'HS256',
        STRATEGY: 'token',
        SCHEME: 'jwt',
        TIME_SEC: 60,
        DEFAULT_OBJECT: { teste: 123 }
    };
}
Object.seal(Constants);
