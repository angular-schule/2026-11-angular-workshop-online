import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RatingDisplay } from './rating-display';
import { inputBinding, signal, WritableSignal } from '@angular/core';

describe('RatingDisplay', () => {
  let component: RatingDisplay;
  let fixture: ComponentFixture<RatingDisplay>;
  let ratingValue: WritableSignal<number>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RatingDisplay],
    }).compileComponents();

    ratingValue = signal(1);

    fixture = TestBed.createComponent(RatingDisplay, {
      bindings: [
        inputBinding('value', ratingValue)
      ]
    });
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct amount of stars', async () => {
    ratingValue.set(4);
    await fixture.whenStable();
    const content = fixture.nativeElement?.querySelector('span')?.textContent;
    expect(content).toContain('⭐️⭐️⭐️⭐️');
  })
});
