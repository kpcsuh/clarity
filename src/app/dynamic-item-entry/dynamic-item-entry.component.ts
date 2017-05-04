import {
    Component, OnInit, ViewChild, ViewContainerRef, ComponentRef, ComponentFactory,
    AfterViewInit, OnChanges, OnDestroy, SimpleChange
} from '@angular/core';
import {DynamicItemEntryService} from './dynamic-item-entry.service'
import { IDyanmicItemEntry } from "./dynamic-item-entry-interface";
import { DynamicItemEntryTemplateService } from "./dynamic-item-entry-template.service";

@Component({
  selector: 'dynamic-item-entry',
  templateUrl: './dynamic-item-entry.component.html',
  styleUrls: ['./dynamic-item-entry.component.scss']
})
export class DynamicItemEntryComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {

  constructor(protected dynamicItemEntryService:DynamicItemEntryService, protected dynamicItemEntryTemplateService: DynamicItemEntryTemplateService) { }


  /**
   * itemEntryContainerRef is the ViewContainerRef variable
   */
  @ViewChild("itemEntryPlaceHolder", {read: ViewContainerRef})
  private itemEntryContainerRef: ViewContainerRef;

  private componentRef:ComponentRef<IDyanmicItemEntry>;

  private initialized:boolean = false;

  embedItemEntry() {
    if(this.componentRef) {
      this.componentRef.destroy();
    }

    let templateString = this.dynamicItemEntryTemplateService.createTemplate(this.getObject());
    this.dynamicItemEntryService.createItemEntryModule(templateString, "").
        then((factory:ComponentFactory<IDyanmicItemEntry>) => {
          console.log(" Factory " + factory);
          this.componentRef = this.itemEntryContainerRef.createComponent(factory);
          let component = this.componentRef.instance;
          component.ItemValuesObject = {};
    })
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.initialized = true;
    this.embedItemEntry();
  }

  ngOnChanges(changes: {[key: string]: SimpleChange}): void {
    if(this.initialized) {
      return;
    }
    this.embedItemEntry();

  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
    this.componentRef = null;
  }

  getObject() {
    return {
      "name": "Prasad",
      "Gender": "Male",
      "dob": "01/01/1998"
    }
  }

}
