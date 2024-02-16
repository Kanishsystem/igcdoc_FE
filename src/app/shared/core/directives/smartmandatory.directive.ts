import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[smartMandatory]'
})
export class SmartmandatoryDirective {
  constructor(private el : ElementRef) { 
    this.createMandatoryIcon();
  }

  createMandatoryIcon(){
    let parent = this.el.nativeElement;
    parent.classList.add('madatory-filed')
    parent.innerHTML  = ' *'
  }

}
