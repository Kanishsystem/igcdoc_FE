import { Component, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { get_api_route } from 'src/app/api-services/api-router';
import { SmartapiService } from 'src/app/api-services/smartapi.service';
import { SmartFormField, SmartFormNewConfig } from 'src/app/shared/core/SmartInterfaces/SmartFormNewInterface';
import { SmartTableColumnConfig, SmartTableConfig, SmartTableMainConfig } from 'src/app/shared/core/SmartInterfaces/SmartTableNewInterface';
import { default_form_dialog } from '../../helpers/site-defaults';
import { SmartDialogService } from 'src/app/shared/core/services/smart-dialog.service';
import { CommonService } from 'src/app/api-services/common/common.service';
import { NotifyService } from 'src/app/api-services/common/notify.service';

@Component({
  selector: 'app-types-management-system',
  templateUrl: './types-management-system.component.html',
  styleUrls: ['./types-management-system.component.css']
})
export class TypesManagementSystemComponent {

  @ViewChild('createform') createform: any

  constructor(
    private modalService: NgbModal,
    private api: SmartapiService,
    private smartDialog:SmartDialogService,
    private common: CommonService,
    private notify: NotifyService,


    ) {}


  tableData:any;
  //
  tableConfigNew: SmartTableConfig;
  //
  formData:any;

  ngOnInit(): void {
    this.createTable();
    this.getTableData();

  }


  createTable() {
    let table_config: SmartTableMainConfig = {
      name: 'Types ',
      title: 'Vendors Details',
      table_class: "smart-responsive",
      download: true,
      // search: true,
      showentries: true,
      currentpage: true,
      //refresh: true,
      showingentries: true,
      // sorting: true,
      pagination: true,
      // add: false,
      colsearch: true,
      // excelcond: true,
      //  settings: true,
      // buttons_tempalte: this.buttonsTemplate,
      showEntriesClass: "is-4",
      search_bar_placeholder: "Search Book List",
      searchBarClass: "col-4 ",
      buttonBarClass: "col-4 d-flex justify-content-end",

    };
    
  


    let table_body_config: SmartTableColumnConfig[] = [
      {
        type: 'sno',
        title: 'S.No',
        tbody: 's_no',
      },

      {
        type: 'db',
        title: 'Type',
        tbody: 'type_name',
      },
      {
        type: 'db',
        title: 'Type Value',
        tbody: 'type_value',
      },
      {
        type: 'buttons',
        title: 'Edit/View',
        btn_config: [
          {
            type: 'button',             
            class: ['has-text-info','is-small'],
            btn_type: 'icon',
            icon: ['fa-pen-to-square'],
            btn_func: (data) => {
             // here impliments
             this.openEditForm(data);
            }
          },


        ],
      },
    ];



    this.tableConfigNew = {
      tableconfig: table_config,
      config: table_body_config,
      filterConfig:this.getAdminFilter(),
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
        name: 'type_name',
      //  label: 'Category Name',
       // leftIcon: 'fa-user',
        placeHolder: 'Type Name'       
      },
    
      {
        type: 'text',
        width: 12,
        name: 'type_value',
      //  label: 'Category Name',
       // leftIcon: 'fa-user',
        placeHolder: 'Type value'       
      },

      

     
    

    
     
    ];
    return filterConfig;
   }
   



  createFormConfig() {
    let form_fileds: SmartFormField[] = [
      {
        type:"select",
        name:"type_name_sel",
        label:"Select Type",
        width:6,
        placeHolder:"Please Select Type",
        selectOptionType:"api",
        selectOptionApi:"SITE_TYPE_GET_ALL_TYPES",
        validations:[
          {
            type:"required",
            msg:"Please Select Type"
          }
          
        ],
        onChange:(get_value,set_value,set_validations)=>{
          let type_name_sel = get_value("type_name_sel");
          if(type_name_sel=="OTHER"){
            set_validations("type_name","ENABLE");
          }else{
            set_validations("type_name","DISABLE");
          }
        }        
      }, 
      {
        type: "text",
        name: "type_name",
        width: 6,
        label: "Type ",
        leftIcon: "fa fa-file",
        placeHolder:'Type Name',
        hideFunction:(item,get_value)=>{
          let type_name_sel = get_value("type_name_sel");
          return type_name_sel=="OTHER" ? false : true;        
        },
        validations:[
          {
            type:"required",
            msg:"Please Select Type"
          },

          {
            type:"pattern",
            msg:"Please enter type value",
            pattern:"/[a-zA-Z]/",
          }
          
        ],     
      },

      {
        type: "text",
        name: "type_value",
        width: 6,
        label: "Type Value",
        leftIcon: "fa fa-file-signature",
        placeHolder:'Type Value',
        validations:[
          {
            type:"required",
            msg:"Type Value is Required"
          }
        ]

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
      name: "Book List form",
      SmartFields: form_fileds
    }
    return formconfig;
  }


  openForm(data: any=null) {
   
    let options = {
      title:"Types Management Form",
     
      template:this.createform
    };
    let dialog_options = default_form_dialog(options);  
    dialog_options.width=50;
    this.smartDialog.openDialog(dialog_options)
    
  }


  getTableData() {
    this.api.smartGet('SITE_TYPE_GET_ALL').subscribe((res: any) => {
      this.tableData = res;
    });
  }


  submitData(data) {
    this.api.smartPost('SITE_TYPE_INSERT', data).subscribe((res: any) => {
      this.getTableData();
      this.smartDialog.closeDialog();
      this.notify.success("Submitted successfully");
    });
  }


  updateDate(data) {
    let id = data.ID !== undefined ? data.ID : 0;
    let update_url = get_api_route("SITE_TYPE_UPDATE") + id;
    this.api.smartPost(update_url, data).subscribe((res: any) => {
      //  console.log('data ', res);
      this.smartDialog.closeDialog();
      this.notify.success("Updated successfully");
      this.getTableData();
    });
  }

  openEditForm(data) {
    let id = data.ID !== undefined ? data.ID : 0;
    let get_one = get_api_route("SITE_TYPE_ONE") + id;
    this.api.smartGet(get_one).subscribe((res: any) => {
       console.log("single data", res);
      this.formData = res;
      this.openForm();
    });
  }




}
