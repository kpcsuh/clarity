import { Component, OnInit } from '@angular/core';
import {Examinee} from '../../examinee/examinee';

@Component({
  selector: 'app-examinee-list',
  templateUrl: './examinee-list.component.html',
  styleUrls: ['./examinee-list.component.scss']
})
export class ExamineeListComponent implements OnInit {
  examinees:Examinee[] ;
  loading:boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
