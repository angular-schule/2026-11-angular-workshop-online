import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BookStore } from '../shared/book-store';
import { JsonPipe } from '@angular/common';

@Component({
  imports: [RouterLink, JsonPipe],
  selector: 'app-book-details-page',
  styleUrl: './book-details-page.scss',
  templateUrl: './book-details-page.html',
})
export class BookDetailsPage {
  readonly isbn = input.required<string>();
  readonly book = inject(BookStore).getSingleResource(() => this.isbn());
}