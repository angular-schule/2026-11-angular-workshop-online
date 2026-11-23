import { HttpClient, httpResource } from '@angular/common/http';
import { inject, InjectionToken, Service, Signal } from '@angular/core';
import { Book } from './book';

@Service()
export class BookStore {
    #http = inject(HttpClient);
    #apiUrl = 'https://api.angular.schule';

    getAll() {
        return this.#http.get<Book[]>(this.#apiUrl + '/books');
    }

    getAllResource() {
        return httpResource<Book[]>(
            () => this.#apiUrl + '/books',
            { defaultValue: [] }
        );
    }

    getSingleResource(isbn: () => string) {
        return httpResource<Book>(() => `${this.#apiUrl}/books/${isbn()}`);
    }

    create(book: Book) {
        return this.#http.post<Book>(this.#apiUrl + '/books', book)
    }

    search(term: string) {
        // return this.#http.get<Book[]>(this.#apiUrl + '/books/search/' + term);
        return this.#http.get<Book[]>(`${this.#apiUrl}/books/search/${term}`);
    }

    delete(isbn: string) {
        return this.#http.delete<unknown>(`${this.#apiUrl}/books/${isbn}`);
    }
}
