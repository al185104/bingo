import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalledNumber } from './called-number';

describe('CalledNumber', () => {
  let component: CalledNumber;
  let fixture: ComponentFixture<CalledNumber>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalledNumber]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalledNumber);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
