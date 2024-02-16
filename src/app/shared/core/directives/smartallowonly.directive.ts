import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[smartAllowOnly]'
})
export class SmartallowonlyDirective {

  reqularExpression : any = {
    'NUMBER' :'^[0-9]*$',
    'ALPABETS' : '^[A-Za-z ]*$',
    'ALPHANUMERIC' : '^[A-Za-z0-9 ]*$',
    'NAME' : "^[A-Za-z\"\',().@&_={}#| ]*$",
    'ALL' : "^[A-Za-z0-9\"\',().@&_={}#| ]*$"
  }
  dynamicReqularExpression :  any

  constructor() { 
  }

  @Input() smartAllowOnly : any;
  @Input() allowSpecialCharecter : any
  @HostListener('keypress', ['$event'])
  @HostListener('paste', ['$event']) 
  triggerEvents(event: KeyboardEvent) {
      if(event.type == 'paste'){
          this.onPageEvent(event)
      }else if(event.type == 'keypress'){
        let value = String.fromCharCode(event.keyCode);
          this.checkValid(event,value)
      }
    }

  onPageEvent(event){
    let clipboardData = event.clipboardData;
    let pastedText = clipboardData.getData('text');
    if(this.smartAllowOnly != 'SPECIALCHAR' && this.smartAllowOnly != 'ALPHASPECIAL' && this.smartAllowOnly != 'ALPHANUMERICSPECIAL' && this.smartAllowOnly != 'NUMBERSPECIAL'){
    this.checkValid(event,pastedText)
    }else{
      this.generateSpeacialCharecterReg(event,pastedText)
    }
  }

    checkValid(event,value){
      if(this.smartAllowOnly != 'SPECIALCHAR' && this.smartAllowOnly != 'ALPHASPECIAL' && this.smartAllowOnly != 'ALPHANUMERICSPECIAL' && this.smartAllowOnly != 'NUMBERSPECIAL'){
        let regEx =  new RegExp(this.reqularExpression[this.smartAllowOnly]);    
        if(regEx.test(value))
          return;
        else
            event.preventDefault();
        }else{
          this.generateSpeacialCharecterReg(event,value)
        }
    }

    generateSpeacialCharecterReg(event,value){
        if(this.smartAllowOnly == 'ALPHASPECIAL'){
          this.dynamicReqularExpression = "^[A-Za-z\""+this.allowSpecialCharecter+" ]*$";
        }else if(this.smartAllowOnly == 'ALPHANUMERICSPECIAL'){
          this.dynamicReqularExpression = "^[A-Za-z0-9\""+this.allowSpecialCharecter+" ]*$";
        }else if(this.smartAllowOnly =='NUMBERSPECIAL'){
          this.dynamicReqularExpression = "^[0-9\""+this.allowSpecialCharecter+" ]*$";
        }else if(this.smartAllowOnly =='SPECIALCHAR'){
          this.dynamicReqularExpression = "^[\""+this.allowSpecialCharecter+" ]*$";
        }else{
          console.error("Reqular Expression is Invalid");
        }
        let regEx =  new RegExp(this.dynamicReqularExpression); 
        if(regEx.test(value))
          return
        else
            event.preventDefault();
        }   

}
