import { Component, inject } from '@angular/core';
import { BookStore } from '../shared/book-store';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-liked-books-page',
  styleUrl: './liked-books-page.scss',
  templateUrl: './liked-books-page.html',
})
export class LikedBooksPage {
  protected bookStore = inject(BookStore);

  reset() {
    if (confirm('Liste resetten?')) {
      this.bookStore.resetLikedBooks()
    }
  }
}
