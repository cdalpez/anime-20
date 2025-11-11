import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { animeDetailResolver } from './anime-detail-resolver';

describe('animeDetailResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => animeDetailResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
