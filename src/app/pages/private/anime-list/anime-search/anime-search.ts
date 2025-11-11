import { Component, effect, output, signal, WritableSignal } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-anime-search',
  imports: [InputTextModule, FloatLabel, FormsModule],
  templateUrl: './anime-search.html',
  styleUrl: './anime-search.css',
})
export class AnimeSearch {
  searchQuery: WritableSignal<string> = signal<string>('');
  searchQueryEvent = output<string>();

  constructor() {
    // Effect: per qualsiasi signal implementato, l'effect lo farà scattare.
    effect(() => {
      // console.log(this.searchQuery());
    });
  }
}
