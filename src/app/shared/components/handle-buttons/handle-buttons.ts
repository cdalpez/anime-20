import { Component, input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { HasPermissionDirective } from '../../directives/has-permission';
import { Anime } from '../../../models/anime.model';

@Component({
  selector: 'app-handle-buttons',
  imports: [ButtonModule, HasPermissionDirective],
  templateUrl: './handle-buttons.html',
  styleUrl: './handle-buttons.css'
})
export class HandleButtons {

  anime = input.required<Anime>(); 


  toggleFavourite() {
    this.anime().toggleFavourite(); 
  }


}
