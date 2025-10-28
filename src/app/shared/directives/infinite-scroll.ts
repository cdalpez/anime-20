import { Directive, ElementRef, inject, input, output, OnInit, OnDestroy } from '@angular/core';
import { debounceTime, fromEvent, Subscription } from 'rxjs';

@Directive({
  selector: '[infiniteScroll]'
})
export class InfiniteScrollDirective implements OnInit, OnDestroy {
 
  // Inputs
  infiniteScrollDistance = input<number>(200);
  infiniteScrollDisable = input<boolean>(false);
  scrollWindow = input<boolean>(false);

  // Outputs
  scrolled = output<void>(); 

  private elementRef = inject(ElementRef); 

  // Disiscrizione alternativa a takeUntil()
  private scrollSubscription$?: Subscription; 


  ngOnInit(): void {
    
    const scrollTarget = this.scrollWindow() ? window : this.elementRef.nativeElement; 

    this.scrollSubscription$ = fromEvent(scrollTarget, 'scroll').pipe(
      debounceTime(200),
    ).subscribe(() => {
      this.onScroll(); 
    }); 
  }

  ngOnDestroy(): void {
    this.scrollSubscription$?.unsubscribe(); 
  }

  private onScroll() {
    if (this.infiniteScrollDisable()) return;

    let scrollPosition: number; 
    let scrollHeight: number; 

    if (this.scrollWindow()) {
      scrollPosition = window.scrollY + window.innerHeight;   // Posizione corrente finestra in verticale + altezza iniziale finestra
      scrollHeight = document.documentElement.scrollHeight;   // Altezza totale del documento
    
    } else {
      const scrollTarget = this.elementRef.nativeElement; 
      scrollPosition = scrollTarget.scrollTop + scrollTarget.clientHeight;  
      scrollHeight = scrollTarget.scrollHeight;

    }

    // scrollHeight: altezza max della finestra
    // scrollPosition: posizione in cui mi trovo
    // Se scrollo fino in fondo, emette this.scrolled
    const isEnabledToScrollForDistance = scrollHeight - scrollPosition <= this.infiniteScrollDistance();
    
    if (isEnabledToScrollForDistance) this.scrolled.emit(); 
  }

}
