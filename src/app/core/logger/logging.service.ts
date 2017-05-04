import { Injectable } from "@angular/core";

/**
 * LoggingService helps to create loging easier.
 */

@Injectable()
export class LoggingService {


    info(message?: string, data?: any): void {
        console.info(message, data);
    }

    error(message?: string, data?: any): void {
        console.error(message, data);
    }

    warn(message?: string, data?: any): void {
        console.warn(message, data);
    }

    log(message?: string, data?: any): void {
        console.log(message, data);
    }

    debug(message?: string, data?: any): void {
        console.debug(message, data);
    }

}
