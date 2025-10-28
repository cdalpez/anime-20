import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedAnimeList } from './related-anime-list';

describe('RelatedAnimeList', () => {
  let component: RelatedAnimeList;
  let fixture: ComponentFixture<RelatedAnimeList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelatedAnimeList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelatedAnimeList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
