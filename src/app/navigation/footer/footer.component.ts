import { Component } from "@angular/core";

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})

export class FooterComponent {
    footerObject = [{key: "Pearson", value: "http://www.pearson.com"},
        {key: "Pearson Clinical", value: "http://www.pearsonclinical.com/"},
        {key: "Project One", value: "/"},
        {key: "About", value: "http://www.pearsonclinical.com/"},
        {key: "Help", value: "http://www.pearsonclinical.com/"},
        {key: "Shop", value: "http://www.pearsonclinical.com/"},
    ];

    constructor() {
    }
}
