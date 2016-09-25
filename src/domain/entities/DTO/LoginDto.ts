export default class LoginDto {
    public token: string;
    public expiration: number ;
}
Object.seal(LoginDto);