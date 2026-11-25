import { Component, inject, signal } from '@angular/core';
import { Book } from '../shared/book';
import { apply, applyEach, applyWhen, disabled, form, FormField, FormRoot, hidden, max, maxLength, min, minLength, provideSignalFormsConfig, readonly, required, schema, SchemaPath, validate } from '@angular/forms/signals';
import { JsonPipe } from '@angular/common';
import { BookStore } from '../shared/book-store';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

const isbnSchema = schema<string>(path => {
  required(path, { message: 'ISBN muss angegeben werden.' });
  minLength(path, 10, { message: 'ISBN ist zu kurz.' });
  maxLength(path, 13, { message: 'ISBN ist zu lang' });
})


function valueRange(path: SchemaPath<number>, minValue: number, maxValue: number) {
  required(path, { message: 'Wert muss angegeben werden.' });
  min(path, minValue, { message: 'Wert muss innerhalb der Range liegen.' });
  max(path, maxValue, { message: 'Wert muss innerhalb der Range liegen.' });
}

const bookFormSchema = schema<Book>((path) => {
  // Schema-Komposition
  apply(path.isbn, isbnSchema);

  // Konditionale Validierung: Wende dieses Schema nur an, wenn Bedingung erfüllt ist.
  // Beschreibung wird Pflichtfeld, wenn Titel ausgefüllt ist
  applyWhen(
    path.description,
    ctx => ctx.valueOf(path.title) !== '',
    descPath => {
      // required(descPath);
      // readonly(descPath)
      // disabled(descPath)
      hidden(descPath)
    }
  );

  required(path.title, { message: 'Titel muss angegeben werden.' });
  
  /*required(path.rating, { message: 'Bewertung muss angegeben werden.' });
  min(path.rating, 1, { message: 'Bewertung muss zwischen 1 und 5 liegen.' });
  max(path.rating, 5, { message: 'Bewertung muss zwischen 1 und 5 liegen.' });*/

  valueRange(path.rating, 1, 5);
  
  required(path.price, { message: 'Preis muss angegeben werden.' });
  min(path.price, 0, { message: 'Preis darf nicht negativ sein.' });

  // Schema auf jedes Feld in path.authors anwenden
  applyEach(path.authors, (authorPath) => {
    required(authorPath);

    validate(authorPath, ctx => {
      if (ctx.value().includes(' ')) {
        return null;
      } else {
        return {
          kind: 'authorSpaces',
          message: 'Der Autorname muss min. 1 Leerzeichen haben.'
        }
      }
    });
  });
});


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
  protected readonly bookFormData = signal({
    isbn: '',
    title: '',
    description: '',
    price: 0,
    rating: 1,
    authors: ['', '', '']
  });

  // Formularmodell
  // FieldTree: Navigation im Formularbaum
  protected readonly bookForm = form(
    this.bookFormData,
    // Schema zur Validierung
    bookFormSchema,
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

  addAuthorField() {
    this.bookForm.authors().value.update(currentAuthors => [...currentAuthors, '']);
  }
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