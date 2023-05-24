import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SfHistoryComponent } from './sf-history.component';

describe('SfHistoryComponent', () => {
  let component: SfHistoryComponent;
  let fixture: ComponentFixture<SfHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SfHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SfHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
