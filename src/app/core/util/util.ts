import { CookieXSRFStrategy } from "@angular/http";

export class Util {
    public static isNonNullAndValid(value: any): boolean {
        return !!value;
    }

    public static xsrfFactory() {
        return new CookieXSRFStrategy('myCookieName', 'My-Header-Name');
    }
}

