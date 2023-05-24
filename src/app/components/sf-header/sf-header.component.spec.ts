import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SfHeaderComponent } from './sf-header.component';

describe('SfHeaderComponent', () => {
  let component: SfHeaderComponent;
  let fixture: ComponentFixture<SfHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SfHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SfHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
