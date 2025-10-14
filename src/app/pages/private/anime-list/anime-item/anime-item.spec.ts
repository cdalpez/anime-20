import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimeItem } from './anime-item';

describe('AnimeItem', () => {
  let component: AnimeItem;
  let fixture: ComponentFixture<AnimeItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimeItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimeItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
