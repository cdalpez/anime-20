import { Component, signal } from '@angular/core';
import { Private } from './pages/private/private';


@Component({
  selector: 'app-root',
  imports: [Private],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('anime-20');
}
