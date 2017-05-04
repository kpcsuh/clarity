export class Rater {
    firstName: string;
    lastName: string;
    email: string;

    constructor(firstNameParam?: string, lastNameParam?: string, emailParam?: string) {
        this.firstName = firstNameParam;
        this.lastName = lastNameParam;
        this.email = emailParam;
    }
}