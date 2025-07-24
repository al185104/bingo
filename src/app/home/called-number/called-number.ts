import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-called-number',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './called-number.html',
  styleUrl: './called-number.scss',
  animations: [
    trigger('popInTrigger', [
      transition(':enter', [
        style({ transform: 'scale(0.7)', opacity: 0 }),
        animate('380ms cubic-bezier(.42,2.4,.48,.91)', style({ transform: 'scale(1)', opacity: 1 }))
      ]),
      transition('* => *', [
        style({ transform: 'scale(0.7)', opacity: 0 }),
        animate('380ms cubic-bezier(.42,2.4,.48,.91)', style({ transform: 'scale(1.15)', opacity: 1 })),
        animate('100ms', style({ transform: 'scale(1)', opacity: 1 }))
      ]),
    ]),
  ]
})
export class CalledNumber {
  @Input() letter: string = '';
  @Input() number: number | null = null;
}
