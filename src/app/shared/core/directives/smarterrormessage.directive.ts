import { Directive, ElementRef, Input, OnChanges} from '@angular/core';

@Directive({
  selector: '[smartErrorMessage]'
})
export class SmarterrormessageDirective implements OnChanges {
  @Input() smartErrorMessage : any
  @Input() smartLabel : string
  @Input() smartSubmit :  boolean = false
  @Input() smartCustom :  any = []
  @Input() smartMultiInput :  any
  @Input() smartMessage = true
  eventArr : any=[]
  
  constructor(private el: ElementRef) {
    this.validation()
   }

   ngOnChanges(): void {
    if(this.smartSubmit){
      this.onSubmitValidation()
    }
   }

   eventDecider(element,type){
    this.eventArr = []
    switch (element) {
      case 'INPUT':
        if(type=='radio'){
          this.eventArr = ['blur','click']
        }else{
          this.eventArr = ['blur','keyup']
        }
        break;
      case 'SELECT':
        this.eventArr = ['click','blur']
        break;
      default: 
        break;
    }
   }

   validation(){
      const parent = this.el.nativeElement;
      let parentName  =   parent.getAttribute('formcontrolname');
      let previousNode = parent.parentElement;
      let initialerrDiv =  document.createElement('div');
      initialerrDiv.setAttribute('class','text-danger');
      initialerrDiv.setAttribute('id',parentName+'_smartError');
      let inputFileds = parent.nodeName;
      let  inputFiledType =  parent.getAttribute('type');
      this.eventDecider(inputFileds,inputFiledType);
      this.eventArr.forEach(event =>
        parent.addEventListener(event,()=>{
          let inputFiled = parent.getAttribute('formcontrolname');
          let errDiv = document.getElementById(inputFiled+'_smartError');
          if(this.smartMultiInput){
            if(errDiv != null){
              errDiv?.remove()
            }
          }else{
           if(errDiv != null){
             errDiv.remove();
           }
           previousNode.append(initialerrDiv);
            let nextNode = parent.nextSibling;
            if(this.smartMessage){
              nextNode.innerHTML  =  this.validationErrorMessages(parent)
            }
          }
      })
      );
   }
   onSubmitValidation(){
    const parent = this.el.nativeElement;
    let inputcheck  = parent.getElementsByTagName('input')
    if(inputcheck.length  > 0){
      let inputFiled = inputcheck[0].getAttribute('formcontrolname');
      let checkErrDiv = document.getElementById(inputFiled+'_smartError');
      if(checkErrDiv !=  null){
        checkErrDiv.remove();
      }
      let errDiv =  document.createElement('div');
      errDiv.setAttribute('class','text-danger');
      errDiv.setAttribute('id',inputFiled+'_smartError');
      parent.append(errDiv)
      if(this.smartMessage){
           errDiv.innerHTML  =  this.validationErrorMessages(parent)
      }
    }else{
      let previousNode = parent.parentElement;
      let inputFiled = parent.getAttribute('formcontrolname');
      let checkErrDiv = document.getElementById(inputFiled+'_smartError');
      if(checkErrDiv !=  null){
        checkErrDiv.remove();
      }
      let errDiv =  document.createElement('div');
      errDiv.setAttribute('class','text-danger');
      errDiv.setAttribute('id',inputFiled+'_smartError');
      previousNode.append(errDiv);
      let nextNode = parent.nextSibling;
      if(this.smartMessage){
           nextNode.innerHTML  =  this.validationErrorMessages(parent)
      }
    }
   }

   switchErrorValidationMessages(){
    let err  = ''
     for(let smartMessage of this.smartCustom){
        if(this.smartErrorMessage?.errors?.[smartMessage.error]){
            err = smartMessage?.smartmessage
        }
     }
     return err
   }

   validationErrorMessages(parent?){
    if(this.smartCustom && this.switchErrorValidationMessages()){
      return this.switchErrorValidationMessages()
    }else {
      if(!this.smartLabel){
        let label = parent.previousSibling.innerText;
        this.smartLabel = label.replace(/[^a-zA-Z ]/g, "");
      }
      let err = ''
      if(this.smartErrorMessage?.status == 'INVALID'){
        if(this.smartErrorMessage?.errors?.required){
          err = this.smartLabel + " is required "
        }else if(this.smartErrorMessage?.errors?.minlength){
          err = this.smartLabel + " should contain minimum "+ this.smartErrorMessage?.errors?.minlength?.requiredLength + " charecters";
        }else if(this.smartErrorMessage?.errors?.maxlength){
          err = this.smartLabel + " should contain Maximum "+ this.smartErrorMessage?.errors?.maxlength?.requiredLength + " charecters";
        }else if(this.smartErrorMessage?.errors?.pattern || this.smartErrorMessage?.errors?.invalid || this.smartErrorMessage?.errors?.email){
          err = this.smartLabel + " is invalid "
        }
      }else{
        err = ''
      }
      return err;
    }
   } 
}
