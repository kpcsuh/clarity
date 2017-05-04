export class ExamineeAssessment {
    examineeId: string;
    formId: string;
    accountId: string;
    modality: string;
    adminstrationDate: Date;
    raterFirstName: string;
    raterLastName: string;
    raterEmail: string;
    status: string;
    subtests: string[];

    constructor(examineeId?, formId?: string, modality?: string, adminstrationDate?: Date, accountId?: string, status?: string,
                raterFirstName?: string, raterLastName?: string, raterEmail?: string, subtests?: string[]) {
        this.examineeId = examineeId;
        this.formId = formId;
        this.modality = modality;
        this.adminstrationDate = adminstrationDate;
        this.accountId = accountId;
        this.raterFirstName = raterFirstName;
        this.raterLastName = raterLastName;
        this.raterEmail = raterEmail;
        this.status = status;
        this.subtests = subtests;
    }
}
