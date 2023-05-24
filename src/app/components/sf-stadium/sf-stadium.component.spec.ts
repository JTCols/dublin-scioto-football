import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SfStadiumComponent } from './sf-stadium.component';

describe('SfStadiumComponent', () => {
  let component: SfStadiumComponent;
  let fixture: ComponentFixture<SfStadiumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SfStadiumComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SfStadiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
