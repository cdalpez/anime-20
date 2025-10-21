import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, chars: number = 20, showDots: boolean = true): unknown {

    if (value) {
      if (value.length > chars && showDots) {
        return `${value.substring(0, chars)}...`; 
      } else {
        return `${value.substring(0, chars)}`; 
      }
    }

    return value;
  }

}
