import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SfScheduleComponent } from './sf-schedule.component';

describe('SfScheduleComponent', () => {
  let component: SfScheduleComponent;
  let fixture: ComponentFixture<SfScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SfScheduleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SfScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
