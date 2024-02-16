import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[smartInputBorder]'
})
export class SmartinputborderDirective {
  @Input('smartErrorMessage') smartErrorMessage :  any 
  @Input('smartSubmit') smartSubmit  : any

  ngOnChanges(): void {
    if(this.smartSubmit){
      this.addErrorClass();
    }
   }

  constructor(private el: ElementRef) 
  { 
    this.inputFiledError();
  }
  inputFiledError(){
    const parent = this.el.nativeElement;
    let event  = parent.nodeName == 'SELECT' ? ['blur','click'] : ['blur','input','keyup','change','click'];
    event.forEach(event =>
      parent.addEventListener(event,()=>{
        this.addErrorClass();
      })
    )
  }

  addErrorClass(){
    if(this.smartErrorMessage?.status == 'INVALID'){
      this.el.nativeElement.classList.add('invalid')
      this.el.nativeElement.classList.replace('valid','invalid')
      this.el.nativeElement.classList.replace('disabled','invalid')
    }else if(this.smartErrorMessage?.status == 'VALID'){
      this.el.nativeElement.classList.add('valid')      
      this.el.nativeElement.classList.replace('invalid','valid')
      this.el.nativeElement.classList.replace('disabled','valid')
    }else if(this.smartErrorMessage?.status == 'DISABLED'){
      this.el.nativeElement.classList.add('disabled')
      this.el.nativeElement.classList.replace('invalid','disabled')
      this.el.nativeElement.classList.replace('valid','disabled')
    }
  }
}
