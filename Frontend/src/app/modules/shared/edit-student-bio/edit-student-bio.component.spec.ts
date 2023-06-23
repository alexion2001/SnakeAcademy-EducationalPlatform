import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStudentBioComponent } from './edit-student-bio.component';

describe('EditStudentBioComponent', () => {
  let component: EditStudentBioComponent;
  let fixture: ComponentFixture<EditStudentBioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditStudentBioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditStudentBioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
