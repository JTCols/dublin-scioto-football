import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SfLinksComponent } from './sf-links.component';

describe('SfLinksComponent', () => {
  let component: SfLinksComponent;
  let fixture: ComponentFixture<SfLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SfLinksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SfLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
