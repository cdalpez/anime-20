import { Component, input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Anime } from '../../../../models/anime.model';
import { Highlight } from '../../../../shared/directives/highlight';


@Component({
  selector: 'app-anime-item',
  imports: [CardModule, ButtonModule, Highlight],
  templateUrl: './anime-item.html',
  styleUrl: './anime-item.css'
})
export class AnimeItem {

  anime = input.required<Anime>(); 

}
