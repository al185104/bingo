import { Component } from '@angular/core';
import { GameHistoryService, BingoGameRecord } from '../services/game-history';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-history',
  imports: [CommonModule],
  templateUrl: './history.html',
  styleUrl: './history.scss'
})
export class History {
  games: BingoGameRecord[] = [];

  constructor(private historyService: GameHistoryService) {
    this.loadGames();
  }

  loadGames() {
    this.games = this.historyService.getGames().reverse(); // show latest first
  }

  clearHistory() {
    this.historyService.clearHistory();
    this.loadGames();
  }
}