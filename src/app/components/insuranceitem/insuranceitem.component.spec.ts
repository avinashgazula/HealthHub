import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceitemComponent } from './insuranceitem.component';

describe('InsuranceitemComponent', () => {
  let component: InsuranceitemComponent;
  let fixture: ComponentFixture<InsuranceitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsuranceitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
