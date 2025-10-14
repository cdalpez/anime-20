import { Directive, HostListener, signal } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  host: {
    '[style.backgroundColor]' : 'backgroundColor()'
  }
})
export class Highlight {

  backgroundColor = signal<string>(''); 
  
  @HostListener('mouseenter')
  onMouseEnter() {
    this.backgroundColor.set('#ffeb3b'); 
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.backgroundColor.set(''); 
  }

  constructor() { }



}
