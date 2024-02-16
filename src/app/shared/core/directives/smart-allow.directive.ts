import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appSmartAllow]',
})
export class SmartAllowDirective {
  @Input() allowedPattern: string;

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onKeyPress(event) {
   
    if (this.allowedPattern && this.allowedPattern.length > 0) {
      const initialValue = this.el.nativeElement.value;
      // validate pattern
      const regexPattern = new RegExp(this.allowedPattern, 'g');
      this.el.nativeElement.value = initialValue.replace(
        regexPattern,
        ''
      );
    //  console.log("input ", this.el.nativeElement.value,  "pattern " , this.pattern, "p" , regexPattern);
      if (initialValue !== this.el.nativeElement.value) {
        event.stopPropagation();
      }
    }

    //return true;
    // validate max length

  }
}
