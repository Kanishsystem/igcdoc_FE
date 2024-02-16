import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[smartPasswordVisible]'
})
export class SmartpasswordvisibleDirective {

  private _shown = false;

  constructor(private el: ElementRef) {
    this.setup();
  }
toggle(span: HTMLElement) {
    this._shown = !this._shown;
    if (this._shown) {
      this.el.nativeElement.setAttribute('type', 'text');
      span.classList.add('fa', 'fa-eye-slash')
    } else {
      this.el.nativeElement.setAttribute('type', 'password');
      span.classList.add('fa', 'fa-eye-icon')
    }
  }
setup() {
    const parent = this.el.nativeElement.parentNode;
    const span = document.createElement('span');
    span.classList.add('fa', 'fa-eye-icon')
    span.addEventListener('click', (event) => {
      this.toggle(span);
    });
    parent.appendChild(span);
  }

}
