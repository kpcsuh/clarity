import { Injectable, EventEmitter } from "@angular/core";
import { Examinee } from "../examinee/examinee";


@Injectable()
export class NavigationEmitter {
    constructor() {
    }

    public showNav: EventEmitter<boolean> = new EventEmitter();
    public sessionValid: EventEmitter<boolean> = new EventEmitter();
    public userImageUrl: EventEmitter<string> = new EventEmitter();
    public examineeObj: EventEmitter<Examinee> = new EventEmitter();

}
