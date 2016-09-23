export interface ILoginApplication {
    getExpirationFromJwt(jwt: Object): number;
}