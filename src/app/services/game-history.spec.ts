import { TestBed } from '@angular/core/testing';

import { GameHistory } from './game-history';

describe('GameHistory', () => {
  let service: GameHistory;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameHistory);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
