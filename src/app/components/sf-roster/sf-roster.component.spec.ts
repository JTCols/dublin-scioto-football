import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SfRosterComponent} from './sf-roster.component';

describe('SfRosterComponent', () => {
  let component: SfRosterComponent;
  let fixture: ComponentFixture<SfRosterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SfRosterComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SfRosterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
