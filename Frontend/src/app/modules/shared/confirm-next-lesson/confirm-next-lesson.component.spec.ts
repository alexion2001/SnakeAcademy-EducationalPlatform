import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmNextLessonComponent } from './confirm-next-lesson.component';

describe('ConfirmNextLessonComponent', () => {
  let component: ConfirmNextLessonComponent;
  let fixture: ComponentFixture<ConfirmNextLessonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmNextLessonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmNextLessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
