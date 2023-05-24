import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SfHomePageComponent } from './sf-home-page.component';

describe('SfHomePageComponent', () => {
  let component: SfHomePageComponent;
  let fixture: ComponentFixture<SfHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SfHomePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SfHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
