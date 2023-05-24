import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SfFooterComponent } from './sf-footer.component';

describe('SfFooterComponent', () => {
  let component: SfFooterComponent;
  let fixture: ComponentFixture<SfFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SfFooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SfFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
