import { Injectable } from '@angular/core';

export interface BingoGameRecord {
  pattern: { name: string; imgUrl: string };
  selectedNumbers: { number: number; letter: string }[];
  startDate: string;
  completionDate: string;
  lastCalledNumber: { number: number; letter: string } | null;
}

const STORAGE_KEY = 'bingo-game-history';

@Injectable({ providedIn: 'root' })
export class GameHistoryService {
  getGames(): BingoGameRecord[] {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    try {
      return JSON.parse(raw) as BingoGameRecord[];
    } catch {
      return [];
    }
  }

  addGame(record: BingoGameRecord): void {
    const games = this.getGames();
    games.push(record);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(games));
  }

  clearHistory(): void {
    localStorage.removeItem(STORAGE_KEY);
  }
}
