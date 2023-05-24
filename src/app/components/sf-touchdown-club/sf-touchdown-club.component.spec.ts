import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SfTouchdownClubComponent } from './sf-touchdown-club.component';

describe('SfTouchdownClubComponent', () => {
  let component: SfTouchdownClubComponent;
  let fixture: ComponentFixture<SfTouchdownClubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SfTouchdownClubComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SfTouchdownClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
