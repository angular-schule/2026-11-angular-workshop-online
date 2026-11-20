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
  #bookStore = inject(BookStore);
  #bookRatingHelper = inject(BookRatingHelper);

  protected readonly books = this.#bookStore.getAllResource();

  doRateUp(book: Book) {
    const ratedBook = this.#bookRatingHelper.rateUp(book);
    this.#updateList(ratedBook);
  }
  
  doRateDown(book: Book) {
    const ratedBook = this.#bookRatingHelper.rateDown(book);
    this.#updateList(ratedBook);
  }

  doDelete(book: Book) {
    this.#bookStore.delete(book.isbn).subscribe(() => {
      this.books.reload();
      // ODER: lokal aktualisieren
      // this.books.value.update(books => books.filter(b => b.isbn !== book.isbn));
    });
  }

  #updateList(ratedBook: Book) {
    this.books.value.update(currentList => {
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