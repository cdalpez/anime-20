
export interface IUser {
    id: number;
    username: string;
    name: string; 
    surname: string; 
    email: string;
}

export interface IUserCredentials {
    username: string; 
    password: string; 
}

export class User {
    id: number;
    username: string;
    name: string; 
    surname: string; 
    email: string;

    constructor(_obj: IUser) {
        this.id = _obj.id;
        this.username = _obj.username;
        this.name = _obj.name; 
        this.surname = _obj.surname; 
        this.email = _obj.email;
    }
}
