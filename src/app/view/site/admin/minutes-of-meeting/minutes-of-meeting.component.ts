import { Component, ViewChild } from '@angular/core';
import { SmartTableColumnConfig, SmartTableConfig, SmartTableMainConfig } from 'src/app/shared/core/SmartInterfaces/SmartTableNewInterface';
import { default_delete_dialog, default_form_dialog, default_iframe_dialog } from '../../helpers/site-defaults';
import { SmartFormField, SmartFormNewConfig } from 'src/app/shared/core/SmartInterfaces/SmartFormNewInterface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SmartapiService } from 'src/app/api-services/smartapi.service';
import { SmartDialogService } from 'src/app/shared/core/services/smart-dialog.service';
import { NotifyService } from 'src/app/api-services/common/notify.service';
import { CommonService } from 'src/app/api-services/common/common.service';
import { get_api_route } from 'src/app/api-services/api-router';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SessionStorageServiceService } from 'src/app/api-services/core/session-storage-service.service';

@Component({
  selector: 'app-minutes-of-meeting',
  templateUrl: './minutes-of-meeting.component.html',
  styleUrls: ['./minutes-of-meeting.component.css']
})
export class MinutesOfMeetingComponent {
  @ViewChild('createform') createform: any
  mom:string="";
  private routeSubscription: Subscription;
  constructor(
    private modalService: NgbModal, 
    private api: SmartapiService, 
    private smartDialog:SmartDialogService,
    private notify: NotifyService,
    private common: CommonService,
    private route: ActivatedRoute,
    private userSession: SessionStorageServiceService,
    
    ) {
      
    }


  
  tableData:any;
  //
  tableConfigNew: SmartTableConfig;

  formData:any;
  //
  selectedId:number = 0;
  //
  currentYear:number = 2023;
  //
  pdfData:any;

  tabSelected: string = 'Mom';
  
    tabs:any = [];
  usertabs=[
    // {
    //   value: 'Mom', label:'All Moms'
    // },
    {
      value: 'proposal', label:'My Proposals'
    },    
  ]
  adminTabs=[
    {
         value: 'Mom', label:'All Moms'
      },
    {
      value: 'approvals', label:'My Approvals'
    },
    {
      value: 'processed', label:'Processed'
    }
  ]

  
  ngOnInit(): void {    
    this.routeSubscription =  this.route.params.subscribe(params => {
      this.mom = params['mom'];
      if(this.adminCheck()){
        this.tabs = [...this.usertabs,...this.adminTabs];
      }else{
        this.tabs = this.usertabs;
        this.tabSelected = 'proposal';
      }
      this.createTable();
    //  this.formData["mom_type"] = this.mom
      this.getTableData();
      //
      this.getDocPdf();
     // console.log('ID from route parameter:', this.mom);
    });
   
    //this.getTableData();
  }
  ngOnDestroy(): void {
    // Unsubscribe to avoid memory leaks
    this.routeSubscription.unsubscribe();
  }

  getDocPdf(){    
     let payload = { type:this.mom};
     this.pdfData = "";
     this.api.smartPost("SITE_MOMTYPE_GET_TYPE_PDF",payload).subscribe((res:any)=>{
        this.pdfData = res.content;
     })
  }

  adminCheck(){
    let adminGroup = "SD_" + this.mom + "_ADMIN";
    return this.userSession.checkRoleExists([adminGroup,"ADMIN"]);
  }

  newButtonCheck(){
    let adminGroup = "SD_" + this.mom + "_ADMIN";
    let memberGroup = "SD_" + this.mom + "_MEMBERS";
    return this.userSession.checkRoleExists([adminGroup, memberGroup,"ADMIN"]);
  }

