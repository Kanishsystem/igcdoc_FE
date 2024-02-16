import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from 'src/app/api-services/common/common.service';
import { NotifyService } from 'src/app/api-services/common/notify.service';
import { SmartapiService } from 'src/app/api-services/smartapi.service';
import { SmartFormField, SmartFormNewConfig } from 'src/app/shared/core/SmartInterfaces/SmartFormNewInterface';
import { SmartTableColumnConfig, SmartTableConfig, SmartTableMainConfig } from 'src/app/shared/core/SmartInterfaces/SmartTableNewInterface';
import { SmartDialogService } from 'src/app/shared/core/services/smart-dialog.service';
import { default_delete_dialog, default_form_dialog } from '../../helpers/site-defaults';
import { get_api_full_route, get_api_route } from 'src/app/api-services/api-router';

@Component({
  selector: 'app-awards',
  templateUrl: './awards.component.html',
  styleUrls: ['./awards.component.css']
})
export class AwardsComponent {

  @ViewChild('createform') createform: any
  @ViewChild('employeesTemplate', { static: true }) employeeTemplate: TemplateRef<any>;
  @Input("mode") mode:string;
  
  @ViewChild('imageTemplate', { static: true })  imageTemplate: TemplateRef<any>;
  @ViewChild('adminTemplate', { static: true }) adminTemplate: TemplateRef<any>;


  constructor(
    private modalService: NgbModal,
    private api: SmartapiService,
    private smartDialog: SmartDialogService,
    private notify: NotifyService,
    private common: CommonService,


  ) { }



  tableData: any;
  //
  tableConfigNew: SmartTableConfig;

  formData: any;
  //
  selectedId: number = 0;
  //
  currentYear: number = 2023;

  imageUrl = "";

  ngOnInit(): void {
    this.imageUrl = get_api_full_route("SITE_AWARDS_GET_IMAGE")
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
      pagination: true,
      search:true, 
      showEntriesClass: "is-8",
      search_bar_placeholder: "Search Activities",
      searchBarClass: "col-6 ",
      buttonBarClass: "col-6 d-flex justify-content-end",

    };


    let table_body_config: SmartTableColumnConfig[] = [
      {
        type: 'sno',
        title: 'S.No',
        tbody: 's_no',
        width: '2%',
      },
      {
        type: 'db',
        title: 'Description',
        tbody: 'title',
        width: '20%'
      },
      {
        type: 'date',
        title: 'Award Date',
        tbody: 'award_date',
        width: '20%',
        customFormat: true,
        format: 'dd-MM-YYYY',
      },

      {
        type: 'template',
        title: 'Image',
        tbody: 'members_role_id',
        width: '40%',
        template: this.imageTemplate,
      },
      {
        type: 'buttons',
        title: 'Actions',
        width: '5%',
        btn_config: [
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
      filterConfig: this.getAdminFilter(),
      filterData: {
        from_date: this.common.addDays(-30),
        to_date: this.common.currentDate(),
      },

    };
  }
  getAdminFilter() {
    let filterConfig: SmartFormField[] = [
      {
        type: 'text',
        width: 12,
        name: 'activity_title',
         label: 'Activity Title',
        // leftIcon: 'fa-user',
        placeHolder: 'activity title',
      },


    ];
    return filterConfig;
  }

  createFormConfig() {
    let form_fileds: SmartFormField[] = [
      // {
      //   type: "text",
      //   name: "title",
      //   width: 12,
      //   label: "Awards Title",
      //   // leftIcon: "fa fa-file-signature",
      //   placeHolder: 'Awards Title',
      //   validations: [
      //     {
      //       type: "required",
      //       msg: "Award Title is Required"
      //     },

      //   ]

      // },


 
     

      {
        type: "textarea",
        name: "title",
        width: 12,
        label: "Description",
        // leftIcon: "fa fa-file-signature",
        placeHolder: 'Description',
        validations: [
          {
            type: "required",
            msg: "Description  is Required"
          },
          {  
          type: "maxLength",
          msg: "Maximum Allowed 500 Digits Only",
          max: 500
          }
  

        ]

      },
      {
        type: "date",
        name: "award_date",
        width: 6,
        label: "Award Date",
        leftIcon: "fa fa-calendar",
        placeHolder: 'Date',
        validations: [
          {
            type: "required",
            msg: "From Date is Required"
          }
        ]

      },
      {
        type: 'file',
        width: 12,
        label: 'Browse the Image',
        name: 'uploaded_file',
        leftIcon: 'fa fa-file',
        placeHolder: 'Browse File',
        validations: [        
          {
            type: 'fileTypes',
            msg: 'only png/jpeg is Required',
            fileTypes: ['png', 'jpeg','jpg'],
          }       
        ],
      },




      {
        type: 'button',
        label: 'Add',
        name: 'Submit',
        width: 18,
        buttonClass: 'smart-action-button is-fullwidth',
        buttonType: 'button',
        buttonSubmitType: 'submit',
        leftIcon: "fa-check",
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
        leftIcon: "fa-check",
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
      name: "Role list form",
      SmartFields: form_fileds
    }
    return formconfig;
  }


  openForm(data: any = null) {
  

    let options = {
      title: 'New Awards',
      template: this.createform,
    };
    let dialog_options = default_form_dialog(options);
    dialog_options.width = 70;
    this.smartDialog.openDialog(dialog_options);
  }

  openEditForm(data) {
    let id = data.ID !== undefined ? data.ID : 0;
    let get_one = get_api_route("SITE_AWARDS_GET_ONE");
    this.api.smartPost(get_one, { id: id }).subscribe((res: any) => {
       this.formData = res;
      this.openForm();
    });
  }



  getTableData() {
    this.api.smartGet('SITE_AWARDS_GET_ALL').subscribe((res: any) => {
      this.tableData = res;
    });
  }


  // submitData(data) {
  //   this.api.smartPost('SITE_AWARDS_INSERT', data).subscribe((res: any) => {
  //     this.smartDialog.closeDialog();
  //     this.notify.success("Submitted successfully");
  //     this.getTableData();
  //   });
  // }
  submitData(data) {
    let formData = this.api.preparePostData(data);
    formData.append('uploaded_file', data['uploaded_file']);
    this.api
      .smartPost(
        'SITE_AWARDS_INSERT',
        formData,
        false,
        false,
        'multipart/form-data'  
      )
      .subscribe((res: any) => {
        this.smartDialog.closeDialog();
        this.notify.success('Submitted successfully');
        this.getTableData();
      });
  }


  updateDate(data) {
    let id = data.ID !== undefined ? data.ID : 0;
    let update_url = get_api_route("SITE_AWARDS_UPDATE");
    data["id"] = id;
    this.api.smartPost(update_url, data).subscribe((res: any) => {
      //  console.log('data ', res);
      this.notify.success("Updated successfully");
      this.smartDialog.closeDialog();
      this.getTableData();
    });
  }
  delete_one() {
    let deleteUrl = get_api_route("SITE_AWARDS_DELETE_ONE");
    this.api.smartPost(deleteUrl, { id: this.selectedId }).subscribe((data) => {
      this.notify.success("Deleted successfully");
      this.getTableData();
    })
  }


  openDeleteCustomDialog() {
    let dialog_options = default_delete_dialog("Do you want to Delete?", "The Action Cannot Be Reverted");
    this.smartDialog.openDialog(dialog_options)
      .confirmed.subscribe((data) => {
        if (data.action == "yes") {
          this.delete_one();
        }
      });
  }


}
