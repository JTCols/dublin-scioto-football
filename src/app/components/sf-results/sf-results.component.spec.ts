import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SfResultsComponent } from './sf-results.component';

describe('SfResultsComponent', () => {
  let component: SfResultsComponent;
  let fixture: ComponentFixture<SfResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SfResultsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SfResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
