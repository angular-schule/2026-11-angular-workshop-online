import { Component, input } from '@angular/core';
import { Book } from '../shared/book';

@Component({
  imports: [],
  selector: 'app-book-card',
  styleUrl: './book-card.scss',
  templateUrl: './book-card.html',
})
export class BookCard {
  // Input: hier fließen Daten von der Elternkomponente hinein
  // von oben nach unten
  readonly book = input.required<Book>();
}
