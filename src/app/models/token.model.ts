export interface IToken {
    accessToken: string;
    refreshToken: string; 
}

export class Token {
    accessToken: string;
    refreshToken: string; 

    constructor(_obj: IToken) {
        this.accessToken = _obj.accessToken; 
        this.refreshToken = _obj.refreshToken;
    }
}