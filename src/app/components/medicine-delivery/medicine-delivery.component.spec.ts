import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicineDeliveryComponent } from './medicine-delivery.component';

describe('MedicineDeliveryComponent', () => {
  let component: MedicineDeliveryComponent;
  let fixture: ComponentFixture<MedicineDeliveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicineDeliveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicineDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
