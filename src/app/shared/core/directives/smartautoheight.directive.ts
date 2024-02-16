import { Directive, ElementRef, HostListener, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[smartAutoHeight]'
})
export class SmartautoheightDirective implements OnChanges {

  @Input() smartAutoHeight : boolean = true

  constructor(
    private elem : ElementRef
  ) { 
    this.dynamicResizeHeight()
  }
  ngOnChanges(): void {
    this.dynamicResizeHeight()
  }
   
  ngafterviewchecked(){
    this.dynamicResizeHeight()
  }
  

  @HostListener('window:resize', ['$event'])

  dynamicResizeHeight(){
    if(this.smartAutoHeight){
      let screenAvailabeHeight =  screen.availHeight
      let smartelem =  this.elem.nativeElement
      smartelem.classList.add('overflow-auto')
      this.elem.nativeElement.style.maxHeight = screenAvailabeHeight - 310  +'px'
    }else{
      let smartelem =  this.elem.nativeElement
      smartelem.classList.remove('overflow-auto')
      this.elem.nativeElement.style.maxHeight = 'auto'
    }
  }
}















