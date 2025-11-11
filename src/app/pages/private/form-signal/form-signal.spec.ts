import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSignal } from './form-signal';

describe('FormSignal', () => {
  let component: FormSignal;
  let fixture: ComponentFixture<FormSignal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormSignal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormSignal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
