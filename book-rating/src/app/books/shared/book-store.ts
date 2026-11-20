import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Book } from './book';

@Service()
export class BookStore {
    #http = inject(HttpClient);
    #apiUrl = 'https://api.angular.schule';

    getAll() {
        return this.#http.get<Book[]>(this.#apiUrl + '/books');
    }

    create(book: Book) {
        return this.#http.post<Book>(this.#apiUrl + '/books', book)
    }

    search(term: string) {
        // return this.#http.get<Book[]>(this.#apiUrl + '/books/search/' + term);
        return this.#http.get<Book[]>(`${this.#apiUrl}/books/search/${term}`);
    }
}
