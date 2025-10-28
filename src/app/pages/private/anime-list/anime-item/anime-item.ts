import { Component, inject, input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Anime } from '../../../../models/anime.model';
import { Highlight } from '../../../../shared/directives/highlight';
import { CommonModule } from '@angular/common';
import { TruncatePipe } from '../../../../shared/pipes/truncate-pipe';
import { Router } from '@angular/router';
/* import { TestComponent } from "../../../../shared/test-component/test-component"; */


@Component({
  selector: 'app-anime-item',
  imports: [CardModule, ButtonModule, Highlight, CommonModule, TruncatePipe],
  templateUrl: './anime-item.html',
  styleUrl: './anime-item.css'
})
export class AnimeItem {

  anime = input.required<Anime>(); 

  private readonly router = inject(Router); 


  showDetails() {
    this.router.navigate(['private', 'home', this.anime().id]); 
  }
  

}
