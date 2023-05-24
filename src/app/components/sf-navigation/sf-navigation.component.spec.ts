import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SfNavigationComponent } from './sf-navigation.component';

describe('SfNavigationComponent', () => {
  let component: SfNavigationComponent;
  let fixture: ComponentFixture<SfNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SfNavigationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SfNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
