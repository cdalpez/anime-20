import { Component, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-register',
  imports: [ButtonModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  isLoading = signal<boolean>(false);

  onSubmitForm() {
    this.isLoading.set(true);
    setTimeout(() => {
      this.isLoading.set(false);
    }, 3000);
  }
}
