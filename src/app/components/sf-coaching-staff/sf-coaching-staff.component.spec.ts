import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SfCoachingStaffComponent } from './sf-coaching-staff.component';

describe('SfCoachingStaffComponent', () => {
  let component: SfCoachingStaffComponent;
  let fixture: ComponentFixture<SfCoachingStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SfCoachingStaffComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SfCoachingStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
