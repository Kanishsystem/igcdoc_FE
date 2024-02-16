import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-smart-org',
  templateUrl: './smart-org.component.html',
  styleUrls: ['./smart-org.component.css']
})
export class SmartOrgComponent {
  @Input("orgData") orgData:any;
  @Input("orgTemplate") orgTemplate:any;
  @Input("classContainer") classContainer:string="";
  @Output('orgAction') orgAction: EventEmitter<any> = new EventEmitter();
  invokeOrgAction(item:any){
    this.orgAction.emit(item);
  }

}
