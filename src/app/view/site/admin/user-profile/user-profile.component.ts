import { Component, ViewChild } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifyService } from 'src/app/api-services/common/notify.service';
import { SmartapiService } from 'src/app/api-services/smartapi.service';
import { SmartDialogService } from 'src/app/shared/core/services/smart-dialog.service';
import { SmartFormField, SmartFormNewConfig } from 'src/app/shared/core/SmartInterfaces/SmartFormNewInterface';
import { SmartTableColumnConfig, SmartTableConfig, SmartTableMainConfig } from 'src/app/shared/core/SmartInterfaces/SmartTableNewInterface';
import { default_form_dialog } from '../../helpers/site-defaults';
import { get_api_route } from 'src/app/api-services/api-router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  @ViewChild('createform') createform: any;
  //
  passData: any;
  //
  formData: any;
  //
  formNotifyMailData: any;
  //
  formNotifyPushData: any;
  //
  tableConfigNew: SmartTableConfig;
  //
  profileDetails: any;
  //
  selectedId: number = 0;

  constructor(
    private api: SmartapiService,
    private router: Router,
    private notify: NotifyService,
    private smartDialog: SmartDialogService,
  ) { }

  ngOnInit(): void {
    this.getProfileDetails();
  }

  getProfileDetails() {
      this.api.smartGet('USER_PROFILE').subscribe((res: any) => {
        this.profileDetails = res;
      });
  }

  openFileForm(data: any = null) {
    this.formData = this.profileDetails;
    // console.log("data",this.formData);
    let options = {
      title: "Update Personal Details",
      template: this.createform
    };
    let dialog_options = default_form_dialog(options);
    dialog_options.width = 70;
    this.smartDialog.openDialog(dialog_options)
  }

  // createFormConfig(...args: []) {
  //   let form_fileds: SmartFormField[] = [
  //     {
  //       type: 'imagecrop',
  //       name: 'profile_img',
  //       width: 10,
  //       label: 'Profile',
  //       horizontal: true,
  //     },
  //     {
  //       type: 'button',
  //       label: 'Update',
  //       name: 'Submit',
  //       horizontal: true,
  //       width: 12,
  //       buttonClass: 'smart-action-button is-fullwidth is-flex is-justify-content-center',
  //       buttonType: 'button',
  //       buttonSubmitType: 'submit',
  //       leftIcon: 'fa-check',
  //       buttonFunction: (data: any) => {
  //         this.updateData(data);
  //       },
  //     },
  //   ];
  //   let formconfig: SmartFormNewConfig = {
  //     name: 'Book List form',
  //     SmartFields: form_fileds,
  //   };
  //   return formconfig;
  // }
  createFormConfig() {
    let form_fileds: SmartFormField[] = [

  
     
      {
        type: "text",
        name: "intercome_number",
        width: 6,
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
        name: "mobile_no",
        width: 6,
        label: "Mobile Number",
        leftIcon: "fa fa-mobile",
        placeHolder: 'Enter Mobile No',
        allowedPattern: '[^0-9]*',
     

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
            type:"imagesize",
            msg:"Uploaded image is size should be less than 30 Kb",
            // image size in mb
            max:0.3
          }
        ]
      },


      // {
      //   type: 'button',
      //   label: 'Submit',
      //   name: 'Submit',
      //   width: 12,
      //   buttonClass: 'smart-action-button is-fullwidth',
      //   buttonType: 'button',
      //   buttonSubmitType: 'submit',
      //   leftIcon: "fa-check",
      //   buttonFunction: (data: any) => {
      //     this.submitData(data);
      //     this.modalService.dismissAll();

      //   },
      //   hideFunction: (item: any, getValue: any) => {
      //     let id = getValue('ID') !== undefined ? parseInt(getValue('ID')) : 0;
      //     return id > 0 ? true : false;
      //   },

      // },

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
           this.updateData(data);
          // this.modalService.dismissAll();

        },
        // hideFunction: (item: any, getValue: any) => {
        //   let id = getValue('ID') !== undefined ? parseInt(getValue('ID')) : 0;
        //   return id < 1 ? true : false;
        // },
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
      title: 'Update Personal Details ',
      template: this.createform,
    };
    let dialog_options = default_form_dialog(options);
    dialog_options.width = 90;
    this.smartDialog.openDialog(dialog_options);

  }

  // updateDate(data) {
  //   let id = data.ID !== undefined ? data.ID : 0;
  //   let update_url = get_api_route("USER_UPDATE");
  //   data["id"] = id;
  //   this.api.smartPost(update_url, data).subscribe((res: any) => {
  //     //  console.log('data ', res);
  //     this.smartDialog.closeDialog();
  //     this.notify.success("Updated successfully");
  //     // this.getTableData();
  //   });
  // }

  updateData(data) {
    this.api.smartPost("USER_RESET_PROFILE", data).subscribe((res: any) => {
      this.smartDialog.closeDialog();
      this.notify.success("Updated successfully");
      this.getProfileDetails();
    });
  }

  changepassword() {
    let form_fileds: SmartFormField[] = [
      {
        type: "password",
        width: 12,
        // horizontal: true,
        name: "currentPassword",
        label: "Current password",
        rightIcon: "fa-lock",
        placeHolder: "",
        allowedPattern: '^[0-9]',
        validations: [
          {
            type: "required",
            msg: "Please Enter Old Password"
          },
          {
            type: 'maxLength',
            msg: 'Maximum 10 characters',
            max: 10,
          },
          {
            type: 'minLength',
            msg: 'Minimum 4 characters',
            min: 4,
          },

          // {
          //   type: 'pattern',
          //   msg: 'Invalid Password',
          //   pattern: '"^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]$"'
          // },

        ]
      },

      {
        type: "password",
        label: "New Password",
        width: 12,
        // horizontal: true,
        name: "newPassword",
        rightIcon: "fa-eye",
        allowedPattern: '[^0-9]*',
        validations: [
          {
            type: "required",
            msg: "Please Enter New Password"
          },
          {
            type: "minLength",
            msg: "Minimum 4 Characters",
            min: 4,
          },
          {
            type: 'maxLength',
            msg: 'Maximum 10 characters',
            max: 10,
          },
          // {
          //   type: 'pattern',
          //   msg: 'Invalid Password',
          //   pattern: '"^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]$"'
          // },
        ]

      },
      {
        type: "password",
        label: "Confirm password",
        width: 12,
        // horizontal: true,
        name: "confirmPassword",
        rightIcon: "fa-eye",
        allowedPattern: '[^0-9]*',
        validations: [
          {
            type: "required",
            msg: "Please Enter Confirm Password"
          },
          {
            type: "minLength",
            msg: "Minimum 4 Characters",
            min: 4,
          },
          {
            type: 'maxLength',
            msg: 'Maximum 10 characters',
            max: 10,
          },
          {
            type: 'mismatch',
            msg: 'Password & Confirm Password Does Not Match',
          },
          // {
          //   type: 'pattern',
          //   msg: 'Invalid Password',
          //   pattern: '"^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]$"'
          // },
        ]
      },
      {
        type: 'button',
        label: 'Change Password',
        name: 'Submit',
        width: 12,
        buttonClass: 'smart-action-button is-fullwidth mt-5 m-5',
        buttonType: 'button',
        buttonSubmitType: 'submit',
        leftIcon: "fa-arrow-right",
        buttonFunction: (data: any) => {
          this.resetPassword(data);
        },
      },

    ];
    let formconfig: SmartFormNewConfig = {
      name: "",
      SmartFields: form_fileds,

    }
    return formconfig;

  }

  resetPassword(data) {
    this.api.smartPost("USER_RESET_PASS", data).subscribe((res: any) => {
      this.notify.success("Password Reset Successfully");
    });
  }

}
