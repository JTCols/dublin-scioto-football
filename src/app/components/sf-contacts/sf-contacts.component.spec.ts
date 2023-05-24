import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SfContactsComponent } from './sf-contacts.component';

describe('SfContactsComponent', () => {
  let component: SfContactsComponent;
  let fixture: ComponentFixture<SfContactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SfContactsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SfContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
