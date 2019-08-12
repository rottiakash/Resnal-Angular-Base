import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FCDtableComponent } from './fcdtable.component';

describe('FCDtableComponent', () => {
  let component: FCDtableComponent;
  let fixture: ComponentFixture<FCDtableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FCDtableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FCDtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
