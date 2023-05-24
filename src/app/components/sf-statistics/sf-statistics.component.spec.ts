import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SfStatisticsComponent } from './sf-statistics.component';

describe('SfStatisticsComponent', () => {
  let component: SfStatisticsComponent;
  let fixture: ComponentFixture<SfStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SfStatisticsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SfStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
