import { Component, Input, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { get_api_route } from 'src/app/api-services/api-router';
import { SmartapiService } from 'src/app/api-services/smartapi.service';
import { SmartFormField, SmartFormNewConfig } from 'src/app/shared/core/SmartInterfaces/SmartFormNewInterface';
import { SmartTableColumnConfig, SmartTableConfig, SmartTableMainConfig } from 'src/app/shared/core/SmartInterfaces/SmartTableNewInterface';
import { default_delete_dialog, default_form_dialog, default_iframe_dialog } from '../../helpers/site-defaults';
import { SmartDialogService } from 'src/app/shared/core/services/smart-dialog.service';
import { NotifyService } from 'src/app/api-services/common/notify.service';

declare const window: any;

@Component({

  selector: 'app-site-circular',
  templateUrl: './site-circular.component.html',
  styleUrls: ['./site-circular.component.css']
})
export class SiteCircularComponent {

  @ViewChild('createform') createform: any;
  @Input() source:any;
  constructor(
    private modalService: NgbModal, 
    private api: SmartapiService, 
    private smartDialog:SmartDialogService,
    private notify: NotifyService,
    
    
    ) {}
  tableData:any;
  //
  tableConfigNew: SmartTableConfig;

  formData:any;

  selectedId:number = 0;

   
  ngOnInit(): void {
    console.log(this.source)
    this.createTable();
    this.getTableData();
   
  }

  createTable() {
    let table_config: SmartTableMainConfig = {
      name: 'VendorsDetails',
      title: 'Vendors Details',
      table_class: "smart-responsive",     
      showentries: this.source?false:true,
      currentpage: true,      
      pagination: this.source?false:true,     
      showEntriesClass: "is-8",
      search_bar_placeholder: "Search Circular",
      searchBarClass: "is-4 ",
      search:true, 
      buttonBarClass: "is-1 d-flex justify-content-end",
      no_results:{
        title:"No Forms",
        icon:"fa-file",
        sub_title:"Click on Add form to add Forms"
      }

    };

    let table_body_config: SmartTableColumnConfig[] = [
      {
        type: 'sno',
        title: 'S.No',
        tbody: 'sno',
        width:'5%',
      }, 
      {
        type: 'db',
        title: 'Title',
        tbody: 'form_name',
        width:'70%'
      }, 
      // {
      //   type: 'buttons',
      //   title: 'View',
      //   width:'5%',
      //   btn_config: [
      //     {
      //       type: 'button',
      //       label: '',
      //       class: [ 'is-small has-text-link'],            
      //       btn_type: 'icon',
      //       icon: ['fa fa-file-pdf-o fa-lg'],
      //       btn_func: (data) => {             
      //          this.openPdfView(data);
      //       }
      //     },          
      //   ],
      // },     
    ];
    
    let delete_button:SmartTableColumnConfig =  {
      type: 'buttons',
      title: 'Delete',
      width:'5%',
      btn_config: [
        {
          type: 'button',
          label: '',
          class: [ 'is-small has-text-danger'],            
          btn_type: 'icon',
          icon: ['fa fa-trash'],
          btn_func: (data) => {             
            this.selectedId = data["ID"] !== undefined ? data["ID"] : 0;
            this.openDeleteCustomDialog();
          }
        },          
      ],
    };
    if(!this.source){
      table_body_config.push(delete_button);
    }

  this.tableConfigNew = {
      tableconfig: table_config,
      config: table_body_config,     
    };
}

createFormConfig() {
  let form_fileds: SmartFormField[] = [
    {
      type: "text",
      name: "form_name",
      width: 12,
      label: "Form Title",
      placeHolder:'Title',
      validations:[
        {
          type:"required",
          msg:"Form Name is Required"
        }
      ]    
    },
    // {
    //   type: "file",
    //   width: 12,
    //   label: "Browse the Form",
    //   name: "uploaded_file",
    //   leftIcon: "fa-user",
    //   placeHolder:'Browse File',
    //   validations:[
    //     {
    //       type:"required",
    //       msg:"Please Browse the File"
    //     },
    //     {
    //       type:"fileTypes",
    //       msg:"only Pdf is Required",
    //       fileTypes:["pdf","docx"]
    //     },
    //     {
    //       type:"fileSize",
    //       msg:"File size should be less tha 10 MB",
    //       max:10
    //     }
    //   ]     
    // },     
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
    },
  ];

  let formconfig: SmartFormNewConfig = {
    name: "Book List form",
    SmartFields: form_fileds
  }
  return formconfig;
}


openForm(data: any=null) {
  this.formData = data!==null ? data : {};
  let options = {
    title:"New Form",
    template:this.createform
  };
  let dialog_options = default_form_dialog(options);   

  this.smartDialog.openDialog(dialog_options)
}

delete_one(){
  let deleteUrl = get_api_route("FORMS_DELETE_ONE"); 
  this.api.smartPost(deleteUrl,{id:this.selectedId}).subscribe((data)=>{
    this.notify.success("Deleted successfully");
    this.getTableData();  
  })

}

openPdfView(data) {
  let id = data?.ID!==undefined ? data?.ID : 0;
  let options = {
    title:"PDF Viewer",
    iframe:get_api_route("FORMS_PDF")
  };
  let dialog_options = default_iframe_dialog(options);
  dialog_options.iframe_payload = {id:id};  
  this.smartDialog.openDialog(dialog_options)
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

submitData(data) {
  let formData = this.api.preparePostData(data);
  this.api.smartPost('FORMS_INSERT', formData,false,false,"multipart/form-data").subscribe((res: any) => {
    this.smartDialog.closeDialog();    
    this.notify.success("Form uploaded successfully");   
    this.getTableData();    
  });
}

  
openEditForm(data) {
  let id = data.ID !== undefined ? data.ID : 0;
  let get_one = get_api_route("FORMS_GET_ONE") + id;
  this.api.smartGet(get_one).subscribe((res: any) => {   
    this.openForm(res);
  });
}

updateDate(data) {
  let id = data.ID !== undefined ? data.ID : 0;
  let update_url = get_api_route("FORMS_UPDATE") + id;
  this.api.smartPost(update_url, data).subscribe((res: any) => {
    //  console.log('data ', res);
    this.smartDialog.closeDialog();
   
  });
}

getTableData() {
  this.api.smartGet('FORMS_GET_ALL').subscribe((res: any) => {
    this.tableData = res;
  });
}


}
