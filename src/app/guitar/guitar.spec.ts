import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Guitar } from './guitar';

describe('Guitar', () => {
  let component: Guitar;
  let fixture: ComponentFixture<Guitar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Guitar],
    }).compileComponents();

    fixture = TestBed.createComponent(Guitar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
