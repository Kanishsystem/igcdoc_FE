import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NotifyService } from 'src/app/api-services/common/notify.service';
import { SpinnerService } from 'src/app/api-services/common/spinner.service';
import { SessionStorageServiceService } from 'src/app/api-services/core/session-storage-service.service';
import { SmartapiService } from 'src/app/api-services/smartapi.service';
import {
  SmartFormField,
  SmartFormNewConfig,
} from 'src/app/shared/core/SmartInterfaces/SmartFormNewInterface';

@Component({
  selector: 'app-smart-login',
  templateUrl: './smart-login.component.html',
  styleUrls: ['./smart-login.component.css'],
})
export class SmartLoginComponent {
  @ViewChild('newUserTemplate', { static: true })
  newUserTemplate: TemplateRef<any>;
  formName: string = 'login';
  otp_code_id: string = '0';
  resetData: any;
  sendOtpButtonEnable: boolean = true;
  constructor(
    private route: Router,
    private spinner: SpinnerService,
    private api: SmartapiService,
    private notify: NotifyService,
    private userSession: SessionStorageServiceService
  ) {}

  ngOnInit(): void {}

  /**
   *
   * @param data
   */
  loginSubmit(data) {
    this.api.smartPost('LOG_IN', data).subscribe((res: any) => {
      this.userSession.setUser(res);
      let role = res['role'] !== undefined ? res['role'] : 'USER';
      this.notify.success('Logged in successfully');
      if (role == 'USER') {
        this.route.navigate(['sub-view']);
      } else {
        this.route.navigate(['sub-view']);
      }
    });
  }

  registerButtonClick() {
    this.formName = 'register';
  }

  registerSubmit(data) {
    data['emailid'] = 'test@gmail.com';
    this.api.smartPost('AUTH_REGISTER', data).subscribe((res: any) => {
      this.notify.success('User Registered Successfully');
      this.route.navigate(['/']);
      this.formName = 'login';
    });
  }

  forgotSubmit(data) {
    this.api.smartPost('AUTH_OTP', data).subscribe((res: any) => {
      this.notify.success('OTP Send to Mobile Number');
      this.otp_code_id = res?.otp_code;
      // this.route.navigate(['/']);
      this.formName = 'reset';
    });
  }
  /**
   *
   * @param data
   */
  sendRegisterOtp(data) {
    this.api.smartPost('AUTH_OTP', data).subscribe((res: any) => {
      this.notify.success('OTP Send to Mobile Number');
      this.otp_code_id = res?.otp_code;
      this.sendOtpButtonEnable = false;
      // this.route.navigate(['/']);
      //this.formName = "reset";
    });
  }

  resetPassword(data) {
    data['otp_code_id'] = this.otp_code_id;
    this.api.smartPost('AUTH_PASS_RESET', data).subscribe((res: any) => {
      this.notify.success('Password Reset Successfully');
      this.formName = 'login';
    });
  }

  createLoginFormConfig() {
    // console.log("t = ",this.newUserTemplate);
    let form_fields: SmartFormField[] = [
      {
        type: 'text',
        width: 12,
        name: 'username',
        label: 'UserName',
        leftIcon: 'fa-user',
        placeHolder: 'UserName',
        validations: [
          {
            type: 'required',
            msg: 'Please Enter Username',
          },
        ],
      },

      {
        type: 'password',
        label: 'Password',
        width: 12,
        name: 'password',
        leftIcon: 'fa-unlock-alt',
        validations: [
          {
            type: 'required',
            msg: 'Please Enter Password',
          },
        ],
      },
      {
        type: 'buttons',
        width: 12,
        name: '',
        buttons: [
          {
            type: 'button',
            label: 'Forgot Password ?',
            class: ['has-text-danger'],
            btn_type: 'link',

            btn_func: (data) => {
              this.formName = 'forgot';
            },
          },
        ],
      },
      {
        type: 'button',
        label: 'Login',
        name: 'login',
        width: 12,
        buttonClass: 'smart-action-button is-fullwidth',
        buttonType: 'button',
        buttonSubmitType: 'submit',
        leftIcon:"fa-file",
        buttonFunction: (data: any) => {
          this.loginSubmit(data);
        },
      },
    ];
    let formconfig: SmartFormNewConfig = {
      name: 'Category form',
      SmartFields: form_fields,
    };
    return formconfig;
  }

  createForgotFormConfig() {
    let form_fileds: SmartFormField[] = [
      {
        type: 'text',
        label: 'MobileNumber',
        width: 12,
        name: 'mobile_no',
        leftIcon: 'fa-mobile',
        validations: [
          {
            type: 'required',
            msg: 'Please Enter Mobilenumber',
          },
          {
            type: 'minLength',
            msg: 'minium 10 characters',
            min: 10,
          },
          {
            type: 'maxLength',
            msg: 'minium 10 characters',
            max: 10,
          },
        ],
      },
      {
        type: 'button',
        label: 'Send OTP',
        name: 'SendOTP',
        width: 12,
        buttonClass: 'smart-action-button is-fullwidth',
        buttonType: 'button',
        buttonSubmitType: 'submit',
        buttonFunction: (data: any) => {
          this.forgotSubmit(data);
          this.resetData = data;
        },
      },
    ];
    let formconfig: SmartFormNewConfig = {
      name: 'Category form',
      SmartFields: form_fileds,
    };
    return formconfig;
  }

