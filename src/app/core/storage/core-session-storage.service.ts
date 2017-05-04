import { Injectable } from "@angular/core";
import { CoreStorage } from "./core-storage.service";

@Injectable()
export class CoreSessionStorageService extends CoreStorage {
    constructor() {
        super(sessionStorage);
    }
}
