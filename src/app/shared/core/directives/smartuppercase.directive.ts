import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[smartUpperCase]'
})
export class SmartuppercaseDirective {

  constructor(private el: ElementRef) {
    this.convertUpperCase()
   }

  convertUpperCase(){
    let parent  =  this.el.nativeElement;
    ['blur','input'].forEach(event =>
      parent.addEventListener(event,()=>{
          parent.value =  parent.value.toUpperCase()
      })
    )
  }

}
