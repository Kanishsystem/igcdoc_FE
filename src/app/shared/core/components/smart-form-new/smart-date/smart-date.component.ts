import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from 'src/app/api-services/common/common.service';
import { SmartFormField } from '../../../SmartInterfaces/SmartFormNewInterface';

@Component({
  selector: 'app-smart-date',
  templateUrl: './smart-date.component.html',
  styleUrls: ['./smart-date.component.css']
})
export class SmartDateComponent {
  @Input("type") type:string;
  @Input("item") item: any;
  @Input("data") data:any;
  @Output('updateAction') updateAction: EventEmitter<any> = new EventEmitter();

  years = [...Array(10).keys()].map(i => new Date().getFullYear() - 5 + i); // [currentYear - 5, ..., currentYear + 4]
  months = [...Array(12).keys()].map(i => i + 1); // [1, 2, ..., 12]

  meetYear = 2023;
  meetMonth = 9;
  meetYearSelect:number;
  meetMonthSelect:number;
  selectedTime: NgbTimeStruct = { hour: 0, minute: 0, second: 0 };
  constructor(
    private common:CommonService,     
  ) {
     
  }

  ngOnInit(){
    if(this.type=="yearMonth"){
      this.updateInitMonthYear();
    }else if (this.type=="time"){
      this.selectedTime = this.data!==undefined ? this.common.covertTimeFormatNgbReverse(this.data) : this.selectedTime;
    }
  }

  updateInitMonthYear(){
    this.meetYear = this.data!==undefined ?  this.data?.month : this.common.currentYear();
    this.meetMonth = this.data!==undefined ?  this.data?.month : this.common.currentMonth();
  }



  get monthNames() {
    return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  }
  get monthsArray(){
    return [1,2,3,4,5,6,7,8,9,10,11,12];
  }



  monthYearSelect(){
    this.meetMonth = this.meetMonthSelect;
    this.meetYear = this.meetYearSelect;
    this.invokeMonthAction();
  }

  monthYearReset(){
    this.meetMonthSelect = this.meetMonth;
    this.meetYearSelect = this.meetYear;
  }

  meetPreviousClick(){
    this.meetMonth --;
    if(this.meetMonth < 1){
      this.meetMonth = 12;
      this.meetYear --;
    }
    this.invokeMonthAction();
  }

  meetNextClick(){
    this.meetMonth ++;
    if(this.meetMonth>12){
      this.meetMonth = 1;
      this.meetYear ++;
    }
    this.invokeMonthAction();
  }

  invokeMonthAction(){
    this.updateAction.emit({"month":this.meetMonth,"year":this.meetYear});
  }

  update_time(){
       console.log("change function triggered")
      this.updateAction.emit({name:this.item.name , value:this.common. covertTimeFormatNgb(this.selectedTime)});
  }

  onTimeChange(newTime: NgbTimeStruct) {
     if(newTime){
      this.updateAction.emit({name:this.item.name , value:this.common. covertTimeFormatNgb(newTime)});
     }
  }

}
