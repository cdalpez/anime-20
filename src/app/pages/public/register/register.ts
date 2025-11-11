import { Component, computed, effect, inject, signal } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { delay, map, Observable, of, switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const formGroup = control as FormGroup;
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    if (!password || !confirmPassword) {
      return null;
    }

    return password === confirmPassword ? null : { passwordNotMatch: true };
  };
}

function usernameAvailableValidator(): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const value = control.value;
    if (!value) return of(null);
    return of(null).pipe(
      switchMap(() => of({ taken: true })),
      map((res) => (res.taken ? { usernameNotAvailable: true } : null)),
      delay(2000)
    );
  };
}

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    FormsModule,
    InputTextModule,
    FloatLabel,
    CardModule,
    ToastModule,
    PasswordModule,
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private readonly formBuilder = inject(FormBuilder);

  // usernameControl = new FormControl('', [], []);

  // formGroup = new FormGroup({
  //   username: new FormControl('', [], []),
  // });

  form = this.formBuilder.group(
    {
      username: [
        '',
        [Validators.required, Validators.minLength(3)],
        [usernameAvailableValidator()],
      ],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    },
    { validators: [passwordMatchValidator()] }
  );

  usernameCtrl = this.form.get('username') as FormControl<string | null>;
  passwordCtrl = this.form.get('password') as FormControl<string | null>;
  confirmPasswordCtrl = this.form.get('confirmPassword') as FormControl<string | null>;

  isLoading = signal<boolean>(false);

  valueChangesSignal = toSignal(this.form.valueChanges, {});
  status = toSignal(this.form.statusChanges, { initialValue: this.form.status });

  constructor() {
    effect(() => {
      console.log(this.status());
    });
  }

  usernamePending = computed(() => {
    this.status();
    if (this.usernameCtrl.pending) return 'Attendi un momento...';
    return null;
  });

  usernameError = computed(() => {
    this.valueChangesSignal();
    this.status();
    const control = this.usernameCtrl;
    if (!(control.dirty || control.touched)) return null;
    if (control.hasError('required')) return 'Username è obbligatorio';
    if (control.hasError('usernameNotAvailable'))
      return `l'username ${control.value} è già utilizzato`;
    return null;
  });

  passwordError = computed(() => {
    this.valueChangesSignal();
    const control = this.passwordCtrl;
    if (!(control.dirty || control.touched)) return null;
    if (control.hasError('required')) return 'Password è obbligatoria';
    return null;
  });

  confirmPasswordError = computed(() => {
    this.valueChangesSignal();
    const fb = this.form;
    const control = this.confirmPasswordCtrl;
    if (!(control.dirty || control.touched)) return null;
    if (control.hasError('required')) return 'Password è obbligatoria';
    if (fb.hasError('passwordNotMatch')) return 'Password non uguale';
    return null;
  });

  onSubmitForm() {
    this.form.markAllAsDirty();
  }
}