  createResetFormConfig() {
    let form_fileds: SmartFormField[] = [
      {
        type: 'text',
        width: 12,
        name: 'mobile_no',
        label: 'MobileNumber',
        leftIcon: ' fa-phone-square',
        placeHolder: 'MobileNumber',
        disabled_func: true,
        /*
        validations: [
          {
            type: 'required',
            msg: 'Please Enter Mobilenumber',
          },
          {
            type: 'minLength',
            msg: 'minium 10 characters',
            min: 10,
          },
          {
            type: 'maxLength',
            msg: 'minium 10 characters',
            max: 10,
          },
        ],*/
      },

      {
        type: 'text',
        label: 'OTP',
        width: 12,
        name: 'otp_code',
        leftIcon: 'fa-envelope-o',
        validations: [
          {
            type: 'required',
            msg: 'Please Enter OTP',
          },
          {
            type: 'minLength',
            msg: 'minium 6 Digit',
            min: 6,
          },
          {
            type: 'maxLength',
            msg: 'minium 6 Digit',
            max: 6,
          },
        ],
      },
      {
        type: 'password',
        width: 12,
        name: 'epassword',
        label: 'New Password',
        leftIcon: ' fa-key',
        placeHolder: 'New Password',
        validations: [
          {
            type: 'required',
            msg: 'Please Enter New Password',
          },
        ],
      },
      {
        type: 'password',
        width: 12,
        name: 'confirmpassword',
        label: 'Confirm Password',
        leftIcon: ' fa-key',
        placeHolder: 'Confirm Password',
        validations: [
          {
            type: 'required',
            msg: 'Please Enter Confirm Password',
          },
        ],
      },
      {
        type: 'button',
        label: 'Change Password',
        name: 'cp',
        width: 12,
        buttonClass: 'smart-action-button is-fullwidth',
        buttonType: 'button',
         buttonSubmitType: 'submit',
        buttonFunction: (data: any) => {
          this.resetPassword(data);          
        },
      },
    ];
    let formconfig: SmartFormNewConfig = {
      name: 'Category form',
      SmartFields: form_fileds,
    };
    return formconfig;
  }

  createRegisterFormConfig() {
    let form_fileds: SmartFormField[] = [
      {
        type: 'text',
        width: 6,
        name: 'ename',
        label: 'Name',
        leftIcon: 'fa-user',
        placeHolder: 'Name',
        //  horizontal: true,
        validations: [
          {
            type: 'required',
            msg: 'Please Enter Name',
          },
        ],
      },

      {
        type: 'text',
        width: 6,
        name: 'eusername',
        label: 'UserName',
        leftIcon: 'fa-user',
        placeHolder: 'UserName',
        // horizontal: true,
        validations: [
          {
            type: 'required',
            msg: 'Please Enter Username',
          },
        ],
      },

      {
        type: 'text',
        width: 6,
        name: 'referal_code',
        label: 'Referral Code ',
        leftIcon: 'fa-user-plus',
        placeHolder: 'Ex: EB000001',
        // horizontal: true,

        validations: [
          {
            type: 'minLength',
            msg: 'minium 8 characters',
            min: 8,
          },
          {
            type: 'maxLength',
            msg: 'minium 8 characters',
            max: 8,
          },
        ],
      },
      {
        type: 'password',
        width: 6,
        name: 'epassword',
        label: 'Password',
        leftIcon: ' fa-key',
        placeHolder: 'Password',
        // horizontal: true,
        validations: [
          {
            type: 'required',
            msg: 'Please Enter Password',
          },
        ],
      },
      {
        type: 'password',
        width: 6,
        name: 'confirmpassword',
        label: 'Confirm Password',
        leftIcon: ' fa-key',
        placeHolder: 'Confirm Password',
        //horizontal: true,
        validations: [
          {
            type: 'required',
            msg: 'Please Enter ConfirmPassword',
          },
        ],
      },
      {
        type: 'text',
        width: 6,
        name: 'mobile_no',
        label: 'MobileNumber',
        leftIcon: ' fa-phone-square',
        placeHolder: 'Mobile Number',
        // horizontal: true,
        validations: [
          {
            type: 'required',
            msg: 'Please Enter Mobilenumber',
          },
          {
            type: 'minLength',
            msg: 'minium 10 characters',
            min: 10,
          },
          {
            type: 'maxLength',
            msg: 'minium 10 characters',
            max: 10,
          },
        ],
      },

      {
        type: 'text',
        width: 6,
        name: 'otp_code',
        leftIcon: 'fa-envelope-o',
        // horizontal: true,
        label: 'OTP code',
        validations: [
          {
            type: 'required',
            msg: 'Please Enter OTP',
          },
          {
            type: 'minLength',
            msg: 'minium 6 Digit',
            min: 6,
          },
          {
            type: 'maxLength',
            msg: 'minium 6 Digit',
            max: 6,
          },
        ],
      },
      {
        type: 'button',
        label: 'Send OTP',
        name: 'cp',
        width: 6,
        buttonClass: 'is-link smart-button-form-label-less',
        buttonType: 'button',
        leftIcon:"fa-file",
       //  buttonSubmitType: 'submit',
        buttonFunction: (data: any) => {
            data['otp_type'] = 'REGISTER';
              this.sendRegisterOtp(data);         
        },
        buttonShowFunction:() => {
          return this.sendOtpButtonEnable;
        },
      },
      {
        type: 'button',
        label: 'Register',
        name: 'cp',
        width: 12,
        buttonClass: 'is-danger is-fullwidth',
        buttonType: 'button',
       //  buttonSubmitType: 'submit',
        buttonFunction: (data: any) => {
           data['otp_code_id'] = this.otp_code_id;
           this.registerSubmit(data);       
        },
        buttonShowFunction:() => {
          return this.sendOtpButtonEnable;
        },
      },
    ];
    let formconfig: SmartFormNewConfig = {
      name: 'Category form',
      SmartFields: form_fileds,
      errorType: 'TOPRIGHT',
    };
    return formconfig;
  }
}
