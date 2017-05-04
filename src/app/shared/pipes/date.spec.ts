import { CustomDatePipe } from "./date.pipe";


describe("Date pipe", () => {

    let customDatePipe: CustomDatePipe;

    beforeEach(() => {
        customDatePipe = new CustomDatePipe();
    })
    it("Should have instance", () => {
        expect(customDatePipe).toBeTruthy(true);
    })

    it("Should display today's  date in  default (MM/dd/yyyy)", () => {
        let localDate = new Date();
        let value = new Date().getTime();
        let args: string[] = null;
        let expectedDateString = (localDate.getMonth() + 1) + "/" + localDate.getDate() + "/" + localDate.getFullYear();
        expect(customDatePipe.transform(value, args)).toEqual(expectedDateString);
    })

    it("Should display Month in number", () => {
        let localDate = new Date();
        let value = Date.now();
        let args: string[] = ['M'];
        expect(customDatePipe.transform(value, args)).toEqual((localDate.getMonth() + 1) + "");
    })

    it("Should display just full year", () => {
        let localDate = new Date();
        let value = Date.now();
        let args: string[] = ['yyyy'];
        expect(customDatePipe.transform(value, args)).toEqual(localDate.getFullYear() + "");
    })

    it("Should display just full year", () => {
        let localDate = new Date();
        let value = Date.now();
        let args: string[] = ['dd'];
        expect(customDatePipe.transform(value, args)).toEqual(localDate.getDate() + "");
    })
})