import { TestBed } from '@angular/core/testing';
import { BookRatingHelper } from './book-rating-helper';
import { Book } from './book';

describe('BookRatingHelper', () => {
  let service: BookRatingHelper;
  let book: Book;

  beforeEach(() => {
    // Arrange
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookRatingHelper);

    book = {
      isbn: '',
      title: '',
      description: '',
      authors: [],
      price: 44,
      rating: 3
    };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should increase the rating by one', () => {
    // Arrange
    book.rating = 3;

    // Act
    const ratedBook = service.rateUp(book);

    // Assert
    expect(ratedBook.rating).toBe(4);
  });
  
  it('should decrease the rating by one', () => {
    book.rating = 3;
    const ratedBook = service.rateDown(book);
    expect(ratedBook.rating).toBe(2);
  });
  
  it('should not rate higher than 5', () => {
    book.rating = 5;
    const ratedBook = service.rateUp(book);
    expect(ratedBook.rating).toBe(5);
  });
  
  it('should not rate lower than 1', () => {
    book.rating = 1;
    const ratedBook = service.rateDown(book);
    expect(ratedBook.rating).toBe(1);
  });
  
  it('should not mutate the original book when rating up', () => {
    book.rating = 3;
    const ratedBook = service.rateUp(book);
    expect(book.rating).toBe(3);
    expect(ratedBook).not.toBe(book);
  });

  it('should not mutate the original book when rating down', () => {
    book.rating = 3;
    const ratedBook = service.rateDown(book);
    expect(book.rating).toBe(3);
    expect(ratedBook).not.toBe(book);
  });

  it('should keep all other properties when rating up', () => {
    book.rating = 3;
    const ratedBook = service.rateUp(book);
    expect(ratedBook).toEqual({ ...book, rating: 4 });
  });

  it('should keep all other properties when rating down', () => {
    book.rating = 3;
    const ratedBook = service.rateDown(book);
    expect(ratedBook).toEqual({ ...book, rating: 2 });
  });

  it('should rate up from 1 to 2', () => {
    book.rating = 1;
    const ratedBook = service.rateUp(book);
    expect(ratedBook.rating).toBe(2);
  });

  it('should rate down from 5 to 4', () => {
    book.rating = 5;
    const ratedBook = service.rateDown(book);
    expect(ratedBook.rating).toBe(4);
  });
});
