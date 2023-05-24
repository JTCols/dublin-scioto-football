import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SfIrishNflComponent } from './sf-irish-nfl.component';

describe('SfIrishNflComponent', () => {
  let component: SfIrishNflComponent;
  let fixture: ComponentFixture<SfIrishNflComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SfIrishNflComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SfIrishNflComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
