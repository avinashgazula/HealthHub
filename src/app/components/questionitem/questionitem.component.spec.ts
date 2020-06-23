import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionitemComponent } from './questionitem.component';

describe('QuestionitemComponent', () => {
  let component: QuestionitemComponent;
  let fixture: ComponentFixture<QuestionitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
