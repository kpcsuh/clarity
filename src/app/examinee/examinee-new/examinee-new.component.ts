import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Examinee } from "../examinee";
import { ExamineeService } from "../examinee.service";
import { Gender } from "../gender";
import { Observable } from "rxjs/Observable";
@Component({
    selector: 'new-examinee',
    templateUrl: './examinee-new.component.html',
    styleUrls: ['./examinee-new.component.scss']
})

export class ExamineeNewComponent implements OnInit, OnDestroy {
    title: string = "Create Examinee"
    examinee: Examinee = new Examinee();
    genderValues: string[];
    genderType: typeof Gender;
    updateRequest: boolean = false;
    activatedRouteSub:any;
    id:string;
    opened:boolean = false;

    constructor(private examineeService: ExamineeService, private router: Router, protected activatedRoute:ActivatedRoute) {

        this.activatedRouteSub = this.activatedRoute.params.subscribe(params => {
            this.id = params['id'];
              console.log("Examonee Id:", this.id);
              if (!!this.id) {
                this.examineeService.getExaminee(this.id).subscribe(resp => {
                  if (!!resp) {
                    this.examinee = resp;
                      console.log("Examinee JSON:", JSON.stringify(resp));
                      this.updateRequest = true;
                  }
                });
              }


        });


    }


    ngOnInit() {
        this.genderValues = Object.keys(Gender);
        this.genderValues = this.genderValues.slice(this.genderValues.length / 2);
    }

    submit() {
        this.createOrUpdateExaminee().subscribe(response => {
            this.router.navigate(['/examinee']);
        })
    }

    createOrUpdateExaminee(): Observable<any> {
        if (this.updateRequest) {
            return this.examineeService.updateExaminee(this.examinee);
        } else {
            return this.examineeService.createExaminee(this.examinee);
        }
    }

    getExaminee(id:string) {
      this.examineeService.getExaminee(id).subscribe(resp => {
        if (!!resp) {
          this.examinee = resp;
        }
      });
    }

    ngOnDestroy() {
      this.activatedRouteSub.unsubscribe();
    }
}
