import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestdoctorComponent } from './suggestdoctor.component';

describe('SuggestdoctorComponent', () => {
  let component: SuggestdoctorComponent;
  let fixture: ComponentFixture<SuggestdoctorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuggestdoctorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestdoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
