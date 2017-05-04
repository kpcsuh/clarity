import { Injectable, EventEmitter } from "@angular/core";
import { Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { HttpService } from "../shared/http/http.service";
import { environment } from "../../environments/environment";
import { Examinee } from "./examinee";
import { Subject } from "rxjs/Subject";

@Injectable()
export class ExamineeService {

    private baseUrl: string;
    examineeEmitter: EventEmitter<Examinee>;
    currentExamineeSource = new Subject<Examinee>();
    currentExamineeSourceObservable = this.currentExamineeSource.asObservable();
    examinee: Examinee;

    constructor(private http: HttpService) {
        this.baseUrl = environment.customerServerBaseUrl + "/customer/api/examinee/";
        this.examineeEmitter = new EventEmitter<Examinee>();
    }

    list(): Observable<any> {
        return this.http.get(this.prepareUrl("list"));
    }

    prepareUrl(suffix: string) {
        return this.baseUrl + suffix;
    }

    getExaminee(id: string):Observable<any> {
      return this.http.get(this.prepareUrl(`/${id}`));
    }
    delete(id: string): Observable<Response> {
        return this.http.delete(this.prepareUrl(`/${id}`));
    }

    getExamineeEmitter() {
        return this.examineeEmitter;
    }

    setCurrentExaminee(e: Examinee) {
        this.examinee = e;
    }

    getCurrentExaminee() {
        return this.examinee;
    }

    search(text: string): Observable<any> {
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.set('text', text);
        return this.http.get(this.prepareSearchUrl(text));
    }

    prepareSearchUrl(text: string) {
        return this.baseUrl + `search/name/${text}`;
    }

    /**
     * creates new examinee.
     * @param examinee
     * @returns {Observable<Response>}
     */
    createExaminee(examinee: Examinee): Observable<Response> {
        return this.http.put(this.prepareCreateUrl(), examinee);
    }

    prepareCreateUrl() {
        return environment.customerServerBaseUrl + "/customer/api/examinee/create";
    }

    updateExaminee(examinee: Examinee): Observable<Response> {
        return this.http.post(this.prepareUpdateUrl(), examinee);
    }

    prepareUpdateUrl() {
        return environment.customerServerBaseUrl + "/customer/api/examinee/update";
    }

}
