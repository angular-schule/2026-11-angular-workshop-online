import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('Book Rating');
}


/* TODO
- Root-URL: Startseite oder Weiterleitung zu "books"
- Fehlerseite für unbekannte Routen
- Links setzen
  - von BookCard zur Detailseite
  - von Detailseite zum Dashboard
- Detailseite
*/