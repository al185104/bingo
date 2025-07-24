import { Component, HostListener, OnDestroy } from '@angular/core';
import { CalledNumber } from './called-number/called-number';
import { CommonModule } from '@angular/common';
import { WinningPattern } from './winning-pattern/winning-pattern';
import { ListOfNumbers } from './list-of-numbers/list-of-numbers';
import { winningPattern } from './winning-pattern/winning-pattern.model';
import { GameHistoryService, BingoGameRecord } from '../services/game-history';

@Component({
  selector: 'app-home',
  imports: [CommonModule, WinningPattern, CalledNumber, ListOfNumbers],
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.scss'
})

export class Home implements OnDestroy {
  // For demo, hardcoded, but later will use signals for state management
  currentPattern = { name: 'Straight Line', imgUrl: '/assets/patterns/line.png' };
  calledNumber: number | null = null;
  currentLetter: string = '';

  // Game state for saving
  saveSuccess = false;
  private gameStart: Date = new Date();
  public selectedNumbers: { number: number; letter: string }[] = [];
  private lastCalled: { number: number; letter: string } | null = null;
  private gameInProgress = false;

  constructor(private historyService: GameHistoryService) {
    this.resetGame();
  }  

  ngOnDestroy(): void {
    if (this.gameInProgress && this.selectedNumbers.length > 0) {
      // This will show the default browser confirm dialog.
      const save = confirm('Do you want to save the current game?');
      if (save) {
        this.completeGame();
        alert('Game saved!');
      }
    }
  }

  get hasSelectedNumbers(): boolean {
    return this.selectedNumbers.length > 0;
  }

  resetGame() {
    this.gameStart = new Date();
    this.selectedNumbers = [];
    this.lastCalled = null;
    // Optionally, reset currentPattern/calledNumber/currentLetter here if needed
  }

  onPatternChange(pattern: winningPattern) {
    this.currentPattern = pattern;
  }

  onNumberSelected(selected: {number: number | null, letter: string}) {
    this.calledNumber = selected.number;
    this.currentLetter = selected.letter;

    if (selected.number === null) return; // Ignore null selections
    this.selectedNumbers.push({ number: selected.number, letter: selected.letter });
    this.lastCalled = { number: selected.number, letter: selected.letter };    
    this.gameInProgress = true;
  }

  completeGame() {
    const completionDate = new Date();
    const record: BingoGameRecord = {
      pattern: this.currentPattern,
      selectedNumbers: [...this.selectedNumbers],
      startDate: this.gameStart.toISOString(),
      completionDate: completionDate.toISOString(),
      lastCalledNumber: this.lastCalled
    };
    this.historyService.addGame(record);
    this.resetGame(); // Optionally reset for a new game
      this.saveSuccess = true;
  setTimeout(() => this.saveSuccess = false, 2000);
  }  

    // 1. Prompt user on browser/tab refresh/close
  @HostListener('window:beforeunload', ['$event'])
  handleBeforeUnload(event: BeforeUnloadEvent) {
    if (this.gameInProgress && this.selectedNumbers.length > 0) {
      event.preventDefault();
      event.returnValue = 'Do you want to save the current game?';
      return event.returnValue;
    }
    return;
  }
}
