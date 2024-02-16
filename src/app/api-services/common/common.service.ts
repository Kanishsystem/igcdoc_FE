import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private datePipe: DatePipe
  ) { }

  convertDateFormat(dateobj) {
    if (dateobj) {
      return this.datePipe.transform((dateobj.year + '-' + (dateobj.month) + '-' + dateobj.day), 'dd-MM-yyyy')
    }
    return '-'
  }

  covertTimeFormatNgb(time_obj){
    if(time_obj && time_obj.hour!=undefined){
     return time_obj.hour+ ":"+time_obj.minute;
    }
    return ''
  }
  covertTimeFormatNgbReverse(time_str){
    let time_obj: NgbTimeStruct;
    if(time_str){
      let time_arr = time_str.trim().split(":");
     
      time_obj.hour = time_arr[0];
      time_obj.minute = time_arr[1];
     return time_obj;
    }
    return null;
  }
 /**
  * 
  * @param input_date 
  * @returns 
  */
  convertNormalToNgb(input_date){
     let data_arr = input_date.split("-");
     if(data_arr[0]!==undefined && data_arr[1]!==undefined && data_arr[2]!==undefined){
        let output = {year:parseInt(data_arr[0]),month:parseInt(data_arr[1]),day:parseInt(data_arr[2])};
       // console.log("output " , output , "  in_Date " , input_date);
        return output;
     }
     return input_date;
  }

  /**
   *  get days plus of given date
   */
  addDays( daysToAdd:number,date_in:string=undefined){
    let givenDate = new Date();
    if(date_in!==undefined && date_in.length>3){
      givenDate = new Date(date_in);
    }
    // Calculate the new date by adding days
   const newDate = new Date(givenDate);
   newDate.setDate(givenDate.getDate() + daysToAdd);
   return this.formatDateToYYYYMMDD(newDate);
  }
 /**
  * 
  * @param date 
  * @returns 
  */
  formatDateToYYYYMMDD(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-based
    const day = String(date.getDate()).padStart(2, '0');  
    return `${year}-${month}-${day}`;
  }

  /**
   * 
   */
  currentDate(){
    let newDate = new Date();
    return this.formatDateToYYYYMMDD(newDate);
  }
  /**
   * 
   * @returns 
   */
  currentYear(){
    let date = new Date();
    return date.getFullYear();
  }
  /**
   * 
   * @returns 
   */
  currentMonth(){
    let date = new Date();
    return date.getMonth() + 1;
  }
  /**
   * 
   * @param month 
   * @param year 
   * @returns 
   */

  getDaysInMonth(month: number, year: number): number {
    return new Date(year, month, 0).getDate();
  }

  generateNumberArray(min, max) {
    const numberArray = [];    
    for (let i = min; i <= max; i++) {
      numberArray.push(i);
    }    
    return numberArray;
  }

  getDayIndex(dateString:string) {   
    const date = new Date(dateString);
    const dayIndex = date.getDay();
    return  dayIndex;
  }

  addLeadingZero(num:number,digits:number) {
    return num.toString().padStart(digits, '0');
  }

  convertDateFormatReverse(dateobj) {
    if (dateobj) {
      return this.datePipe.transform((dateobj.year + '-' + (dateobj.month) + '-' + dateobj.day), 'yyyy-MM-dd')
    }
    return '-'
  } 
  

  

  compareDates(date_in:any,date_compare:any,type:string=""){
     if(date_in instanceof Object){
       date_in = this.convertDateFormatReverse(date_in);
     }
     if(date_compare instanceof Object){
      date_compare = this.convertDateFormatReverse(date_compare);
    }
    let givenDate = new Date(date_in); // Replace with your given date
    let currentDate = new Date(date_compare);
    givenDate.setHours(0, 0, 0, 0); // Set time to midnight
    currentDate.setHours(0, 0, 0, 0);
    //console.log("sdate ", date_in,  "edate =", date_compare);
    //console.log(" sdate ", givenDate , " cdate ", currentDate);
    if(type=="REVERSE"){
      return currentDate >=givenDate;
    }
    return givenDate >= currentDate;
  }

}
