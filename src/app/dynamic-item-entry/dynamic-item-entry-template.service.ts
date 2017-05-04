import {Injectable} from '@angular/core';



@Injectable()
export class DynamicItemEntryTemplateService {
    constructor() {

    }


    createTemplate(obj:any):string {
        let template:string = "<h1> Item Entry </h1><div class='container'>"
        Object.keys(obj).forEach(key => {
            template += `<div class="form-group col-md-2"> <label for = "${key}"> ${key} </label> <input  id='${key}' name='${key}' value = '${obj[key]}'> </div>`;
        });

        return template;
        }
}