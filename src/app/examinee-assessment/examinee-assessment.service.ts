import { Injectable } from "@angular/core";
import { Response } from "@angular/http";
import { HttpService } from "../shared/http/http.service";
import { ExamineeService } from "../examinee/examinee.service";
import { ExamineeAssessment } from "./examinee-assessment";
import { Observable } from "rxjs/Observable";
import { environment } from "../../environments/environment";


@Injectable()
export class ExamineeAssessmentService {
    constructor(private http: HttpService, private examineeService: ExamineeService) {

    }

    getExamineeEmitter() {
        this.examineeService.getExamineeEmitter();
    }

    save(examineeAssessment: ExamineeAssessment): Observable<Response> {
        return this.http.put(this.getExamineeSaveUrl(), examineeAssessment);
    }

    getExamineeSaveUrl() {
        return environment.customerServerBaseUrl + "/customer/api/examineeAssessment";
    }


    listExamineeAssessments(id: string): Observable<any> {
        return this.http.get(this.getListUrl(id));
    }

    getListUrl(id: string) {
        return environment.customerServerBaseUrl + `/customer/api/examineeAssessment/list/${id}`;
    }

    delete(id: string) {
        return this.http.delete(this.prepareDeleteUrl(id));
    }

    private prepareDeleteUrl(id: string) {
        return environment.customerServerBaseUrl + `/customer/api/examineeAssessment/${id}`;
    }

    getSubTests(assessment: string): Observable<any> {

        return Observable.of(["subtest1", "subtest2", "subtest3", "subtest4", "subtest5", "subtest6"]);
        // return Observable.fromPromise(
        //   Promise
        //   .resolve(true)
        //   .then(() => Object.assign({}, ["subtest1", "subtest2", "subtest3", "subtest4", "subtest5", "subtest6"])));

        //return this.http.get(this.prepareSubTestsUrl(assessment));
    }


    getAssessments(): Observable<any> {
        return Observable.of(["BASC-3", "16-PF", "GFTA"]);
        //return this.http.get(this.prepareSubTestsUrl(assessment));
    }

    private prepareSubTestsUrl(assessment: string) {
        return environment.customerServerBaseUrl + `/global/api/assessment/${assessment}/subtests`;
    }


    searchExamineeAssessments(text: string) {
        return this.http.get(this.prepareSearchUrl(text));
    }

    prepareSearchUrl(text: string) {
        return environment.customerServerBaseUrl + `/customer/api/examineeAssessment/search/${text}`;
    }
}
