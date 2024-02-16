import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifyService } from 'src/app/api-services/common/notify.service';
import { SpinnerService } from 'src/app/api-services/common/spinner.service';
import { SessionStorageServiceService } from 'src/app/api-services/core/session-storage-service.service';
import { SmartapiService } from 'src/app/api-services/smartapi.service';
import { SmartCarouselConfig } from 'src/app/shared/core/SmartInterfaces/SmartCarouselInterface';
import { SmartFormField, SmartFormNewConfig } from 'src/app/shared/core/SmartInterfaces/SmartFormNewInterface';
import { SmartDialogService } from 'src/app/shared/core/services/smart-dialog.service';
import { default_form_dialog } from '../helpers/site-defaults';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  isActiveClass:any='signin'
  formName: string = 'login';
  otp_code_id:string = "0";
  resetData:any;
  loginData:any;
  sendOtpButtonEnable:boolean =true;
  @ViewChild('createform') createform: any;
  @ViewChild('resetPassFirstForm') resetPassFirstForm:any;
  // images template
  @ViewChild('imageTemplate_1', { static: true }) imageTemplate_1: TemplateRef<any>;
  @ViewChild('imageTemplate_2', { static: true }) imageTemplate_2: TemplateRef<any>;

  @ViewChild('login_user', { static: true }) login_user: TemplateRef<any>;
  @ViewChild('login_another', { static: true }) login_another: TemplateRef<any>;

  carouselItems = [1, 2, 3]; 
  siteSettings:any;
  //
  user_data:any;

  carousal_items:SmartCarouselConfig;

  carousal_templates = [
    { name: 'template1', content: 'This is template 1 content.' },
    { name: 'template2', content: 'This is template 2 content.' },
    { name: 'template3', content: 'This is template 3 content.' }
  ];

  constructor(
    private route: Router,
    private spinner: SpinnerService,
    private api: SmartapiService,
    private notify: NotifyService,
    private userSession: SessionStorageServiceService,
    private modalService: NgbModal,
    private smartDialog:SmartDialogService,
  ) {
     console.log("login componeent loaded ");

  }

  ngOnInit(): void {
    this.getSettingsData();
    this.getActivity();
   // this.getConfig();
     this.user_data = this.userSession.getUserNames();
     if(this.user_data){
        this.loginData = {euserid:this.user_data.username};
        this.getUserData();
     }
     //console.log("user_data ", this.user_data);
  }

  clearUser(){
    this.user_data = null;
    this.loginData = {euserid:""};
  }

  

  getSettingsData() {
    this.api.smartGet('AUTH_SITE_SETTINGS').subscribe((res: any) => {
      this.siteSettings = res;
      this.userSession.setSettings(res);
    });
  }

  getUserData() {
   // console.log("d ", this.user_data);
    let id = this.user_data?.id;
    this.api.smartPost("USER_GET_ONE_IMAGE", { id: id }).subscribe((res: any) => {  
      this.user_data["profile"] = res?.img;
      //console.log("image " ,  res?.img)   
     // this.formData = res;
      //this.openForm();
    });  
  }

  getActivity(){
    let data = [];
    this.api.smartGet("ACTIVITY_GET_ALL").subscribe((res: any) => {  
      res.forEach(element => {
        data.push({
          image:element.activity_image,
          title:element.activity_title,
          desc:element.activity_desc
        });
      }); 
      this.getConfig(data);

    }); 

   
  }


 /**
  * 
  * 
  * @returns 
  */
  getConfig(data){
    let config:SmartCarouselConfig = {
      type:"SLIDER",
      data:data
      /*
      data:[
        {
          image:"../assets/images/bg-1.jpg",
          title:"activiti-1",
          desc:"tersting"
        },
        {
          image:"../assets/images/bg-2.jpg",
          title:"activiti-2",
          desc:"tersting"
        }
      ]*/
    }
    this.carousal_items = config;
    //return config;
  }
 
  process_login(res){
    this.userSession.setUser(res);
    let data = {username:res.euserid,name:res.ename,id:res.id};
    this.userSession.saveUserNames(data);
    let role = res["role"]!==undefined ? res["role"] : "USER";
    this.notify.success('Logged in successfully');
    if(role=="USER"){
      this.route.navigate(['sub-view']);
    }else{
      this.route.navigate(['sub-view']);
    }
  }
   
  /**
   *
   * @param data
   */
  loginSubmit(data) {
    this.api.smartPost('LOG_IN', data).subscribe((res: any) => {
      let changePass = res["change_pass"]!==undefined ? res["change_pass"] : 0;
      if(changePass==0){
        this.notify.success('Please Reset the Password');
        this.openFirstRestForm(res);
      }else{
        this.process_login(res);
      }
     
    });
  }

  registerButtonClick(){
    this.formName="register";
  }

  registerSubmit(data) {
    data['emailid'] = 'test@gmail.com';
    this.api.smartPost('AUTH_REGISTER', data).subscribe((res: any) => {
      this.notify.success('User Registered Successfully');
      this.route.navigate(['/']);
      this.formName = "login";
      this.isActiveClass='signin'
    });
  }

  forgotSubmit(data) {
    this.api.smartPost('AUTH_OTP', data).subscribe((res: any) => {
      this.notify.success('OTP Send to Mobile Number');
      this.otp_code_id = res?.otp_code;
     // this.route.navigate(['/']);
      this.formName = "reset";
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

 
 


  getActiveClass(event:any){
    if(event=='signup'){
      this.isActiveClass='signup'
    }else{
      this.isActiveClass='signin'
    }
  }

  openForm(data: any = {}) {   
   this.modalService.open(this.createform, { size: 'lg' });
 }

  createLoginFormConfig() {
    // console.log("t = ",this.newUserTemplate);
    let form_fields: SmartFormField[] = [
      {
        type: 'text',
        width: 12,
        name: 'euserid',       
        label: 'Employee ID',
        rightIcon: 'fa-user',
       // placeHolder: 'UserName',
        validations: [
          {
            type: 'required',
            msg: 'Please Enter ICNO',
          },
        ],
        hideFunction:(item:any,data:any)=>{
          return this.user_data===null ? false: true;
        }   
      },
      {
        type: 'template',
        width: 12,
        name: 'euserid_temp',       
        label: '',
        template:this.login_user,
        fieldClass:"smart-login-avtar",
        hideFunction:(item:any,data:any)=>{
          return this.user_data===null ? true : false;
        }       
      },

      {
        type: 'password',
        label: 'Password',
        width: 12,
        name: 'epassword',       
        rightIcon: 'fa-eye',
        fieldClass:"smart-login-password",
        validations: [
          {
            type: 'required',
            msg: 'Please Enter Password',
          },
        ],
      },
      {
        type: 'template',
        width: 12,
        name: 'euserid_another',       
        label: '',
        fieldClass:"pt-0",
        template:this.login_another
           
      },     
      {
        type: 'button',
        label: 'Login',
        name: 'login',
        width: 12,
        buttonClass: 'smart-action-button is-fullwidth my-5, ',
        buttonType: 'button',
        buttonSubmitType: 'submit',
        leftIcon:"fa fa-right-to-bracket",
        buttonFunction: (data: any) => {
          this.loginSubmit(data);
        },
      },
      
    ];
    let formconfig: SmartFormNewConfig = {
      name: 'Category form',
      SmartFields: form_fields,
     // fieldIndicationType:'label'
    };
    return formconfig;
  }

  // createForgotFormConfig() {
  //   let form_fileds: SmartFormField[] = [
  //     {
  //       type: 'text',
  //       label: 'MobileNumber',
  //       width: 12,
  //       name: 'mobile_no',
  //       leftIcon: 'fa-mobile',
  //       validations: [
  //         {
  //           type: 'required',
  //           msg: 'Please Enter Mobilenumber',
  //         },
  //         {
  //           type: 'minLength',
  //           msg: 'minium 10 characters',
  //           min: 10,
  //         },
  //         {
  //           type: 'maxLength',
  //           msg: 'minium 10 characters',
  //           max: 10,
  //         },
  //       ],
  //     },
  //     {
  //       type: 'button',
  //       label: 'Send OTP',
  //       name: 'SendOTP',
  //       width: 12,
  //       buttonClass: 'smart-action-button is-fullwidth',
  //       buttonType: 'button',
  //       buttonSubmitType: 'submit',
  //       buttonFunction: (data: any) => {
  //         this.forgotSubmit(data);
  //         this.resetData = data;
  //         this.formName="reset";
  //       },
  //     },
  //   ];
  //   let formconfig: SmartFormNewConfig = {
  //     name: 'Category form',
  //     SmartFields: form_fileds,
  //   };
  //   return formconfig;
  // }

  createFirstResetFormConfig() {
    let form_fileds: SmartFormField[] = [
      {
        type: 'text',
        width: 12,
        name: 'ename',
        label: 'Name',
        leftIcon: ' fa-phone-square',       
        disabled_func: true,      
      },
      {
        type: 'text',
        width: 12,
        name: 'euserid',
        label: 'ICNO',
        leftIcon: ' fa-phone-square',       
        disabled_func: true,      
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
        name: 'confirmPassword',
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

  openFirstRestForm(data: any=null) {
    this.resetData = data!==null ? data : {};
    let options = {
      title:"Reset Password",
      template:this.resetPassFirstForm
    };
    let dialog_options = default_form_dialog(options);  
   // dialog_options.width = 90;
    this.smartDialog.openDialog(dialog_options)
  }

  resetPassword(data){   
    this.api.smartPost('AUTH_USER_FIRST_PASS_RESET', data).subscribe((res: any) => {
      this.notify.success('Password Reset Successfully');    
      this.process_login(res);
      this.smartDialog.closeDialog();
    });   
  }



}





