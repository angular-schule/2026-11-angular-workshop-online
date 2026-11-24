import { Component, inject, signal } from '@angular/core';
import { Book } from '../shared/book';
import { form, FormField, FormRoot, max, maxLength, min, minLength, provideSignalFormsConfig, required } from '@angular/forms/signals';
import { JsonPipe } from '@angular/common';
import { BookStore } from '../shared/book-store';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

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

  #bookStore = inject(BookStore);
  #router = inject(Router);

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
    // Schema zur Validierung
    (path) => {
      required(path.isbn, { message: 'ISBN muss angegeben werden.' });
      minLength(path.isbn, 10, { message: 'ISBN ist zu kurz.' })
      maxLength(path.isbn, 13, { message: 'ISBN ist zu lang' })
      required(path.title, { message: 'Titel muss angegeben werden.' });
      
      required(path.rating, { message: 'Bewertung muss angegeben werden.' });
      min(path.rating, 1, { message: 'Bewertung muss zwischen 1 und 5 liegen.' });
      max(path.rating, 5, { message: 'Bewertung muss zwischen 1 und 5 liegen.' });
      
      required(path.price, { message: 'Preis muss angegeben werden.' });
      min(path.price, 0, { message: 'Preis darf nicht negativ sein.' });
    },
    {
      submission: {
        // solange die Submission Action läuft, ist das Formular im Zustand "submitting"
        action: async (f) => {
          const newBook = f().value();
          try {
            const receivedBook = await firstValueFrom(this.#bookStore.create(newBook));
            // this.#router.navigateByUrl('/books/dashboard');
            await this.#router.navigate(['/books', 'details', receivedBook.isbn]);
          } catch (e: unknown) {
            if (e instanceof HttpErrorResponse) {
              // Fehler auf Basis der Serverantwort erzeugen
              // TODO …
              return [
                {
                  kind: 'isbnUnknownError',
                  message: 'Die ISBN hat einen unbekannten Fehler: ' + e.error.error,
                  fieldTree: f.isbn
                }
              ];
            }
          }
          return;
        }
      }
    }
  );
}


/*
- Abschicken-Aktion verdrahten
- Standardaktion unterbinden (nicht neuladen)
- Browservaldierung abschalten
- prüfen, ob Formular gültig ist
  - wenn nicht, alle Felder als touched markieren


- Daten auslesen aus dem Formular
- Buch per HTTP-Request zum Server schicken (BookStore.create())
- bei Erfolg: wegnavigieren, z. B. zu Dashboard oder Detailseite
- bei Nicht-Erfolg: Fehler im Formular anzeigen
*/