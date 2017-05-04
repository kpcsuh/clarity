import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Examinee} from '../examinee/examinee';
import {ExamineeService} from '../examinee/examinee.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  private examinees:Observable<Examinee[]> = new Observable<Examinee[]>();

  constructor(protected router:Router, protected examineeService: ExamineeService) {
  this.fetchExamineeList();
 }

  ngOnInit() {
  }


navigateToExamiee() {
  this.router.navigate(['/examinee']);
}

navigateToNewExaminee() {
  this.router.navigate(['examinee/new']);
}

fetchExamineeList() {
  console.log(this.examineeService.list());
    this.examineeService.list().subscribe(resp => {
        if (!!resp) {
            let e: Examinee[] = resp;
            this.examinees = Observable.of(e);
        } else {
          this.examinees = Observable.of([]);
        }
    });
}
}
