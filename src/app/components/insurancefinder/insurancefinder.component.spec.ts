import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsurancefinderComponent } from './insurancefinder.component';

describe('InsurancefinderComponent', () => {
  let component: InsurancefinderComponent;
  let fixture: ComponentFixture<InsurancefinderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsurancefinderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsurancefinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
