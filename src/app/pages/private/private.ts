import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from '../../shared/components/navbar/navbar';


@Component({
  selector: 'app-private',
  imports: [Navbar, RouterOutlet],
  templateUrl: './private.html',
  styleUrl: './private.css'
})
export class Private {

}
