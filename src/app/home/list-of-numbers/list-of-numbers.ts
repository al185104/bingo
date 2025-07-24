import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, signal } from '@angular/core';

@Component({
  selector: 'app-list-of-numbers',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './list-of-numbers.html',
  styleUrl: './list-of-numbers.scss'
})
export class ListOfNumbers {
  @Input() calledNumber: number | null = null;
  @Output() numberSelected = new EventEmitter<{ number: number | null; letter: string }>();

  letters = ['B', 'I', 'N', 'G', 'O'];
  calledNumbers = signal<number[]>([]);

  getNumbersForLetter(i: number): number[] {
    // B: 1-15, I: 16-30, N: 31-45, G: 46-60, O: 61-75
    return Array.from({ length: 15 }, (_, k) => 1 + i * 15 + k);
  }

  selectNumber(num: number | null, letter: string) {
    const updatedNumbers = [...this.calledNumbers()];
    const idx = num !== null ? updatedNumbers.indexOf(num) : -1;

    if (idx === -1 && num !== null) {
      updatedNumbers.push(num);
      this.calledNumber = num;
    } else if (idx !== -1) {
      updatedNumbers.splice(idx, 1); // toggle

      const latestIndex = updatedNumbers.length - 1;
      if (latestIndex >= 0) {
        const lastNumber = updatedNumbers[latestIndex];
        this.calledNumber = lastNumber;
        letter = this.letters[Math.floor((lastNumber - 1) / 15)];
      } else {
        this.calledNumber = null;
        letter = '';
      }
    }

    this.calledNumbers.set(updatedNumbers);

    this.numberSelected.emit({ number: this.calledNumber, letter });
  }

  isCalled(num: number): boolean {
    return this.calledNumbers().includes(num);
  }

}
