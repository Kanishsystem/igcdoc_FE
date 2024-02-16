import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  @Input() closeAlert : Subject<any>
  @ViewChild('alert') alert : NgbModal;
  @Output('alertActions') alertActions : EventEmitter<any> = new EventEmitter();
  @Input('header') header :  string;
  @Input('headerClass') headerClass :  string;
  @Input('questions') questions :  string;
  @Input("buttons") actionButtons:any[];

  constructor(
    config: NgbModalConfig,
    public modalService: NgbModal,
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.closeAlert.subscribe(data => {
      if(data?.open){
        this.modalService.open(this.alert,{size:'lg'})
      }else if(data?.close){
        this.modalService.dismissAll()
      }
    })
  }

  ngAfterViewInit(): void { 
    //this.modalService.open(this.alert,{size:'sm'})
  }

  close(){
    this.onConfirmation('CLOSE')
    this.modalService.dismissAll();
  }

  onConfirmation(value){
    this.alertActions.emit({'result':value});
  }
  get actionButtonsArr(){
     if(this.actionButtons!==undefined && this.actionButtons.length > 0){
      return this.actionButtons;
     }
     // else return normal buttons
     let actionButtonsArrNormal = [
      {
        label:"Yes",
        class:"is-link",
        value:"Yes"
      },
      {
        label:"No",
        class:"is-danger",
        value:"No"
      }
     ];
     return actionButtonsArrNormal;
  }
}
