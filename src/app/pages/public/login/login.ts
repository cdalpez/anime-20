import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-login',
  imports: [ButtonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  private readonly routerService = inject(Router); 

  onRegister() {
    this.routerService.navigate(['public', 'register']); 
  }

}
