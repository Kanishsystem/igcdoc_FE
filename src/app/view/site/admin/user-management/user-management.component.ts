import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { get_api_route } from 'src/app/api-services/api-router';
import { NotifyService } from 'src/app/api-services/common/notify.service';
import { SmartapiService } from 'src/app/api-services/smartapi.service';
import { SmartDialogConfig } from 'src/app/shared/core/SmartInterfaces/SmartDialogInterface';
import { SmartFormField, SmartFormNewConfig } from 'src/app/shared/core/SmartInterfaces/SmartFormNewInterface';
import { SmartTableColumnConfig, SmartTableConfig, SmartTableMainConfig } from 'src/app/shared/core/SmartInterfaces/SmartTableNewInterface';
import { SmartDialogService } from 'src/app/shared/core/services/smart-dialog.service';
import { default_delete_dialog, default_form_dialog } from '../../helpers/site-defaults';
import { CommonService } from 'src/app/api-services/common/common.service';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent {


  @ViewChild('createform') createform: any
  @ViewChild('deleteForm') deleteForm: any;
  @ViewChild('viewForm') viewForm: any;
  @ViewChild('employeeImage', { static: true }) employeeImage: TemplateRef<any>;

  constructor(
    private modalService: NgbModal,
    private api: SmartapiService,
    private notify: NotifyService,
    private smartDialog: SmartDialogService,
    private common: CommonService


  ) { }

  tableData: any;
  //
  tableConfigNew: SmartTableConfig;
  //
  selectedId: number = 0;
  //
  formData: any;
  //
  viewData: any;
  //
  closeAlertSubject: Subject<any> = new Subject<any>();


  ngOnInit(): void {
    this.createTable();
    this.getTableData();

  }


  createTable() {
    let table_config: SmartTableMainConfig = {
      name: 'User-Details',
      title: 'Vendors Details',
      table_class: "smart-responsive",
      download: true,
      showentries: true,
      currentpage: false,
      pagination: true,
      colsearch: true,
      search:true, 
      showEntriesClass: "is-8",
      search_bar_placeholder: "Search User ",
      searchBarClass: "is-4",
      buttonBarClass: "is-1 d-flex justify-content-end",

    };

    let table_body_config: SmartTableColumnConfig[] = [
      {
        type: 'sno',
        title: 'S.No',
        tbody: 'sno',
        width: '5%',
      },
      {
        type: 'db',
        title: 'IC No',
        tbody: 'euserid',
        width: '10%',
      },
      {
        type: 'template',
        title: 'Name',
        tbody: '',
        width: '20%',
        template: this.employeeImage
      },
      {
        type: 'db',
        title: 'Intercom',
        tbody: 'intercome_number',
        width: '8%',
      },
      {
        type: 'db',
        title: 'Email',
        tbody: 'emailid',
        width: '15%',
      },
      // {
      //   type: 'db',
      //   title: 'Sec/Div/Group',
      //   tbody: 'org_id',
      //   width: '20%',
      // },

      {
        type: 'db',
        title: 'Designation',
        tbody: 'designation',
        width: '15%',
      },

      {
        type: 'tag',
        title: 'Status',
        tbody: 'active_status',
        width: '5%',
        tagCond: [
          { comp: "5", tagClass: "is-success  ", tagText: "Active" },
          { comp: "0", tagClass: "is-danger  ", tagText: "In-Active" },
          { comp: "10", tagClass: "is-danger  ", tagText: "Locked" }
        ]
      },
      {
        type: 'buttonsAction',
        title: 'Actions',
        width: '5%',
        btn_config: [
          {
            type: 'button',
            label: '',
            class: ['has-text-primary', 'is-small'],
            btn_type: 'icon',
            icon: ['fa-eye'],
            btn_func: (data) => {
              //console.log("data ", data);
              this.openViewForm(data)

            }
          },
          {
            type: 'button',
            label: '',
            class: ['has-text-link', 'is-small'],
            btn_type: 'icon',
            icon: ['fa-pencil-square-o'],
            btn_func: (data) => {
              //console.log("data ", data);
              this.openEditForm(data);
            }
          },
          {
            type: 'button',
            label: '',
            class: ['is-info', 'is-small'],
            btn_type: 'icon',
            icon: ["fa-lock"],
            btn_func: (data) => {
              this.selectedId = data["ID"] !== undefined ? data["ID"] : 0;
              this.openCustomDialog();
              // this.openDeleteForm();
            }
          },
          {
            type: 'button',
            label: '',
            class: ['has-text-danger', 'is-small'],
            btn_type: 'icon',
            icon: ['fa-trash'],
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

  admin_reset_password() {
    let deleteUrl = get_api_route("USER_ADMIN_RESET") ;
    this.api.smartPost(deleteUrl, {id:this.selectedId}).subscribe((data) => {
      this.notify.success("password reset successfully");
    })

  }

  openCustomDialog() {
    let dialog_options = default_delete_dialog("Do you want to Reset the Password ?", "The password will be reset to ICNO of the Employee");
    this.smartDialog.openDialog(dialog_options)
      .confirmed.subscribe((data) => {
        if (data.action == "yes") {
          this.admin_reset_password();
        }
      });
  }

  getAdminFilter() {
    let filterConfig: SmartFormField[] = [
      {
        type: 'text',
        width: 6,
        name: 'euserid',
        label: 'IC No',
        placeHolder: 'IC No'
      },
      {
        type: 'text',
        width: 6,
        name: 'ename',
        label: 'Name',
        placeHolder: 'Name'
      },
      {
        type: 'text',
        width: 6,
        name: 'intercome_number',
        label: 'Intercom Number',
        placeHolder: 'Intercom Number'
      },
      {
        type: 'text',
        width: 6,
        name: 'emailid',
        label: 'Email ID',
        placeHolder: 'Email ID '
      },
      {
        type: 'text',
        width: 6,
        name: 'sd_org_id',
        label: 'Sec/Div/Group',
        placeHolder: 'Sec/Div/Group '
      },
      {
        type: 'select',
        width: 6,
        name: 'active_status',
        label: 'Status',
        placeHolder: 'Please Select',
        selectOptionType: 'self',
        selectOptions: [
          { value: 5, label: "Active" },
          { value: 0, label: "In Active" },
          { value: 10, label: "Locked" },

        ]
      },
    ];
    return filterConfig;
  }




  createFormConfig() {
    let form_fileds: SmartFormField[] = [

      {
        type: "text",
        name: "euserid",
        width: 4,
        label: "IC No",
        leftIcon: "fa  fa-list-ol",
        placeHolder: 'IC No',
        allowedPattern: '[^0-9]*',
        disabled_func: (getValue: any) => {
          console.log("function " , getValue);
         
          let id = getValue('ID');
          return id > 0 ? true : false;
        },
        validations: [
          {
            type: "required",
            msg: "IC No is Required"
          },
          {
            type: 'maxLength',
            msg: 'maximum 10 characters',
            max: 10,
          },
          {
            type:"pattern",
            msg:"Please Enter Number Only ",
            pattern:"[0-9]*",
          },
          
        ]

      },
      {
        type: "text",
        name: "mobile_no",
        width: 4,
        label: "Mobile Number",
        leftIcon: "fa fa-mobile",
        placeHolder: 'Enter Mobile No',
        allowedPattern: '[^0-9]*',
     

      },
      {
        type: "text",
        name: "intercome_number",
        width: 4,
        label: "Intercom Number",
        leftIcon: "fa fa-phone",
        placeHolder: 'Intercom',
        allowedPattern: '[^0-9]*',
        validations: [
          {
            type: "required",
            msg: "Intercom Number is Required"
          },

          {
            type: "pattern",
            msg: "Please Enter Correct Intercom Number ",
            pattern: "[0-9]{5}",
          },
          {
            type: 'maxLength',
            msg: 'maximum 5 characters',
            max:5,
          },
        ]

      },

      {
        type: "text",
        name: "ename",
        width: 6,
        label: "Name",
        leftIcon: "fa fa-pencil",
        placeHolder: 'Name',
        validations: [
          {
            type: "required",
            msg: "Name is Required"
          },
          // {
          //   type:"pattern",
          //   msg:"Enter Your Email",
          //   pattern:"/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/"

          // }

        ]

      },
      {
        type: "text",
        name: "emailid",
        width: 6,
        label: "Email",
        leftIcon: "fa fa-envelope",
        placeHolder: 'Email',
        validations: [
          // {
          //   type: "required",
          //   msg: "Email is Required"
          // },
          {
            type: "pattern",
            msg: "Please Enter Valid Email",
            pattern: "^[a-zA-Z0-9._-]+@igcar\.gov\.in$"
          }
        ]

      },



      // {
      //   type: "text",
      //   name: "sec_div_group",
      //   width: 6,
      //   label: "Sec/Div/Group",
      //   leftIcon: "fa  fa-user-group",
      //   placeHolder: 'Group',
      //   validations: [
      //     {
      //       type: "required",
      //       msg: "Group is Required"
      //     }
      //   ]

      // },
      {
        type: "selectsearch",
        name: "sd_org_id",
        width: 6,
        label: "Sec/Div/Group",
      //  leftIcon: "fa fa-sitemap",
        placeHolder: 'Please Select',
        selectOptionType:"api",
        selectOptionApi:"ORG_GET_ALL_PARENT",
        validations: [
          {
            type: 'required',
            msg: 'Please Select Sec/Div/Group',
          },         
        ],

      },
     
      
      // {
      //   type: "select",
      //   width: 6,
      //   label: "Select Organization :",
      //   name: "sd_org_id",
      //   selectOptionType: 'api',
      //   selectOptionApi: "ORG_GET_ALL_PARENT",
      // },
      {
        type: "select",
        width: 6,
        name: "active_status",
        label: "Status",
        placeHolder: "Please Select ",
        selectOptionType: "self",
        selectOptions: [
          { value: 5, label: "Active" },
          { value: 0, label: "In Active" },
          { value: 10, label: "Locked" },
        ],
        validations: [
          {
            type: "required",
            msg: "Status is Required"
          }
        ]

      },


      {
        type: "selectsearchmultiple",
        name: "role",
        width: 6,
        label: "Select Role",
        selectOptionType: "api",
        selectOptionApi: "SITE_ROLE_GET_ALL_SELECT",
        selectOptions: [
          { value: "1", label: "1" },
          { value: "2", label: "2" },

        ],
      

      },

      {
        type: "text",
        name: "designation",
        width: 6,
        label: "Designation",
        leftIcon: "fa fa-id-card",
        placeHolder: 'Designation',
        validations: [
          {
            type: "required",
            msg: "Designation is Required"
          },

        ]

      },
      {
        type: "imagecrop",
        width: 6,
        name: "profile_img",
        label: "Profile Image",
        validations: [
          {
            type: "required",
            msg: "Please Browse Site Image"
          },
          {
            type:"imagesize",
            msg:"Uploaded image is size should be less than 30 Kb",
            // image size in mb
            max:0.3
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
        leftIcon: "fa-check",
        buttonFunction: (data: any) => {
          this.submitData(data);
          this.modalService.dismissAll();

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
          this.modalService.dismissAll();

        },
        hideFunction: (item: any, getValue: any) => {
          let id = getValue('ID') !== undefined ? parseInt(getValue('ID')) : 0;
          return id < 1 ? true : false;
        },
      },




    ];

    let formconfig: SmartFormNewConfig = {
      name: "Book List form",
      SmartFields: form_fileds,
      // formValidation:this.emailCustomValidator()
    }
    return formconfig;
  }


  openForm(data: any = null) {
    if(data!=null){
      this.formData = data
    }else{
      this.formData = {};
    }
    console.log("hello button clicked")
    // this.modalService.open(this.createform, { size: 'lg' });
    let options = {
      title: 'User Management System',
      template: this.createform,
    };
    let dialog_options = default_form_dialog(options);
    dialog_options.width = 70;
    this.smartDialog.openDialog(dialog_options);

  }
  getTableData() {
    this.api.smartGet('USER_GET_ALL').subscribe((res: any) => {
      this.tableData = res;
    });
  }


  submitData(data) {
   // console.log("data ", data);
    this.api.smartPost('USER_INSERT', data).subscribe((res: any) => {
      //  console.log('data ', res);
      this.smartDialog.closeDialog();
      this.notify.success("User Added successfully");
      this.getTableData();
    });
  }


  openEditForm(data) {
    let id = data.ID !== undefined ? data.ID : 0;
    let get_one = get_api_route("USER_GET_ONE");
    this.api.smartPost(get_one, { id: id }).subscribe((res: any) => {
      console.log("single data", res);
     // this.formData = res;
      this.openForm(res);
    });
  }

  updateDate(data) {
    let id = data.ID !== undefined ? data.ID : 0;
    let update_url = get_api_route("USER_UPDATE");
    data["id"] = id;
    this.api.smartPost(update_url, data).subscribe((res: any) => {
      //  console.log('data ', res);
      this.smartDialog.closeDialog();
      this.notify.success("Updated successfully");
      this.getTableData();
    });
  }
  viewform(data: any = null) {
    let options = {
      title: 'Details',
      template: this.viewForm,
    };
    let dialog_options = default_form_dialog(options);
    dialog_options.width = 60;
    this.smartDialog.openDialog(dialog_options);
    // console.log('hello button clicked');
    // this.modalService.open(this.viewform, { size: 'lg' });
  }
  openViewForm(data) {
    let id = data.ID !== undefined ? data.ID : 0;
    let get_one = get_api_route('USER_GET_ONE');
    this.api.smartPost(get_one, { id: id }).subscribe((res: any) => {
      console.log('single data', res);
      this.viewData = res;
      this.viewform(data);
    });
  }

  openDeleteForm(data: any = []) {
    //  this.formData = this.viewData;
    this.modalService.open(this.deleteForm, { size: 'lg' });
  }

  changePassword(event) {
    // console.log("result " , event);
    if (event == 'Yes') {
      this.passwordData();

      this.modalService.dismissAll();
      //  this.closeAlertSubject.next({ open: false });
    } else {
      this.modalService.dismissAll();
    }
  }

  passwordData() {
    let deleteUrl = get_api_route("USER_GET_ONE") + this.selectedId;
    console.log(deleteUrl);
    // this.api.smartGet(get_one).subscribe((res: any) => {
    //   //console.log("Res = " , res);
    //   this.notify.success("Password Change successfully");
    //   this.getTableData();
    // });
  }

  delete_one() {
    let deleteUrl = get_api_route("USER_DELETE_ONE");
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
