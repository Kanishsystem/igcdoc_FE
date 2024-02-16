import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from 'src/app/api-services/common/common.service';
import { NotifyService } from 'src/app/api-services/common/notify.service';
import { SmartapiService } from 'src/app/api-services/smartapi.service';
import { SmartFormField, SmartFormNewConfig } from 'src/app/shared/core/SmartInterfaces/SmartFormNewInterface';
import { SmartDialogService } from 'src/app/shared/core/services/smart-dialog.service';
import { default_delete_dialog, default_form_dialog, default_iframe_dialog } from '../helpers/site-defaults';
import { get_api_route } from 'src/app/api-services/api-router';

@Component({
  selector: 'app-org',
  templateUrl: './org.component.html',
  styleUrls: ['./org.component.css']
})
export class OrgComponent {
  @ViewChild('createform') createform: any;
  @ViewChild('orgTemplate', { static: true }) orgTemplate: TemplateRef<any>;
  // employeeform
  @ViewChild('employeeform', { static: true }) employeeform: TemplateRef<any>;
  @ViewChild('viewForm') viewForm: any;

  constructor(
    private modalService: NgbModal,
    private api: SmartapiService,
    private route: ActivatedRoute,
    private smartDialog: SmartDialogService,
    private common: CommonService,
    private notify: NotifyService,
    private el: ElementRef
  ) {}


  treeList:any;

  formData: any;
  //
  selectedId:number = 0;
  //
  mode: string = '';
  // selection list
  orgParent:any[];
 // 
  backEnable:boolean = false;
  // org employees
  orgEmployees:any =[];
  //
  orgSecItem:any;
  //
   //
   viewData: any;

  
  ngOnInit(): void {

    this.mode = this.route.snapshot.data.mode;
    console.log(this.mode)
    this.getOrgList();
    this.getTreeList();
  

  }


  ngAfterViewInit(){   
     const container = this.el.nativeElement.querySelector('.tree-container');
     container.scrollLeft = 240; // Scroll to position 200 pixels   
   }

  getOrgList(){
    this.api.smartGet('ORG_GET_ALL_PARENT').subscribe((res: any) => {
      console.log(res)
      this.orgParent = res;
    });
  }

  getOrgUsers(sd_org_id){
    let data = {sd_org_id:sd_org_id};   
    this.api.smartPost('USER_GET_ALL_ORG',data).subscribe((res: any) => {
    //  console.log(res)
      this.orgEmployees = res;
      this.openEmployeeForm()
    });
  }

  getParentLabel(sd_org_id){
      let obj = this.orgParent.filter((db)=>db.value==sd_org_id);
      return obj && obj[0]["label"] ? obj[0]["label"] : "";
  }
  

