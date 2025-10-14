import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-anime-item',
  imports: [CardModule, ButtonModule],
  templateUrl: './anime-item.html',
  styleUrl: './anime-item.css'
})
export class AnimeItem {

}
