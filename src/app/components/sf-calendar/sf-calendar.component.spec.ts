import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SfCalendarComponent } from './sf-calendar.component';

describe('SfCalendarComponent', () => {
  let component: SfCalendarComponent;
  let fixture: ComponentFixture<SfCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SfCalendarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SfCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
