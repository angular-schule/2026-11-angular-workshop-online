import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { filter, interval, map, Observable, Observer, of, share, Subject, Subscriber, timer } from 'rxjs';

import { AuthService } from './auth/auth.service';

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
    { path: '/books/liked', label: 'Merkliste' },
  ];

  protected authService = inject(AuthService);
  #router = inject(Router);

  logout() {
    this.authService.logout();
    this.#router.navigateByUrl('/auth/login');
  }

  constructor() {

    // of('Leipzig', 'München', 'Hamburg')
    // interval(1000)       // ---0---1---2---3---4 ...
    // timer(3000)          // ---------0|
    // timer(3000, 1000)    // ---------0---1---2---3---4 ...
    // timer(0, 1000)       // 0---1---2---3---4 ...
    
    // QUELLE
    const numbers$ = timer(0, 5000).pipe(
      map(e => e * 3),
      // filter(e => e % 2 === 0)
      // share()
    );

    // Subject: Verteiler
    const mySubject$ = new Subject<number>();

    // Quelle einmalig subscriben
    // numbers$.subscribe(mySubject$);


    /*mySubject$.subscribe({
      next: e => console.log('A', e),
      complete: () => console.log('COMPLETE')
    });

    setTimeout(() => {
      console.log('B subscribe');
      mySubject$.subscribe({
        next: e => console.log('B', e),
        complete: () => console.log('COMPLETE')
      });
    }, 2500)*/

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