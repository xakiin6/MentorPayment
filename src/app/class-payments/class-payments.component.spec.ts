import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassPaymentsComponent } from './class-payments.component';

describe('ClassPaymentsComponent', () => {
  let component: ClassPaymentsComponent;
  let fixture: ComponentFixture<ClassPaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassPaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
