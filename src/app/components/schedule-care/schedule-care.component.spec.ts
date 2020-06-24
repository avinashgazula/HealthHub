import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleCareComponent } from './schedule-care.component';

describe('ScheduleCareComponent', () => {
  let component: ScheduleCareComponent;
  let fixture: ComponentFixture<ScheduleCareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleCareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleCareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
