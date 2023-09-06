export class LoginResponse{
    email!:string
    role!:string
    jwt!:string
    constructor(email:string,role:string,jwt:string){
        this.email=email;
        this.role=role;
        this.jwt=jwt;
    }
}