import { Component } from '@angular/core';
import { get_api_route } from 'src/app/api-services/api-router';
import { SmartapiService } from 'src/app/api-services/smartapi.service';
import { SmartChartConfig, SmartChartDataSetConfig } from 'src/app/shared/core/SmartInterfaces/SmartChartInterface';
import { SmartDashCard, SmartDashCards } from 'src/app/shared/core/SmartInterfaces/SmartDashCardInterface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

    // get smart dash cards
    smartDashCards: SmartDashCards;
    // smart chart config
    smartChartConfig:SmartChartConfig;
      //
    changeDash:string="1";
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
    
    userDetails:any
    


    constructor(     
      private api: SmartapiService,     
    ) {
      
    }

    ngOnInit(){
      this.get_dash_counts();
      this.updateChartConfig();
      this.getProfileDetails();
      this.getChartData();
    }

  get_dash_counts(){
    let url = get_api_route("DASH_GET_COUNT") + "/" + this.selectedOpt;
    this.api.smartGet(url).subscribe((res: any) => {    
      this.countsData = res;
      console.log("result",this.countsData)
     // this.updateDashCards();
    });
  }  

  dashOptionChange(){   
    this.get_dash_counts();
  }

  // 
  changeYear(year_flag){
    if(year_flag == 1){
      this.currentYear ++;
    }else{
      this.currentYear --;
    }
    //  get the chat data again
    this.getChartData();
  }

  updateDashCards(){
   // let cat_data = this.getCatDashUsers();
     let cardConfig:SmartDashCard[]=[
      //  {
      //   color:"GREEN",
      //   title:"Users Logged In",
      //   valueIndex: this.countsData?.user,
      //   icon:"fa-user",      
      //  },
       {
        color:"PINK",
        title:"Total DOCS",
        valueIndex: this.countsData?.docs,
        icon:"fa fa-folder-plus",       
       },
       {
        color:"BLUE",
        title:"Total Meetings",
        valueIndex: this.countsData?.meetcount,
        icon:"fa fa-people-roof"
       }, 
       {
        color:"YELLOW",
        title:"Electrical ",
        valueIndex: this.countsData?.electrical,
        icon:"fa-brands fa-nfc-directional"
       },
       {
        color:"INDIGO",
        title:"Telephone",
        valueIndex: this.countsData?.telephone,
        icon:"fa fa-phone",
       
       },   
      //  {
      //   color:"INDIGO",
      //   title:"NETWORK",
      //   valueIndex: this.countsData?.network,
      //   icon:"fa fa-phone"
      //  },      
     ];

     this.smartDashCards = {
       type:"ICON_RIGHT",
       cards:cardConfig,
       cardClass:"is-2"
     };
  }

  //   getChartData(){
  //   let data ={year:this.currentYear}
  //   this.api.smartPost('SITE_TRANSACTION_CHART',data).subscribe((res: any) => {     
  //       //console.log("res " , res);
  //        this.chatData = this.getProcessData(res);
  //       //
  //       this.changeChat = "" + this.changeYear;
  //      // console.log("chat data " , this.chatData);
  //       //
  //       this.updateChartConfig();
  //   });
  // }
  getChartData(){
    let url = get_api_route("SITE_TRANSACTION_CHART") + "/" + this.currentYear;
    this.api.smartGet(url).subscribe((res: any) => {    
      // console.log("RESULT",res)
    //  debugger
      this.chatData =res;
  

      //
    //  this.changeChat = "" + this.changeYear;
     // console.log("chat data " , this.chatData);
      //
      this.updateChartConfig();
     
    });
  } 
  
  getProcessData(data){
    let document = [];
    let electrical_complaints = [];
    let telephone_complaints = [];
    let network_complaints = [];
    for (let i=1;i<=12;i++){
      //  let total_data = this.getMonthAmount(data,i);
       console.log("total Data",data)
       document.push(data.docs);
       electrical_complaints.push(data.electrical_comp);
       network_complaints.push(data.network_comp);
       telephone_complaints.push(data.telephone_comp);
    }
    return {document,electrical_complaints,telephone_complaints,network_complaints};
 }

 
 getMonthAmount(data,monthNumber){
  let docs = 0;
  let electrical_comp =0;
  let telephone_comp = 0;
  let network_comp =0;
  
  for(let j=0;j<data.length;j++){
    let obj = data[j];
  //   if(obj.transaction_mode =="BUY" && obj.monthVal==monthNumber){
  //      buy_amount = obj.totalAmount;
  //   }
  //   if(obj.transaction_mode =="REFERRAL" && obj.monthVal==monthNumber){
  //     ref_amount = obj.totalAmount;
  //  }
  }
 
  return {docs,electrical_comp,telephone_comp,network_comp};
}


  updateChartConfig(){
    let dataset:SmartChartDataSetConfig[] = [
        {
         label:"Total Documents",
         data:this.chatData?.docs
        //  data:[]
         //data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120]
        },
        {
          label:"Total Meetings",
          data:this.chatData?.meetcount
         //  data:[]
          //data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120]
         },
        {
         label:"Telephone Complaints",
         data:this.chatData?.telephone,
        //  data:[]
        },
        {
         label:"Electrical Complaints",
         data:this.chatData?.electrical,
        //  data:[]
        },
        {
          label:"Network Complaints",
          data:this.chatData?.network          ,
         //  data:[]
         },
        //  {
        //   label:"Mechanical Complaints",
        //   data:this.chatData?.mechanical          ,
        //  //  data:[]
        //  }
    ];
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

 getProfileDetails() {
  this.api.smartGet('RECENTUSERS').subscribe((res: any) => {
    this.userDetails= res;
  });
}
    
}
