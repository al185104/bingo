import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfNumbers } from './list-of-numbers';

describe('ListOfNumbers', () => {
  let component: ListOfNumbers;
  let fixture: ComponentFixture<ListOfNumbers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListOfNumbers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOfNumbers);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
