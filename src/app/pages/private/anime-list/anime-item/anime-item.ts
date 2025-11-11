import { Component, inject, input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Anime } from '../../../../models/anime.model';
import { Highlight } from '../../../../shared/directives/highlight';
import { CommonModule } from '@angular/common';
import { TruncatePipe } from '../../../../shared/pipes/truncate-pipe';
import { EventType, Router } from '@angular/router';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { distinctUntilChanged, filter, last, tap } from 'rxjs';

/* import { TestComponent } from "../../../../shared/test-component/test-component"; */

@Component({
  selector: 'app-anime-item',
  imports: [CardModule, ButtonModule, Highlight, CommonModule, TruncatePipe, ProgressSpinnerModule],
  templateUrl: './anime-item.html',
  styleUrl: './anime-item.css',
})
export class AnimeItem {
  anime = input.required<Anime>();

  private readonly router = inject(Router);

  constructor() {
    this.router.events
      .pipe(
        tap((event) => {
          switch (event.type) {
            case EventType.NavigationError:
              this.anime().markAsLoading();
              break;
            case EventType.NavigationEnd:
              this.anime().markAsLoading();
              break;
            default:
              break;
          }
        })
      )
      .subscribe();
  }

  showDetails() {
    this.anime().markAsLoading(true);
    this.router.navigate(['private', 'home', this.anime().id]);
  }
}
