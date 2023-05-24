import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SfRecordsComponent } from './sf-records.component';

describe('SfRecordsComponent', () => {
  let component: SfRecordsComponent;
  let fixture: ComponentFixture<SfRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SfRecordsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SfRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
