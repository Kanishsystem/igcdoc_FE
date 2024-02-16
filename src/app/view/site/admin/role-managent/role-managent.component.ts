import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { get_api_route } from 'src/app/api-services/api-router';
import { NotifyService } from 'src/app/api-services/common/notify.service';
import { SmartapiService } from 'src/app/api-services/smartapi.service';
import { SmartFormField, SmartFormNewConfig } from 'src/app/shared/core/SmartInterfaces/SmartFormNewInterface';
import { SmartTableColumnConfig, SmartTableConfig, SmartTableMainConfig } from 'src/app/shared/core/SmartInterfaces/SmartTableNewInterface';
import { SmartDialogService } from 'src/app/shared/core/services/smart-dialog.service';
import { default_delete_dialog, default_form_dialog } from '../../helpers/site-defaults';
import { CommonService } from 'src/app/api-services/common/common.service';

@Component({
  selector: 'app-role-managent',
  templateUrl: './role-managent.component.html',
  styleUrls: ['./role-managent.component.css']
})
export class RoleManagentComponent {
     
  @ViewChild('createform') createform: any
  @ViewChild('employeesTemplate', { static: true }) employeeTemplate: TemplateRef<any>;

  constructor(
    private modalService: NgbModal, 
    private api: SmartapiService, 
    private smartDialog:SmartDialogService,
    private notify: NotifyService,
    private common: CommonService,
  
    
    ) {}


  
  tableData:any;
  //
  tableConfigNew: SmartTableConfig;

  formData:any;
  //
  selectedId:number = 0;
  //
  currentYear:number = 2023;

  
  ngOnInit(): void {
    this.createTable();
    this.getTableData();
   
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
      search:true,     
      pagination: true,    
      showEntriesClass: "is-8",
      search_bar_placeholder: "Search Role",
      searchBarClass: "col-4 ",
      buttonBarClass: "col-1 d-flex justify-content-end",

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
        title: 'Role Name',
        tbody: 'role_name',
        width:'20%'
      },
      {
        type: 'template',
        title: 'Employee',
        tbody: 'employee',
        template:this.employeeTemplate,
        width:'80%'
        
      },
      {
        type: 'buttons',
        title: 'Actions',
        width:'5%',
        btn_config: [        
          {
            type: 'button',             
            class: ['has-text-info','is-small'],
            btn_type: 'icon',
            icon: ['fa-pencil-square-o'],
            btn_func: (data) => {
             // here impliments
             this.openEditForm(data);
            }
          },
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
      },
    ];
   


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

      {
        type: "text",
        name: "role_name",
        width: 12,
        label: "Role Name",       
        leftIcon:"fa fa-id-card",
        placeHolder:'Role Name',
        validations:[
          {
            type:"required",
            msg:"Role name is Required"
          },
          // {
          //   type:"pattern",
          //   msg:"Please Enter Correct Role Name",
          //   pattern:'[a-zA-Z]+\\.?'
          // },
        ]
      },

        {
          type: "selectsearchmultiple",
          width: 12,
          label: "Select Employees:",
          name: "users",
          selectOptionType: 'api',
          selectOptionApi: "USER_GET_ALL_SELECT",
        },
     
      {
        type: 'button',
        label: 'Submit',
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
      name: "Role list form",
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
      title: 'Role Management Form',
      template: this.createform,
    };
    let dialog_options = default_form_dialog(options);
    dialog_options.width = 70;
    this.smartDialog.openDialog(dialog_options);
  }

  openEditForm(data) {
    let id = data.ID !== undefined ? data.ID : 0;
    let get_one = get_api_route("SITE_ROLE_ONE");
    this.api.smartPost(get_one, {id:id}).subscribe((res: any) => {      
      // this.formData = res;
      this.openForm(res);
    });
  }



  getTableData() {
    this.api.smartGet('SITE_ROLE_GET_ALL').subscribe((res: any) => {
      this.tableData = res;
    });
  }
  
  
submitData(data) {
  this.api.smartPost('SITE_ROLE_INSERT', data).subscribe((res: any) => {
    this.smartDialog.closeDialog();
    this.notify.success("Submitted successfully");
    this.getTableData();
  });
}


updateDate(data) {
  let id = data.ID !== undefined ? data.ID : 0;
  let update_url = get_api_route("SITE_ROLE_UPDATE");
  data["id"] = id;
  this.api.smartPost(update_url, data).subscribe((res: any) => {
    //  console.log('data ', res);
    this.notify.success("Updated successfully");
    this.smartDialog.closeDialog();
    this.getTableData();
  });
}

delete_one(){
  let deleteUrl = get_api_route("SITE_ROLE_DELETE_ONE");
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
