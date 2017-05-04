import { Component, OnInit, EventEmitter, Input } from "@angular/core";
import { Router } from "@angular/router";
import "rxjs/add/observable/of";
import { Observable } from "rxjs/Rx";
import { Examinee } from "./examinee";
import { ExamineeService } from "./examinee.service";


// interface State {
// page?: {
//     from?: number;
//     to?: number;
//     size?: number;
// }
// sort?: {
//     by: string | Comparator<any>
//     reverse: boolean;
// };
// filters?: ({property: string, value: string} | Filter<any>)[];
// }

@Component({
    selector: 'examinee',
    templateUrl: './examinee.component.html',
    styleUrls: ['./examinee.component.scss']
})
export class ExamineeComponent implements OnInit {
    title: string = "Examinee Management"
    @Input() examinees: Observable<Examinee[]>;
    examineesBackup: Observable<Examinee[]>;

    total: number = 10;;
    loading: boolean = true;

    searchResult: Observable<Array<Examinee>>;
    word: string = "";


    actionResponse: string = '';


    constructor(private examineeService: ExamineeService, private router: Router) {
    }


    ngOnInit() {
        this.fetchExamineeList();
    }

    fetchExamineeList() {
        this.examineeService.list().subscribe(resp => {
            if (!!resp) {
                let e: Examinee[] = resp;
                this.loading = false;
                this.total = e.length;
                this.examinees = Observable.of(e);
            } else {
              this.loading = false;
              this.total = 0;
              this.examinees = Observable.of([]);
            }
        });
    }

    selectedExaminee(examineeLocal: Examinee) {
        this.examineeService.setCurrentExaminee(examineeLocal);

        this.router.navigate(['/examinee-assessment'], {skipLocationChange: true});
    }

    newExaminee() {
      this.router.navigate(['/examinee/new'], {skipLocationChange: true});
    }



    delete(id: string) {
        this.examineeService.delete(id).subscribe(response => {
            this.actionResponse = 'Examinee deletion successful';
            //this.refresh(null);
        }, error => {
            this.actionResponse = 'Examinee deletion failed';
        });
    }

    navigateToAssessments(examineeId: string) {
      this.router.navigate(['/examinee-assessment', examineeId]);
    }


    searchExaminees() {

        if (!this.word) {
            this.restoreOriginalExaineesIfNeeded();
            return;
        }
        this.copyOriginalExaineesIfNeeded();
        this.examineeService.search(this.word).debounceTime(4000).subscribe(resp => {
            if (!!resp) {
                let e: Examinee[] = resp;
                this.examinees = Observable.of(e);
            } else {
                this.examinees = Observable.of([]);
            }
        });
    }

    copyOriginalExaineesIfNeeded() {
        if (!this.examineesBackup) {
            this.examineesBackup = this.examinees;
        }
    }

    restoreOriginalExaineesIfNeeded() {
        if (!!this.examineesBackup) {
            this.examinees = this.examineesBackup;
            this.examineesBackup = null;
        }
    }

    resetChildren() {

    }

    fetchChildren() {

    }
  //
  //   refresh(state: State) {
  //     this.loading = true;
  //     this.fetchExamineeList();
  // }
}
