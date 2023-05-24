import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SfStandingsComponent } from './sf-standings.component';

describe('SfStandingsComponent', () => {
  let component: SfStandingsComponent;
  let fixture: ComponentFixture<SfStandingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SfStandingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SfStandingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
