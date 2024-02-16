import { Component, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { SmartFormNewConfig } from '../../SmartInterfaces/SmartFormNewInterface';
import { CommonService } from 'src/app/api-services/common/common.service';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SmartDialogService } from '../../services/smart-dialog.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-smart-meet',
  templateUrl: './smart-meet.component.html',
  styleUrls: ['./smart-meet.component.css']
})
export class SmartMeetComponent {

  date: NgbDateStruct;

  @Input('meetTitle') meetTitle: string;

  @Input('meetData') meetData: any;

  @Input('meetTemplate') meetTemplate: TemplateRef<any>;
  @ViewChild('createform') createform: any;
  // output events
  @Output('monthAction') monthAction: EventEmitter<any> = new EventEmitter();
  @Output('clickAction') clickAction: EventEmitter<any> = new EventEmitter();

  firstDayClassesOld=[
    "smart-seven-day",
    "smart-six-day",
    "smart-five-day",
    "smart-four-day",
    "smart-three-day",
    "smart-two-day",
    "smart-one-day",
  ];

  firstDayClasses=[
    "smart-one-day",
    "smart-two-day",
    "smart-three-day",
    "smart-four-day",
    "smart-five-day",
    "smart-six-day",
    "smart-seven-day",
  ];
  // single meet data
  singleMeetData:any;

  meetYear = 2023;
  meetMonth = 9;
  meetYearSelect:number;
  meetMonthSelect:number;

  daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday','Sunday'];

  months = [...Array(12).keys()].map(i => i + 1); // [1, 2, ..., 12]
  years = [...Array(10).keys()].map(i => new Date().getFullYear() - 5 + i); // [currentYear - 5, ..., currentYear + 4]

  get monthNames() {
    return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  }
  get monthsArray(){
    return [1,2,3,4,5,6,7,8,9,10,11,12];
  }
 

  constructor(
    private common:CommonService,
    private datePipe: DatePipe,   
  ) {
    this.meetYear = this.common.currentYear();
    this.meetMonth = this.common.currentMonth();
  }
  
  
  checkDisable(dayIndex){
    if(this.getDateString(dayIndex) < this.common.currentDate()){
      return true;
    }
    return false;
  }

  getDateString(dayIndex){
    let dateString = this.meetYear + "-" + this.common.addLeadingZero(this.meetMonth,2) + "-" + this.common.addLeadingZero(dayIndex,2);
    return dateString;
  }


  getDayData(dayIndex:number){
    let dateString = this.getDateString(dayIndex);
    let filteredPeople = this.meetData ? this.meetData.filter(obj => obj.date == dateString) :[];
    return filteredPeople;
  }

  get SmartMonthArray() {
    let number_days = this.common.getDaysInMonth(this.meetMonth,this.meetYear);
    //console.log("number of days " , number_days);
    return  this.common.generateNumberArray(1,number_days);
  }
  /**
   * 
   */
  firstDivClass(i:number){
    if(i>0) return "";
    let dateString = this.getDateString(1);
   // console.log("ds = " , dateString);
    let date_index = this.common.getDayIndex(dateString);
    //console.log("di " , date_index);
    return this.firstDayClasses[date_index-1]!==undefined ?  this.firstDayClasses[date_index-1] : "";
  }
  /**
   * 
   */
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
    this.monthAction.emit({"month":this.meetMonth,"year":this.meetYear});
  }

  getTemplateName() {
    if (this.meetTemplate !== undefined && this.meetTemplate instanceof TemplateRef) {
      return this.meetTemplate
    }
    return null;
  }

  showMeetDetails(obj:any){
    this.singleMeetData = obj;
    this.clickAction.emit(obj);

    //this.modalService.open(this.createform, { size: 'lg' });
  }

  trackByFn(index, item) {
    return item;
  }
}
