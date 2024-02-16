import { Component, TemplateRef, ViewChild } from '@angular/core';
import { CommonService } from 'src/app/api-services/common/common.service';
import { NotifyService } from 'src/app/api-services/common/notify.service';
import { SmartapiService } from 'src/app/api-services/smartapi.service';
import {
  SmartFormField,
  SmartFormNewConfig,
} from 'src/app/shared/core/SmartInterfaces/SmartFormNewInterface';
import {
  SmartTableColumnConfig,
  SmartTableConfig,
  SmartTableMainConfig,
} from 'src/app/shared/core/SmartInterfaces/SmartTableNewInterface';
import { SmartDialogService } from 'src/app/shared/core/services/smart-dialog.service';
//import { default_form_dialog } from '../helpers/site-defaults';
import { default_delete_dialog, default_form_dialog } from '../helpers/site-defaults';
import { get_api_route } from 'src/app/api-services/api-router';

@Component({
  selector: 'app-doc-type',
  templateUrl: './doc-type.component.html',
  styleUrls: ['./doc-type.component.css'],
})
export class DocTypeComponent {
  @ViewChild('createform') createform: any;
  @ViewChild('membersTemplate', { static: true })
  membersTemplate: TemplateRef<any>;
  @ViewChild('adminTemplate', { static: true }) adminTemplate: TemplateRef<any>;

  constructor(
    private api: SmartapiService,
    private smartDialog: SmartDialogService,
    private notify: NotifyService,
    private common: CommonService
  ) {}


  tableData: any;
  //
  tableConfigNew: SmartTableConfig;
  //
  formData: any;
  //
  docTypes:any;
  selectedId:number = 0;

  ngOnInit(): void {
    this.createTable();
    this.getTableData();
  }


  
  getTableData() {
    this.api.smartGet('DOC_GET_ALL').subscribe((res: any) => {
      this.tableData = res;
    });
  }

  createTable() {
    let table_config: SmartTableMainConfig = {
      name: 'Role-Management',
      title: 'Vendors Details',
      table_class: 'smart-responsive',
      download: true,
      showentries: true,
      currentpage: true,
      //colsearch: true,
      pagination: true,
      search:true, 
      showEntriesClass: 'is-8',
      search_bar_placeholder: 'Search Document Type',
      searchBarClass: 'col-4 ',
      buttonBarClass: 'col-1 d-flex justify-content-end',
      no_results: {
        title: 'No Document Types Found',
        sub_title: 'Create a New Document Types',
        icon: 'fa fa-user',
      },
    };

    let table_body_config: SmartTableColumnConfig[] = [
      {
        type: 'sno',
        title: 'S.No',
        tbody: 's_no',
        width: '2%',
      },
      {
        type: 'tag',
        title: 'Category',
        tbody: 'doc_category',
        width: '10%',
        tagCond: [
          { comp: '1', tagClass: ' ', tagText: 'Knowledge' },
          { comp: '2', tagClass: '', tagText: 'Work' },
          { comp: '3', tagClass: '', tagText: 'Drawings' }
        ],
      },
      {
        type: 'db',
        title: 'Type',
        tbody: 'doc_type',
        width: '10%',
      },
      {
        type: 'buttons',
        title: 'Actions',
        width: '5%',
        btn_config: [
          {
            type: 'button',
            class: ['has-text-info', 'is-small'],
            btn_type: 'icon',
            icon: ['fa-pencil-square-o'],
            btn_func: (data) => {
              // here impliments
               this.openEditForm(data);
            },
          },

          {
            type: 'button',
            label: '',
            class: ['has-text-danger', 'is-small'],
            btn_type: 'icon',
            icon: [' fa-trash'],
            btn_func: (data) => {
              //console.log("data ", data);
               this.selectedId = data['ID'] !== undefined ? data['ID'] : 0;
               this.openDeleteCustomDialog();
            },
          },
        ],
      },
    ];

    this.tableConfigNew = {
      tableconfig: table_config,
      config: table_body_config,
      // filterConfig: this.getAdminFilter(),
      // filterData: {
      //   from_date: this.common.addDays(-30),
      //   to_date: this.common.currentDate(),
      // },
    };
  }

  createFormConfig() {
    let form_fileds: SmartFormField[] = [
      {
        type: 'select',
        name: 'doc_category',
        width: 12,
        label: 'Document Category',
        placeHolder: 'Please Select',
        selectOptionType: 'self',
        selectOptions: [
          { value: 1, label: 'Knowledge Document' },
          { value: 2, label: 'Work Document' },
          { value: 3, label: 'Drawings' },
        ],
        validations: [
          {
            type: 'required',
            msg: 'Document Category is Required',
          },
        ],
      },
      {
        type: 'text',
        width: 12,
        label: 'Enter Document Type',
        name: 'doc_type',
        placeHolder: '(Ex: Journal, Conference)',
        validations: [
          {
            type: 'required',
            msg: 'Document Type is Required',
          },
        ],
      },
      {
        type: 'select',
        width: 12,
        label: 'Is the Type Required to be displayed to dashboard',
        name: 'show_chart',
        placeHolder: '',
        selectOptionType: 'self',
        selectOptions: [
          { value: 1, label: 'Yes' },
          { value: 2, label: 'No' },
        ],    
        validations: [
          {
            type: 'required',
            msg: ' Type is Required',
          },
        ],  
      },
      {
        type: 'button',
        label: 'Submit',
        name: 'Submit',
        width: 12,
        buttonClass: 'smart-action-button is-fullwidth',
        buttonType: 'button',
        buttonSubmitType: 'submit',
        leftIcon: 'fa-check',
        buttonFunction: (data: any) => {
          this.submitData(data);
        },
        hideFunction: (item: any, getValue: any) => {
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
        leftIcon: 'fa-check',
        buttonFunction: (data: any) => {
           this.updateDate(data);
        },
        hideFunction: (item: any, getValue: any) => {
          let id = getValue('ID') !== undefined ? parseInt(getValue('ID')) : 0;
          return id < 1 ? true : false;
        },
      },
    ];

    let formconfig: SmartFormNewConfig = {
      name: 'Document Types form',
      SmartFields: form_fileds,
    };
    return formconfig;
  }

  openForm(data: any = null) {
    if (data != null) {
      this.formData = data;
    } else {
      this.formData = {};
    }
    let options = {
      title: 'Document Type',
      template: this.createform,
    };
    let dialog_options = default_form_dialog(options);
    dialog_options.width = 70;
    this.smartDialog.openDialog(dialog_options);
  }

  submitData(data) {
    this.api.smartPost('DOC_INSERT', data).subscribe((res: any) => {
      this.smartDialog.closeDialog();
      this.notify.success('Submitted successfully');
      this.getTableData();
    });

  }

  openEditForm(data) {
    let id = data.ID !== undefined ? data.ID : 0;
    let get_one = get_api_route("DOC_GET_ONE");
    this.api.smartPost(get_one,{id:id}).subscribe((res: any) => {      
      // this.formData = res;
      this.openForm(res);
    });
  }



  

updateDate(data) {
  let id = data.ID !== undefined ? data.ID : 0;
  let update_url = get_api_route('DOC_UPDATE');
  data['id'] = id;
  this.api.smartPost(update_url, data).subscribe((res: any) => {
    //  console.log('data ', res);
    this.notify.success('Updated successfully');
    this.smartDialog.closeDialog();
    this.getTableData();
  });
}


delete_one(){
  let deleteUrl = get_api_route("DOC_DELETE_ONE");
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
