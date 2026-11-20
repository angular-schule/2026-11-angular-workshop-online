import { Component, inject, signal } from '@angular/core';
import { Book } from '../shared/book';
import { BookCard } from '../book-card/book-card';
import { BookRatingHelper } from '../shared/book-rating-helper';
import { BookStore } from '../shared/book-store';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  imports: [BookCard],
  selector: 'app-dashboard-page',
  styleUrl: './dashboard-page.scss',
  templateUrl: './dashboard-page.html',
})
export class DashboardPage {
  protected readonly books = signal<Book[]>([]);

  #bookRatingHelper = inject(BookRatingHelper);
  #bookStore = inject(BookStore);

  constructor() {
    this.#bookStore.getAll().subscribe(receivedBooks => {
      this.books.set(receivedBooks);
    });
  }

  doRateUp(book: Book) {
    const ratedBook = this.#bookRatingHelper.rateUp(book);
    this.#updateList(ratedBook);
  }
  
  doRateDown(book: Book) {
    const ratedBook = this.#bookRatingHelper.rateDown(book);
    this.#updateList(ratedBook);
  }

  #updateList(ratedBook: Book) {
    this.books.update(currentList => {
      return currentList.map(b => {
        if (b.isbn === ratedBook.isbn) {
          return ratedBook;
        } else {
          return b;
        }
      })
    })
  }
}