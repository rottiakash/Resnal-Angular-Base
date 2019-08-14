import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalFcdtableComponent } from './total-fcdtable.component';

describe('TotalFcdtableComponent', () => {
  let component: TotalFcdtableComponent;
  let fixture: ComponentFixture<TotalFcdtableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalFcdtableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalFcdtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
