import { Component } from '@angular/core';
import { Navbar } from '../../shared/components/navbar/navbar';
import { AnimeList } from './anime-list/anime-list';


@Component({
  selector: 'app-private',
  imports: [Navbar, AnimeList],
  templateUrl: './private.html',
  styleUrl: './private.css'
})
export class Private {

}
