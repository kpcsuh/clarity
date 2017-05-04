import { Injectable } from "@angular/core";
import { CoreStorage } from "./core-storage.service";

@Injectable()
export class CoreLocalStorageService extends CoreStorage {

    constructor() {
        super(localStorage);
    }
}
