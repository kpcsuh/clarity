export class User {

    constructor(public userName?: string, public password?: string) {

    }


    public getUserName() {
        return this.userName;
    }

    public setUserName(uname: string) {
        return this.userName = uname;
    }

    public getPassword() {
        return this.password;
    }

    public setPassword(pw: string) {
        this.password = pw;
    }
}
