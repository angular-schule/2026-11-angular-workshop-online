import { Component, signal } from '@angular/core';
import { Book } from '../shared/book';
import { BookCard } from '../book-card/book-card';

@Component({
  imports: [BookCard],
  selector: 'app-dashboard-page',
  styleUrl: './dashboard-page.scss',
  templateUrl: './dashboard-page.html',
})
export class DashboardPage {
  protected readonly books = signal<Book[]>([]);

  constructor() {
    this.books.set([
      {
        isbn: '123',
        title: 'Angular',
        description: 'Grundlagen und mehr',
        rating: 5,
        authors: ['FM', 'DK', 'JH']
      },
      {
        isbn: '456',
        title: 'Vue.js',
        description: 'Das grüne Framework',
        rating: 3,
        authors: ['JS']
      },
      {
        isbn: '789',
        title: 'React',
        description: 'Die Bibliothek von Meta',
        rating: 4,
        authors: ['MM', 'AB']
      },
      {
        isbn: '321',
        title: 'TypeScript',
        description: 'JavaScript mit Typen',
        rating: 5,
        authors: ['AH']
      },
      {
        isbn: '654',
        title: 'RxJS',
        description: 'Reaktive Programmierung mit Observables',
        rating: 2,
        authors: ['BL', 'NJ']
      }
    ]);
  }
}