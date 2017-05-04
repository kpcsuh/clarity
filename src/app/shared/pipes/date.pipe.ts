import { Pipe, PipeTransform } from "@angular/core";
import { DatePipe } from "@angular/common";
import { environment } from "../../../environments/environment";

@Pipe({
    name: 'datepipe',
    pure: true
})

/**
 * Custom date pipe. Date is formatted based on user locale. Date formatting id 'shortDate' by default.
 */
export class CustomDatePipe implements PipeTransform {

    private datePipe: DatePipe = new DatePipe((!!environment.userLocale) ? environment.userLocale : 'en-US');

    transform(value: any, ...args: any[]): string {
        let format: string = "shortDate";
        if (!value) {
            return;
        }
        if (!!args[0]) {
            format = args[0];
        }
        return this.datePipe.transform(new Date(value), format);
    }
}
