import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Examinee } from "../examinee";

@Component({
    selector: 'examinee-details',
    templateUrl: './examinee-details.component.html',
    styleUrls: ['./examinee-details.component.scss']
})
export class ExamineeDetailsComponent implements OnInit {
    @Input() examinee: Examinee;
    @Output() examineeEmitter: EventEmitter<Examinee>;


    constructor() {
        this.examineeEmitter = new EventEmitter<Examinee>();

    }

    ngOnInit() {
    }

    selected(examinee: Examinee) {
        this.examineeEmitter.emit(examinee);
    }

}
