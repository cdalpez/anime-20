import { JsonPipe } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Field, form, minLength, required, submit } from '@angular/forms/signals';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';

// function passwordMatchValidator<TValue extends ValueWithLengthOrSize, TPathKind extends PathKind = PathKind.Root>(path: FieldPath<TValue, TPathKind>, minLength: number | LogicFn<TValue, number | undefined, TPathKind>, config?: BaseValidatorConfig<TValue, TPathKind>): void;

// (control: AbstractControl): ValidationErrors | null  {
//     const formGroup = control as FormGroup;
//     const password = formGroup.get('password')?.value;
//     const confirmPassword = formGroup.get('confirmPassword')?.value;

//     if (!password || !confirmPassword) {
//       return null;
//     }

//     return password === confirmPassword ? null : { passwordNotMatch: true };
//   };

@Component({
  selector: 'app-form-signal',
  imports: [
    ButtonModule,
    FormsModule,
    InputTextModule,
    FloatLabel,
    CardModule,
    ToastModule,
    PasswordModule,
    Field,
    JsonPipe,
  ],
  templateUrl: './form-signal.html',
  styleUrl: './form-signal.css',
})
export class FormSignal {
  userModel = signal({
    username: '',
    password: '',
    confirmPassword: '',
  });

  userForm = form(this.userModel, (c) => {
    required(c.username, { message: 'Username is required' });
    required(c.password, { message: 'Username is required' });
    required(c.confirmPassword, { message: 'Username is required' });
  });

  confirmPasswordError = computed(() => {
    const control = this.userForm.confirmPassword();
    console.log(this.userForm().errors());
    if (!(control.dirty() || control.touched())) return null;
    // if(this.userForm())
    return null;
  });

  constructor() {
    console.log(this.userForm().value());
  }

  onSubmit() {
    console.log(this.userModel());

    submit(this.userForm, async (value) => {
      const user = this.userModel();
      console.log('submitted:', value, 'user model', user);
    });
  }
}
