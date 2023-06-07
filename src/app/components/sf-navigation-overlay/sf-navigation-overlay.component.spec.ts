import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SfNavigationOverlayComponent } from './sf-navigation-overlay.component';

describe('SfNavigationOverlayComponent', () => {
  let component: SfNavigationOverlayComponent;
  let fixture: ComponentFixture<SfNavigationOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SfNavigationOverlayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SfNavigationOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
