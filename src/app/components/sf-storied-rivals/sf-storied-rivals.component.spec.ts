import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SfStoriedRivalsComponent } from './sf-storied-rivals.component';

describe('SfStoriedRivalsComponent', () => {
  let component: SfStoriedRivalsComponent;
  let fixture: ComponentFixture<SfStoriedRivalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SfStoriedRivalsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SfStoriedRivalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