  createFormConfig() {
    let form_fileds: SmartFormField[] = [

      {
        type: "select",
        width: 6,
        label: "Select Organization Type:",
        name: "sd_org_type_id",
        selectOptionType: 'self',
        selectOptions: [
          { value: 20, label: "Unit" },
          { value: 18, label: "Group" },
          { value: 16, label: "Sub Group" },
          { value: 14, label: "Division" },
          { value: 12, label: "Section" },
          { value: 10, label: "Sub Section" },
        ],
        validations: [
          {
            type: 'required',
            msg: 'Org type is required',
          },
         
        ],
      },

      
      {
        type: "select",
        width: 6,
        label: "Select Organization Parent:",
        name: "sd_org_id",
        selectOptionType: 'self',
        selectOptions:this.orgParent
       // selectOptionApi: "ORG_GET_ALL_PARENT",
      },
      {
        type: "text",
        width: 6,
        label: "Enter Short Label:",
        name: "sd_org_short_label",
        validations: [
          {
            type: 'required',
            msg: 'Short Label is required',
          },         
        ],
        onChange:(getValue,setValue)=>{
          let value = getValue("sd_org_short_label");
          let parentId = parseInt(getValue("sd_org_id"));
          if(parentId >0){
            console.log("parent id  ", parentId);
          let parentLabel = this.getParentLabel(getValue("sd_org_id"));
          value = parentLabel + "/" + value;
          }
          setValue("sd_org_full_label", value);
           //console.log("form data " , setValue);
        }
      },
      {
        type: "text",
        width: 6,
        label: "Enter Full Label:",
        name: "sd_org_full_label",
        disabled_func:true,
        validations: [
          {
            type: 'required',
            msg: 'Full Label is required',
          },
         
        ],
      },
     

    
      
      {
        type: "text",
        width: 6,
        label: "Enter Description :",
        name: "sd_org_name",
        validations: [
          {
            type: 'required',
            msg: 'Description is required',
          },
         
        ],
      },

      
      // {
      //   type: 'text',
      //   name: 'sd_order',
      //   width: 6,
      //   label: 'Enter Order Number',
      //   leftIcon: 'fa fa-heading',
      //   placeHolder: 'Title',
      //   allowedPattern: '[^0-9]*',
      //   validations: [
      //     {
      //       type: 'required',
      //       msg: 'Order number  is Required',
      //     },
         
      //   ],
      // },
     

     


      {
        type: "select",
        width: 6,
        label: "Head Of Organization",
        name: "sd_mt_userdb_id",
        selectOptionType: 'api',
        selectOptionApi: "USER_GET_ALL_SELECT",
        validations: [
          {
            type: 'required',
            msg: 'Head of org is required',
          },
         
        ],
      },
      /*
      {
        type: "text",
        width: 6,
        label: "Organization Index:",
        name: "sd_org_id",
        validations: [
          {
            type: 'required',
            msg: 'Org number is required',
          },
         
        ],
      },
      */
    

      

      {
        type: 'button',
        label: 'Submit ',
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
      name: 'Role list form',
      SmartFields: form_fileds,
    };
    return formconfig;
  }

  openEmployeeForm() {  
    //console.log("orgsec " , this.orgSecItem);
    let options = {
      title: this.orgSecItem.sd_org_name,
      template: this.employeeform,
    };  
    let dialog_options = default_form_dialog(options);
    dialog_options.width = 70;
    this.smartDialog.openDialog(dialog_options);
  }


  openForm(data: any = null) {
    if(data!=null){
      this.formData = data
    }else{
      this.formData = {};
    }
    let options = {
      title: 'Organization Form',
      template: this.createform,
    };
  
    let dialog_options = default_form_dialog(options);
    dialog_options.width = 70;
    this.smartDialog.openDialog(dialog_options);
  }

  
  openEditForm(data) {
   // console.log("test",data)
    let id = data.ID !== undefined ? data.ID : 0;
    let get_one = get_api_route("ORG_GET_ONE");
    this.api.smartPost(get_one,{id:id}).subscribe((res: any) => {      
     // this.treeList = res;
      console.log("edit data ",res);
      // this.formData = res;
      this.openForm(res);
    });
  }
  getTreeList(id:number=0){
    this.api.smartPost('ORG_GET_ALL',{id:id}).subscribe((res: any) => {
      console.log(res)
      this.treeList = res;
      this.orgEmployees = [];
      this.orgSecItem = null;
    });
  }

  backToOrg(){
    this.backEnable=false;
    this.getTreeList(0);
  }

  orgClicked(item){
    //console.log("Data clicked " , item);
    if(item.sd_org_type_id==14){
      this.backEnable=true;
      this.getTreeList(item.ID);
    }else if(item.sd_org_type_id==12){
      //console.log("org users ")
      this.orgSecItem = item;
      this.getOrgUsers(item.ID);
    }
  }

  openPdfOrg(url) {
    //  let id = data?.ID !== undefined ? data?.ID : 0;
      let options = {
        title: "PDF Viewer",
        iframe: get_api_route(url)
      };
      let dialog_options = default_iframe_dialog(options);
      dialog_options.width = 90;
      dialog_options.iframe_payload = { id:1};
      this.smartDialog.openDialog(dialog_options)
    }

  // getTreeList(user=null) {   
  //   let id = user!=null?user:0
  //   let url = get_api_route('ORG_GET_ALL') + '/' + id;
  //   this.api.smartGet(url).subscribe((res: any) => {     
  //     console.log(res)
  //     this.treeList=res
  //   });
  // }



  submitData(data) {
    console.log('data ', data);
    this.api.smartPost('ORG_INSERT', data).subscribe((res: any) => {
      this.notify.success("Submitted successfully");
      this.getTreeList();
      this.getOrgList();
      this.smartDialog.closeDialog();
    });
  }

  updateDate(data) {
    let id = data.ID !== undefined ? data.ID : 0;
    let update_url = get_api_route('ORG_UPDATE');
    data["id"] = id;
    this.api.smartPost(update_url, data).subscribe((res: any) => {
      //  console.log('data ', res);
      this.notify.success("Updated successfully");
      this.smartDialog.closeDialog();
      this.getTreeList();
    });
  }

  delete_one(){
    let deleteUrl = get_api_route("ORG_DELETE_ONE");
    this.api.smartPost(deleteUrl,{id:this.selectedId}).subscribe((data)=>{
      this.notify.success("Deleted successfully");
      this.getTreeList();  
    })
  
  }
  
  
  openDeleteCustomDialog(id) {
    this.selectedId=id
    let dialog_options = default_delete_dialog("Do you want to Delete Form ?","The Action Cannot Be Reverted");
     this.smartDialog.openDialog(dialog_options)
      .confirmed.subscribe((data) => {
         if(data.action=="yes"){
            this.delete_one();
         }      
      });     
  }

  viewform() {
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
  openViewForm(id) {
   // let id = data.ID !== undefined ? data.ID : 0;
   console.log("view funtion ", id);
    let get_one = get_api_route('USER_GET_ONE');
    this.api.smartPost(get_one, { id: id }).subscribe((res: any) => {
      console.log('single data', res);
      this.viewData = res;
      this.viewform();
    });
  }

}
