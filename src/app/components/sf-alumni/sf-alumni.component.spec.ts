import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SfAlumniComponent } from './sf-alumni.component';

describe('SfAlumniComponent', () => {
  let component: SfAlumniComponent;
  let fixture: ComponentFixture<SfAlumniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SfAlumniComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SfAlumniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
