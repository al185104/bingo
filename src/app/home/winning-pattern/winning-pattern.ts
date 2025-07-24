import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-winning-pattern',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './winning-pattern.html',
  styleUrl: './winning-pattern.scss'
})
export class WinningPattern {
  @Input({required: true}) pattern!: { name: string; imgUrl: string };
  @Output() patternChange = new EventEmitter<any>();

  // variables
  patterns = [
    { name: 'Blackout', imgUrl: '/assets/patterns/blackout.png' },
    { name: 'Straight Line', imgUrl: '/assets/patterns/line.png' },
    { name: 'Four Corners', imgUrl: '/assets/patterns/corners.png' },
    { name: 'X Pattern', imgUrl: '/assets/patterns/x.png' },
    { name: 'Diamond', imgUrl: '/assets/patterns/diamond.png' },
    { name: 'Plus Sign', imgUrl: '/assets/patterns/plus.png' },
    { name: 'Letter C', imgUrl: '/assets/patterns/c-shape.png' },
    { name: 'Letter L', imgUrl: '/assets/patterns/l-shape.png' },
    { name: 'Letter T', imgUrl: '/assets/patterns/t-shape.png' }
    // Add more patterns as needed
  ];

  // navigating through patterns
  currentIndex = 0;

  ngOnChanges() {
    this.currentIndex = this.patterns.findIndex(
      (p) => p.name === this.pattern?.name
    );
  }

  prevPattern() {
    this.currentIndex = (this.currentIndex - 1 + this.patterns.length) % this.patterns.length;
    this.patternChange.emit(this.patterns[this.currentIndex]);
  }
  nextPattern() {
    this.currentIndex = (this.currentIndex + 1) % this.patterns.length;
    this.patternChange.emit(this.patterns[this.currentIndex]);
  }
}
