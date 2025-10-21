import { Directive, HostListener, input, signal } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  host: {
    '[style.border]' : 'border()'
  }
})
export class Highlight {

  isFavourite = input<boolean>(false);
  border = signal<string>(''); 
  
  @HostListener('mouseenter')
  onMouseEnter() {
    /* this.backgroundColor.set('#ffeb3b');  */
    if (this.isFavourite()) {
      this.border.set('3px solid #c082f5')
    }
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.border.set(''); 
  }

  constructor() { }



}