  createTable() {
    let table_config: SmartTableMainConfig = {
      name: 'Role-Management',
      title: 'Vendors Details',
      table_class: "smart-responsive",
      download: true,     
      showentries: true,
      currentpage: true,
      colsearch: true,      
      pagination: true,    
      showEntriesClass: "is-8",
      search_bar_placeholder: "Search Book List",
      searchBarClass: "col-4 ",
      buttonBarClass: "col-1 d-flex justify-content-end",
      no_results: {
        title: 'No Meetings Found',
        sub_title: 'Create a New Meeting',
        icon: 'fa fa-user',
      },

    };
    

    let table_body_config: SmartTableColumnConfig[] = [
      {
        type: 'sno',
        title: 'S.No',
        tbody: 's_no',
        width:'2%'
      }, 

      {
        type: 'db',
        title: 'Meet No',
        tbody: 'meet_no',
        width:'15%'
      },
      
      {
        type: 'date',
        title: 'Meet Date',
        tbody: 'meet_date',
        width:'15%',
        customFormat: true,
        format: 'dd-MM-YYYY',
      },
      {
        type: 'db',
        title: 'Meet Description',
        tbody: 'meet_desc',
        width:'15%'
      },
      {
        type: 'buttons',
        title: 'Meet File',
        width:'5%',
        btn_config: [        
          {
            type: 'button',             
            class: ['has-text-info'],
            btn_type: 'icon',
            icon: ['fa fa-file-pdf-o'],
            btn_func: (data) => {            
              this.openPdfView(data);
            }
          },
        ],
      },
      //   {
      //   type: 'buttons',
      //   title: 'View',
      //   width:'5%',
      //   btn_config: [
      //     {
      //       type: 'button',
      //       label: '',
      //       class: [ 'is-small has-text-link'],            
      //       btn_type: 'icon',
      //       icon: ['fa fa-file-pdf-o fa-lg'],
      //       btn_func: (data) => {             
      //          this.openPdfView(data);
      //       }
      //     },          
      //   ],
      // }, 
     
    ];
   
    const action_config:SmartTableColumnConfig =  {
      type: 'buttons',
      title: 'Actions',
      width:'5%',
      btn_config: [ 
        /*       
        {
          type: 'button',             
          class: ['has-text-info','is-small'],
          btn_type: 'icon',
          icon: ['fa-pen-to-square'],
          btn_func: (data) => {
           // here impliments
           this.openEditForm(data);
          }
        },*/
        {
          type: 'button',
          label: '',
          class: ['has-text-danger', 'is-small'],
          btn_type: 'icon',
          icon: ["fa fa-trash"],
          btn_func: (data) => {
            //console.log("data ", data);
            this.selectedId = data["ID"] !== undefined ? data["ID"] : 0;
            this.openDeleteCustomDialog();
          }
        },
        
      ],
    };
    if(this.newButtonCheck()){
      table_body_config.push(action_config);
    }


    this.tableConfigNew = {
      tableconfig: table_config,
      config: table_body_config,
      filterConfig: this.getAdminFilter(),
      filterData: {
        from_date: this.common.addDays(-30),
        to_date: this.common.currentDate(),
      },

    };
  }
  
  openPdfView(data) {
    let id = data?.ID!==undefined ? data?.ID : 0;
    let options = {
      title:"PDF Viewer",
      iframe:get_api_route("SITE_MOM_GET_PDF")
    };
    let dialog_options = default_iframe_dialog(options);
    dialog_options.iframe_payload = {id:id};  
    this.smartDialog.openDialog(dialog_options)
  }

  openPdfViewType() {
  //  let id = data?.ID !== undefined ? data?.ID : 0;
    let options = {
      title: "PDF Viewer",
      iframe: get_api_route("SITE_MOMTYPE_GET_TYPE_PDF")
    };
    let dialog_options = default_iframe_dialog(options);
    dialog_options.iframe_payload = { type:this.mom};
    this.smartDialog.openDialog(dialog_options)
  }

  getAdminFilter(){
    let filterConfig:SmartFormField[] = [
      {
        type: 'text',
        width: 12,
        name: 'role_name',
       label: 'Role Name',
       // leftIcon: 'fa-user',
        placeHolder: 'Role Name'       
      },
    
     
    ];
    return filterConfig;
   }

