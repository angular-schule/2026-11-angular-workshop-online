import { Service } from '@angular/core';
import { Book } from './book';

@Service()
export class BookRatingHelper {
    rateUp(book: Book): Book {
        // Early Exit
        if (book.rating >= 5) {
            return book;
        }

        return {
            ...book,
            rating: book.rating + 1
        }
    }

    rateDown(book: Book): Book {
        return {
            ...book,
            rating: Math.max(book.rating - 1, 1)
        }
    }
}
