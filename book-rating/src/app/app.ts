import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { interval, Observable, Observer, of, Subscriber, timer } from 'rxjs';

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

  constructor() {

    // of('Leipzig', 'München', 'Hamburg')
    // interval(1000)       // ---0---1---2---3---4 ...
    // timer(3000)          // ---------0|
    // timer(3000, 1000)    // ---------0---1---2---3---4 ...
    // timer(0, 1000)       // 0---1---2---3---4 ...
    
    timer(3000, 1000).subscribe({
      next: e => console.log(e),
      complete: () => console.log('COMPLETE')
    });

    /////////////////////////////////////////

    // Producer: verrichtet Arbeit und spielt Daten an den Subscriber aus
    function producer(sub: Subscriber<number>) {
      const result = Math.random();
      sub.next(result);
      sub.next(100);
      sub.next(200);

      setTimeout(() => sub.next(1111), 2000);
      setTimeout(() => sub.complete(), 4000);
    }

    // Observer: hört von außen zu
    const obs: Observer<number> = {
      next: (e: number) => console.log(e),
      error: (err: any) => console.error(err),
      complete: () => console.log('FERTIG')
    };

    // Observable: Schnittstelle zwischen Producer und Observer
    // Finnische Notation $ 🇫🇮
    const myObs$ = new Observable(producer);
    // myObs$.subscribe(obs);
    

    const myObs2$ = new Observable<string>(sub => {
      sub.next('Hallo')
      sub.next('Welt')
      sub.complete();
    })

    // producer(obs);
  }
}