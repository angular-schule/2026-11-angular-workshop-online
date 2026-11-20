import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookCard } from './book-card';
import { inputBinding, outputBinding } from '@angular/core';

describe('BookCard', () => {
  let component: BookCard;
  let fixture: ComponentFixture<BookCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookCard],
    }).compileComponents();

    fixture = TestBed.createComponent(BookCard, {
      bindings: [
        inputBinding('book', () => ({
          isbn: '123',
          title: 'Titel',
          description: '',
          rating: 4,
          price: 33,
          authors: []
        })),
        // outputBinding('rateUp', (b: Book) => emittedBook = b)
      ]
    });
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
