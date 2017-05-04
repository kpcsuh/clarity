import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicItemEntryComponent } from './dynamic-item-entry.component';

describe('DynamicItemEntryComponent', () => {
  let component: DynamicItemEntryComponent;
  let fixture: ComponentFixture<DynamicItemEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicItemEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicItemEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
