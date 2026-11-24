import { Component, signal } from '@angular/core';
import { Book } from '../shared/book';
import { form, FormField, FormRoot, max, maxLength, min, minLength, provideSignalFormsConfig, required } from '@angular/forms/signals';
import { JsonPipe } from '@angular/common';

@Component({
  imports: [FormField, FormRoot, JsonPipe],
  selector: 'app-book-create-page',
  styleUrl: './book-create-page.scss',
  templateUrl: './book-create-page.html',
  providers: [
    provideSignalFormsConfig({
      classes: {
        // CSS-Klasse "invalid" wird auf alle Felder (mit Direktive formField) angewendet, wenn Bedingung wahr ist
        invalid: (formField) => formField.state().invalid() && formField.state().touched()
      }
    })
  ]
})
export class BookCreatePage {
  // Datenmodell
  protected readonly bookFormData = signal<Book>({
    isbn: '',
    title: '',
    description: '',
    price: 0,
    rating: 1,
    authors: []
  });

  // Formularmodell
  // FieldTree: Navigation im Formularbaum
  protected readonly bookForm = form(
    this.bookFormData,
    (path) => {
      required(path.isbn);
      minLength(path.isbn, 10)
      maxLength(path.isbn, 13)
      required(path.title);
      
      required(path.rating);
      min(path.rating, 1);
      max(path.rating, 5);
      
      required(path.price);
      min(path.price, 0);
    }
  );
}
