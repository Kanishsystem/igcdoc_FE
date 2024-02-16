import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-smart-validation',
  templateUrl: './smart-validation.component.html',
  styleUrls: ['./smart-validation.component.css']
})
export class SmartValidationComponent implements OnInit {
  @Input('formctrl') formctrl :  any
  @Input('isSubmitted') isSubmitted  : boolean = false
  @Input('label') label : string
  constructor(){


  }

  ngOnInit(): void {
      this.createFormValidaion();
    
  }

  
  createFormValidaion(){
    let validation = document.getElementById('validation');
    let divtag = document.createElement('div')
    divtag.setAttribute('class','text-danger')
    let labeltag = this.validaionTag()
    divtag.appendChild(labeltag)
    validation?.append(divtag);
  } 

  validaionTag(){
    let labeltag  =  document.createElement('label')
    return labeltag
  }
  
}
