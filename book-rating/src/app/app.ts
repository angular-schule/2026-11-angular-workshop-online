import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterOutlet, RouterLink],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('Book Rating');

  protected readonly navItems = [
    { path: '/books/dashboard', label: 'Dashboard' },
    { path: '/books/create', label: 'Buch erstellen' },
  ];
}