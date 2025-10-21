import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { HasPermissionDirective } from '../../directives/has-permission';

@Component({
  selector: 'app-handle-buttons',
  imports: [ButtonModule, HasPermissionDirective],
  templateUrl: './handle-buttons.html',
  styleUrl: './handle-buttons.css'
})
export class HandleButtons {



}
