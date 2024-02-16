import { Component, HostListener } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { SmartapiService } from 'src/app/api-services/smartapi.service';
import { SmartChartConfig, SmartChartDataSetConfig } from 'src/app/shared/core/SmartInterfaces/SmartChartInterface';
import { get_api_route } from 'src/app/api-services/api-router';

@Component({
  selector: 'app-sub-view',
  templateUrl: './sub-view.component.html',
  styleUrls: ['./sub-view.component.css']
})
export class SubViewComponent {
  circularList: any;
  smartChartConfig:SmartChartConfig;
  //
changeDash:string="1";
//
siteSettings : any;
 //
currentYear:number = 2023;
// sected option
selectedOpt:number=0;
// options
selectOptions:any = ["Today","Current Month","Current Year"];
//
countsData:any;
//
  chatData:any;
  //
  changeChat:string="1";

  constructor(
    private location: Location,
    private router: Router,
    private api: SmartapiService,

    ){

  }
  offerList:any
    ngOnInit(): void {
    this.getDetails();
    this.getChartData();
    this.getSettingsData();
  }



  @HostListener('window:popstate', ['$event'])
  onPopState(event: any) {
    // Prevent the default behavior (going back in history)
    event.preventDefault();

    // Show your logout confirmation or perform any other action
    const confirmLogout = window.confirm('Are you sure you want to log out?');

    if (confirmLogout) {
      // Perform logout or navigate to the logout page
      this.router.navigate(['/logout']);
    } else {
      // If the user cancels the logout, you might want to push a new state
      // to keep the current page in the history stack
      window.history.pushState({ page: 'current' }, '', '');
    }
  }

  getDetails() {
    this.api.smartGet('FORMS_GET_ALL').subscribe((res: any) => {
       console.log(res)
      this.circularList= res;
    });
  }
  // getDetails() {
  //   this.api.smartGet('FORMS_GET_ALL').subscribe((res: any) => {
  //     // console.log(res)
  //     res?.forEach((element:any,index:any)=>{
  //       console.log(index, element)
  //       let bg;
  //       if(index==0)
  //         bg='bg-1'
  //       else if(index==1)
  //         bg='bg-2'
  //       else
  //         bg='bg-3'
  //       element={
  //         ...element,
  //         bgColor:bg
  //       }
  //       this.circularList.push(element)
  //     })
      // this.aboutlist= res;
      
  //   });
  // }

  changeYear(year_flag){
    if(year_flag == 1){
      this.currentYear ++;
    }else{
      this.currentYear --;
    }
    //  get the chat data again
    this.getChartData();
  }
  getChartData(){
    let url = get_api_route("SITE_TRANSACTION_CHART") + "/" + this.currentYear;
    this.api.smartGet(url).subscribe((res: any) => {  
      this.chatData =res;
      this.updateChartConfig();
     
    });
  }

  updateChartConfig(){
    let chart_data = [];
    this.chatData["type_data"].forEach((item)=>{
      chart_data.push({
        label:item?.label,
        data:item?.data
      })
    })


    let dataset:SmartChartDataSetConfig[] = chart_data;
    /*[
        {
         label:"Journals",
         data:this.chatData?.journalCount
        //  data:[]
         //data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120]
        },
        {
          label:"Conferences",
          data:this.chatData?.conferenceCount
         //  data:[]
          //data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120]
         },
         {
          label:"Design Reports",
          data:this.chatData?.reportCount
         //  data:[]
          //data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120]
         },

    //     {
    //      label:"Telephone Complaints",
    //      data:this.chatData?.telephone,
    //     //  data:[]
    //     },
    //     {
    //      label:"Electrical Complaints",
    //      data:this.chatData?.electrical,
    //     //  data:[]
    //     },
    //     {
    //       label:"Network Complaints",
    //       data:this.chatData?.network          ,
    //      //  data:[]
    //      }
     ];*/
    this.smartChartConfig = {
       type:"bar",
       name:"orderchart",
       labels: [
         'January', 'February', 'March', 'April', 'May', 'June',
         'July', 'August', 'September', 'October', 'November', 'December'
       ],
       dataSet:dataset      
    };
 }
title_content:any;
 getSettingsData() {
  this.api.smartGet('AUTH_SITE_SETTINGS').subscribe((res: any) => {
    this.siteSettings = res;
    this.title_content = this.siteSettings?.home_content.split('\n')
  });
}

}
