import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

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
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  getGames(): BingoGameRecord[] {
    if (!this.isBrowser()) return [];
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    try {
      return JSON.parse(raw) as BingoGameRecord[];
    } catch {
      return [];
    }
  }

  addGame(record: BingoGameRecord): void {
    if (!this.isBrowser()) return;
    const games = this.getGames();
    games.push(record);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(games));
  }

  clearHistory(): void {
    if (!this.isBrowser()) return;
    localStorage.removeItem(STORAGE_KEY);
  }
}
