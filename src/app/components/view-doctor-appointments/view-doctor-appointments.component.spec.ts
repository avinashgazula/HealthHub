import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDoctorAppointmentsComponent } from './view-doctor-appointments.component';

describe('ViewDoctorAppointmentsComponent', () => {
  let component: ViewDoctorAppointmentsComponent;
  let fixture: ComponentFixture<ViewDoctorAppointmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDoctorAppointmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDoctorAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
