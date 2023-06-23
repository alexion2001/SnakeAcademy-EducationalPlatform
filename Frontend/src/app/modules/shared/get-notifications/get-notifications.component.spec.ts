import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetNotificationsComponent } from './get-notifications.component';

describe('GetNotificationsComponent', () => {
  let component: GetNotificationsComponent;
  let fixture: ComponentFixture<GetNotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetNotificationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
