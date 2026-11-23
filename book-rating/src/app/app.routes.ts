import { Routes } from '@angular/router';
import { booksRoutes } from './books/books.routes';
import { NotFoundPage } from './not-found-page/not-found-page';

export const routes: Routes = [
    // Grundregel: bei Weiterleitung vom leeren Pfad (fast) immer pathMatch:full nötig
    { path: '', redirectTo: 'books/dashboard', pathMatch: 'full' },
    // alle Routen aus "booksRoutes" bekommen das Präfix "books"
    {
        path: 'books',
        children: booksRoutes
    },

    // Wildcard-Route, muss immer ganz unten stehen
    { path: '**', component: NotFoundPage }
];


/*
AUFGABE:
neue Komponente BookCreatePage
unter dem Pfad /books/create
Keine Inhalte auf der Seite
Einfache Navigationsleiuste in der Komponente App
- Dashboard
- Buch erstellen

ZUSATZAUFGABE:
Die Navigation auf Basis von Daten erzeugen, nicht einzelne Links im Template
*/