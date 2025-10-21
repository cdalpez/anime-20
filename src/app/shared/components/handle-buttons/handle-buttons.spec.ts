import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandleButtons } from './handle-buttons';

describe('HandleButtons', () => {
  let component: HandleButtons;
  let fixture: ComponentFixture<HandleButtons>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HandleButtons]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HandleButtons);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
