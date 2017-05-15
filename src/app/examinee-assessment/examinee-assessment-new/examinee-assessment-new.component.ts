import { Component, OnInit, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Examinee } from "../../examinee/examinee";
import { Rater } from "../rater";
import { ExamineeService } from "../../examinee/examinee.service";
import { ExamineeAssessment } from "../examinee-assessment";
import { ExamineeAssessmentService } from "../examinee-assessment.service";
import {ActivatedRoute} from '@angular/router';


@Component({
    selector: 'examinee-assessment-new',
    templateUrl: './examinee-assessment-new.component.html',
    styleUrls: ['./examinee-assessment-new.component.scss']
})
export class ExamineeAssessmentNewComponent implements OnInit {

    title: string;
    examinee: Examinee;
    assessmentsObservable: Observable<string[]>;
    assessments: string[];
    delivetyTypes: string[];
    rater: Rater;
    hideRaterInformation: boolean;
    selectedModality: string;
    deliveryClassDefault: string[];
    deliveryClassSelected: string[];
    selectedAssessmentValue: string;
    assessmentSelected: boolean;
    grades: string[];
    subtestsObservable: Observable<string[]>;
    subtests: string[];
    hideSubtest: boolean;
    examineeEmitter: EventEmitter<Examinee>;
    subtestSelectedObject: boolean[];
    selectedSubtests: Set<string> = new Set<string>();
    adminstationDate: Date;
    today: Date;
    raterFirstName: string;
    raterLastName: string;
    raterEmail: string;
    examineeId:string;


    constructor(private examineeService: ExamineeService, private examineeAssessmentService: ExamineeAssessmentService,
                private router: Router, protected activatedRoute:ActivatedRoute) {
        this.title = "Examinee Assessment";
        this.selectedModality = "MANUAL"
        this.getAssessments();
        this.delivetyTypes = ["MANUAL", "OSA", "ROSA", "ASSESS"];
        this.rater = new Rater();
        this.hideRaterInformation = true;
        this.deliveryClassDefault = ["btn", "btn-default"];
        this.deliveryClassSelected = ["btn", "btn-primary"];
        this.hideRaterInformation = true;
        this.assessmentSelected = false;
        this.grades = ["Pre-K", "K", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
        this.hideSubtest = true;

        this.activatedRoute.params.subscribe(params => {
          this.examineeId = params['examineeId'];

          this.examineeService.getExaminee(this.examineeId).subscribe(data => {
            if (!!data) {
              this.examinee = data;
            }
          });

        });

        // this.examineeService.currentExamineeSourceObservable.subscribe(e => {
        //     this.examinee = e;
        // })

        this.today = new Date();

    }


    ngOnInit() {

    }

    deliverySelected(val: string) {
        this.selectedModality = val;
        this.hideRaterInformation = !(["ROSA"].indexOf(this.selectedModality) >= 0);
        this.hideSubtest = !(["ASSESS"].indexOf(this.selectedModality) >= 0);
    }

    submit() {

    }

    selectAssessment(val: string) {
        this.selectedAssessmentValue = val;
        this.getSubTests(val);
        this.assessmentSelected = true;
    }

    hideSelection(value: string) {
        return false;
    }

    subtestSelected(value: string, index) {
        this.selectedSubtests.has(value) ? this.selectedSubtests.delete(value) : this.selectedSubtests.add(value);

        this.selectedSubtests.has(value) ? this.subtestSelectedObject[index] = true : this.subtestSelectedObject[index] = false;
    }

    createSubtestSelectionObj() {
        let i = 0;
        for (let val of this.subtests) {
            this.subtestSelectedObject[i] = false;
        }
    }

    showOrHideSubtest(val: number) {
        this.subtestSelectedObject[val] = true;
    }

    save() {
        let examineeAssessment: ExamineeAssessment = new ExamineeAssessment(
            this.examinee.id, this.selectedAssessmentValue, this.selectedModality, this.adminstationDate,
            "1234", "status", this.raterFirstName, this.raterLastName, this.raterEmail, Array.from(this.selectedSubtests));
        this.examineeAssessmentService.save(examineeAssessment).subscribe(response => {
            this.router.navigate(['/examinee-assessment', this.examineeId], {skipLocationChange: true})
        })
    }

    getSubTests(assessment: string) {
        this.examineeAssessmentService.getSubTests(assessment).subscribe(s => {
            this.subtestsObservable = Observable.of(s);
            this.subtests = s;
            this.subtestSelectedObject = [];
            this.createSubtestSelectionObj();
        })
    }

    getAssessments() {
        this.examineeAssessmentService.getAssessments().subscribe(a => {
            this.assessmentsObservable = Observable.of(a);
            this.assessments = a;
        })
    }

}
