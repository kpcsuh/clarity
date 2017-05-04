import { Component, OnInit } from "@angular/core";
import { Examinee } from "../examinee/examinee";
import { ExamineeService } from "../examinee/examinee.service";
import { ExamineeAssessmentService } from "./examinee-assessment.service";
import { ExamineeAssessment } from "./examinee-assessment";
import { Observable } from "rxjs/Observable";
import { Router, ActivatedRoute } from "@angular/router";


@Component({
    selector: 'examinee-assessment',
    templateUrl: 'examinee-assessment.component.html',
    styleUrls: ['examinee-assessment.component.scss']
})
export class ExamineeAssessmentComponent implements OnInit {

    title: string = "Examinee Assessment List";
    examinee: Examinee = new Examinee();
    examineeAssessments: Observable<ExamineeAssessment[]>;
    examineeAssessmentsBackup: Observable<ExamineeAssessment[]>;
    confirmationMessage: string;
    searchWord: string = "";
    examineeId:string;
    loading:boolean = true;


    constructor(private examineeAssessmentService: ExamineeAssessmentService, private router: Router,
       private examineeService: ExamineeService, protected activatedRoute:ActivatedRoute) {

    }

    ngOnInit() {
      this.activatedRoute.params.subscribe(params => {
        this.examineeId = params['examineeId'];
        this.examineeService.getExaminee(this.examineeId).subscribe(data => {
          if (!!data) {
            this.examinee = data;
          }
        })
        this.getExamineeAssessments();
      })



    }

    getExamineeAssessments() {

        if (!this.examineeId) {
            console.error("Examinee Id is invalid");
            return;
        }
        this.examineeAssessmentService.listExamineeAssessments(this.examineeId).subscribe(data => {
            this.processResponse(data);
            this.loading = false;
        })
    }

    newExamineeAssessment() {
        this.router.navigate(['/examinee-assessment-new', this.examineeId], {skipLocationChange: true});
    }

    deleteExamineeAssessment(id: string) {
        this.examineeAssessmentService.delete(id).subscribe(response => {
            this.getExamineeAssessments();
            this.confirmationMessage = "Examinee Assessment deleted";
            setTimeout(() => {
                this.confirmationMessage = null;
                //console.log("setTimeout called")
            }, 1000);
        })
    }

    deleteExaminee(id: string) {
        this.examineeService.delete(id).subscribe(response => {
            this.router.navigate(['/examinee']);
        })

    }

    editExaminee() {
        this.router.navigate(['/examinee/new'], {skipLocationChange: true});
    }

    searchExamineeAssessments() {

        if (!this.searchWord) {
            this.restoreOriginalExaineeAssessmentsIfNeeded();
            return;
        }
        this.copyOriginalExaineeAssessmentsIfNeeded();
        this.examineeAssessmentService.searchExamineeAssessments(this.searchWord).subscribe(resp => {
            this.processResponse(resp);
        })
    }


    processResponse(data: any) {
        if (!!data) {
            let eas: ExamineeAssessment[] = data;
            this.examineeAssessments = Observable.of(eas);
        } else {
            this.examineeAssessments = Observable.of([]);
        }
    }

    copyOriginalExaineeAssessmentsIfNeeded() {
        if (!this.examineeAssessmentsBackup) {
            this.examineeAssessmentsBackup = this.examineeAssessments
        }
    }

    restoreOriginalExaineeAssessmentsIfNeeded() {
        if (!!this.examineeAssessmentsBackup) {
            this.examineeAssessments = this.examineeAssessmentsBackup;
            this.examineeAssessmentsBackup = null;
        }
    }
}
