import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SecurityService } from 'src/app/api-services/common/security.service';
import { SpinnerService } from 'src/app/api-services/common/spinner.service';
import { SmartapiService } from 'src/app/api-services/smartapi.service';
import { SmartFormField, SmartFormNewConfig } from '../../core/SmartInterfaces/SmartFormNewInterface';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  isSubmitted: boolean = false;

  formName:string="login";

  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private spinner: SpinnerService,
    private api: SmartapiService,
  ) { }

  ngOnInit(): void {
    this.createLoginForm()
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      Email: [null, [Validators.required, Validators.maxLength(120)]],
      Password: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(15)]]
    })
  }

  get loginFormControls() {
    return this.loginForm.controls
  }

  onLogin() {
    this.isSubmitted =  true
    console.log(this.loginForm.value)
    debugger
    if(this.loginForm.valid){
      this.api.smartPost("LOG_IN",this.loginForm.value).subscribe((res: any) => {
        console.log(res)
        sessionStorage.setItem('user_data', JSON.stringify(res));
        this.route.navigate(['/usermaster'])
      });
    }
    }

    createFormConfig(){
      let form_fileds:SmartFormField[]=[
        {
          type:"text",
          width:6,
          name:"cat_name",
          label:"Category Name",
          leftIcon:"fa-user",
          placeHolder:"Category Name",       
        },
        
        {
          type:"text",
          label:"Category Price",
          width:6,
          name:"cat_price",
          leftIcon:"fa-inr",
          validations:[
            {
              type:"required",
              msg:"Please Enter Price"
            },
            
            {
              type:"min",
              msg:"Minimum Price is Rs 1",
              min:1
            },
            {
              type:"max",
              msg:"Maximum Price is Rs 1000",
              max:1000
            }
          ]
        },
        {
          type:"text",
          width:6,
          label:"Category Real Price",
          name:"cat_real_price",
          leftIcon:"fa-percent"
        },  
        {
          type:"text",
          width:6,
          label:"First Referral Percentage",
          name:"first_referal_percentage",
          leftIcon:"fa-percent"
        }, 
        {
          type:"text",
          width:6,
          label:"Second Referral Percentage",
          name:"second_referal_percentage",
          leftIcon:"fa-percent",
          validations:[
            {
              type:"required",
              msg:"Please Enter Category"
            }
          ]
        }, 
        {
          type:"text",
          width:6,
          label:"Third Referral Percentage",
          name:"third_referal_percentage",
          leftIcon:"fa-percent"
        },      
        {
          type:"buttons",
          width:4,
          label:"Book Desciption",
          name:"",
          buttons:[
            {
              type: 'button',
              label: 'Submit',
              class: ['is-primary is-fullwidth'],
              btn_type: 'button',
              icon: ['fa-plus'],
              formSubmitType:"submit",
              btn_func:(data)=>{
                 // console.log("data of form " , data);
                 // this.submitData(data);
              }
            },         
          ]
        }
      ];
      let formconfig:SmartFormNewConfig={
          name:"Category form",
          SmartFields:form_fileds
      }
      return formconfig;
    }

}