  createFormConfig() {
    let form_fileds: SmartFormField[] = [
      /*
      {
        type: "text",
        width: 6,
        label: "Meet Type:",
        name: "mom_type",
        disabled_func:true,
      //  selectOptionType: 'api',
       /// selectOptionApi:'SITE_MOMTYPE_GET_ALL_SELECT',
      },*/
      {
        type: "text",
        name: "meet_no",
        width: 6,
        label: "Meet No",       
        leftIcon:"fa fa-file-signature",
        placeHolder:'Meet No',
        validations:[
          {
            type:"required",
            msg:"Meet No is Required"
          },
        ]
      },
    
      {
        type: "date",
        name: "meet_date",
        width: 6,
        label: "Meet Date",       
        leftIcon:"fa fa-file-signature",
        placeHolder:'Meet Date',
        validations:[
          {
            type:"required",
            msg:"Meet Date is Required"
          },
          
        ]
      },
      {
        type: "textarea",
        name: "meet_desc",
        width: 12,
        label: "Meet Description",       
        validations:[
          {
            type:"required",
            msg:"Meet  Description is Required"
          },
        ]
      },

      {
        type: "file",
        width: 6,
        label: "Meet File",
        name: "meet_file",
        leftIcon: "fa-user",
        placeHolder: 'Browse File',
        validations: [
          {
            type: "required",
            msg: "Please Browse the File"
          },
          {
            type: "fileTypes",
            msg: "only Pdf is Required",
            fileTypes: ["pdf"]
          },
          {
            type: "fileSize",
            msg: "File size should be less tha 10 MB",
            max: 10
          }
        ]
      },

       
     
      {
        type: 'button',
        label: 'Submit Meeting Form',
        name: 'Submit',
        width: 12,
        buttonClass: 'smart-action-button is-fullwidth',
        buttonType: 'button',
        buttonSubmitType: 'submit',
        leftIcon:"fa-check",
        buttonFunction: (data: any) => {
          this.submitData(data);
      
        },
        hideFunction: (item:any,getValue: any) => {  
          let id = getValue('ID') !== undefined ? parseInt(getValue('ID')) : 0;
          return id > 0 ? true : false;
        },
      
      },
  
      {
        type: 'button',
        label: 'Update',
        name: 'Submit',
        width: 12,
        buttonClass: 'smart-action-button is-fullwidth',
        buttonType: 'button',
        buttonSubmitType: 'submit',
        leftIcon:"fa-check",
        buttonFunction: (data: any) => {
          this.updateDate(data);
         
        },
        hideFunction: (item:any,getValue: any) => {
           let id = getValue('ID') !== undefined ? parseInt(getValue('ID')) : 0;
           return id < 1  ? true : false;
         },
      },
      
     

    ];

    let formconfig: SmartFormNewConfig = {
      name: "momform",
      SmartFields: form_fileds
    }
    return formconfig;
  }


  openForm(data: any=null) {
    if(data!=null){
      this.formData = data
    }else{
      this.formData = {};
    }
   
    let options = {
      title: 'Minutes Of Meeting Form-' + this.mom,
      template: this.createform,
    };
    let dialog_options = default_form_dialog(options);
    dialog_options.width = 70;
    this.smartDialog.openDialog(dialog_options);
  }

  openEditForm(data) {
    let id = data.ID !== undefined ? data.ID : 0;
    let get_one = get_api_route("SITE_MOM_GET_ONE");
    this.api.smartPost(get_one,{id:id}).subscribe((res: any) => {      
      this.formData = res;
      this.openForm();
    });
  }



  getTableData() {
  
    let payload = {mom_type:this.mom};
    this.api.smartPost('SITE_MOM_GET_ALL',payload).subscribe((res: any) => {
      this.tableData = res;
    });
  }
  
  
submitData(data) {
  data["mom_type"] = this.mom;
  let formData = this.api.preparePostData(data);
  formData.append("mom_file",data["meet_file"]);
  this.api.smartPost('SITE_MOM_INSERT', formData, false, false, "multipart/form-data").subscribe((res: any) => {
    this.smartDialog.closeDialog();
    this.notify.success("Submitted successfully");
    this.getTableData();
  });
}


updateDate(data) {
  let id = data.ID !== undefined ? data.ID : 0;
  let update_url = get_api_route("SITE_MOM_UPDATE");
  data["id"] = id;
  this.api.smartPost(update_url, data).subscribe((res: any) => {
    //  console.log('data ', res);
    this.notify.success("Updated successfully");
    this.smartDialog.closeDialog();
    this.getTableData();
  });
}

delete_one(){
  let deleteUrl = get_api_route("SITE_MOM_DELETE_ONE");
  this.api.smartPost(deleteUrl,{id:this.selectedId}).subscribe((data)=>{
    this.notify.success("Deleted successfully");
    this.getTableData();  
  })

}


openDeleteCustomDialog() {
  let dialog_options = default_delete_dialog("Do you want to Delete?","The Action Cannot Be Reverted");
   this.smartDialog.openDialog(dialog_options)
    .confirmed.subscribe((data) => {
       if(data.action=="yes"){
          this.delete_one();
       }      
    });     
}

}
