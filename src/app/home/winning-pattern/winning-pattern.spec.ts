import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WinningPattern } from './winning-pattern';

describe('WinningPattern', () => {
  let component: WinningPattern;
  let fixture: ComponentFixture<WinningPattern>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WinningPattern]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WinningPattern);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
