import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[smartTableShort]'
})
export class SmarttableshortDirective {
  @Input() enablesort : string
  @Input('defaultdisplay')  defaultdisplay : boolean = false
  private _shown = false;

  constructor(private el: ElementRef) { 
    this.sortingDefaultIcon()
  }

  sortingDefaultIcon(){
    const parent = this.el.nativeElement;
    const icon = document.createElement('i');
    icon.classList.add('fa')
    parent.appendChild(icon);
    parent.addEventListener('click', () => {
      if(this.enablesort){
        this.toggleSorting(icon)
      }
    });
  }

  toggleSorting(icon : HTMLElement){
    this._shown = !this._shown;
    if(this._shown){
      icon.classList.add('fa-long-arrow-up')
      icon.classList.replace('fa-long-arrow-down','fa-long-arrow-up')
    }else{
      icon.classList.replace('fa-long-arrow-up','fa-long-arrow-down')
    }
  }

}
