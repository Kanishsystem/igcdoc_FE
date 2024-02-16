import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { get_api_route } from 'src/app/api-services/api-router';
import { CommonService } from 'src/app/api-services/common/common.service';
import { NotifyService } from 'src/app/api-services/common/notify.service';
import { SmartapiService } from 'src/app/api-services/smartapi.service';
import { SmartFormField } from 'src/app/shared/core/SmartInterfaces/SmartFormNewInterface';
import { SmartTableColumnConfig, SmartTableConfig, SmartTableMainConfig } from 'src/app/shared/core/SmartInterfaces/SmartTableNewInterface';
import { SmartDialogService } from 'src/app/shared/core/services/smart-dialog.service';
import { default_iframe_dialog } from '../../helpers/site-defaults';
import { SmartFileService } from 'src/app/shared/core/services/smart-file.service';

@Component({
  selector: 'app-all-document',
  templateUrl: './all-document.component.html',
  styleUrls: ['./all-document.component.css']
})
export class AllDocumentComponent {

  constructor(   
    private api: SmartapiService, 
    private smartDialog:SmartDialogService,
    private common: CommonService,
    private smartFile:SmartFileService
    ) {}

    docListData:any;
    //
    tabSelected: number=0;
    //
    tableConfigNew: SmartTableConfig;
    //
    tableData:any;
    //
    @ViewChild('doc_template', { static: true }) doc_template: TemplateRef<any>;

    docCat:any="Engineering";

    docCats:any =[
      "Engineering",
      "Science"
    ]
    docMainCat:number =1;
    docMainCatTypes=[
      {value:1,label:"Knowledge"},
      {value:2,label:"Work"},
      {value:3,label:"Drawings"},
    ];
    //selectOptions:any = ["Knowledge ","Work "];
  
    ngOnInit() {
      this.getDocTypes();
      this.createTable()
      
    }
    tabs:any;
    /*
    tabs = [
      { value: 'testing', label: 'Testing', icon: '' },
      { value: 'hitest', label: 'Hi Test', icon: '' },
      { value: 'document', label: 'Document Type-3', icon: '' },
    ];
    */


   
  createTable() {
    let table_config: SmartTableMainConfig = {
      name: 'alldocuments',
      title: 'Vendors Details',
      table_class: "smart-responsive",     
      // download:true,
      search: true,
      showentries: true,
      currentpage: true,
      pagination: true,
      colsearch: true, 
      showEntriesClass: "is-8",
      search_bar_placeholder: "Search Documents",
      searchBarClass: "is-4 ",
      buttonBarClass: "is-4 d-flex justify-content-end",
      no_results: {
        title: 'No Documents Found',
        sub_title: 'Create a New Document',
        icon: 'fa fa-file-text',
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
        type: 'db',
        title: 'Title',
        tbody: 'doc_title',
        width: '40%',
      }, 
      {
        type: 'db',
        title: 'Uploaded By',
        tbody: 'created_by',
        width: '10%',
      }, 
      {
        type: 'date',
        title: 'Date',
        tbody: 'created_time',
        width: '10%',
        customFormat: true,
        format: 'dd-MM-YYYY',
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
            icon: ['fa fa-eye'],
            btn_func: (data) => {
              console.log(data)              
              data.view_perm?this.openPdfView(data):'';              
            },
            btn_show:(data)=>{ 
              if(data["file_check"] && data["file_check"]==true && data["view_perm"] && data["view_perm"]==true ){
                return  true;
              }
              return false;
            }
          },
          {
            type: 'button',
            class: ['has-text-success', 'is-small'],
            btn_type: 'icon',
            icon: ['fa fa-download'],
            btn_func: (data) => {
              //console.log(data)
               this.downLoadFile(data.ID,data.doc_loc)
            },
            btn_show:(data)=>{
              if(data["file_check"] && data["file_check"]==true && data["download_perm"] && data["download_perm"]==true ){
                return  true;
              }
              return false;           
            }
          },


          
        ],
      },
      // {
      //   type: 'template',
      //   title: '',
      //   tbody: 'form_name',
      //   width:'100%',
      //   template:this.doc_template
      // },      
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
      name: 'doc_title',  
      label:'Document Title',     
      placeHolder: 'Document Title'
    },
    // {
    //   type: "select",
    //   name: "doc_type",
    //   width: 12,
    //   label: "Document Type",
    //   leftIcon: "fa fa-file",
    //   placeHolder: 'Please Select',
    //   selectOptionType: "api",
    //   selectOptionApi: "SITE_TYPE_GET_ALL_DOC_TYPES",     
    // },
    {
      type: 'date',
      width: 6,
      label:'From Date',
      name: 'from_date',
      rightIcon:"fa-calendar",    
      placeHolder: 'From Date',
      filterSettings:{
        type:"DATE_FROM",
        field_name:"created_time"
      } ,         
    },
    {
      type: 'date',
      width: 6,
      label:'To Date',
      name: 'to_date',
      rightIcon:"fa-calendar",   
      placeHolder: 'To Date',
      filterSettings:{
        type:"DATE_TO",
        field_name:"created_time"
      } ,         
    },



  ];
  return filterConfig;
}
getDocTypes(){
  let payload = {doc_category:this.docMainCat}
  let api_route = get_api_route('DOC_GET_ALL_SELECT');
  this.api.smartPost(api_route,payload).subscribe((res: any) => {     
     this.tabs = res;
     console.log(" tabs  " , this.tabs);
     this.getDocumentList();
  }); 
}

openPdfView(data) {
  let id = data?.ID!==undefined ? data?.ID : 0;
  let options = {
    title:"PDF Viewer",
    iframe:get_api_route("SITE_DOCUMENT_GET_DOC")
  };
  let dialog_options = default_iframe_dialog(options);
  dialog_options.iframe_payload = {id:id};  
  this.smartDialog.openDialog(dialog_options)
}



getDocumentList() {   
  this.api.smartPost( 'SITE_DOCUMENT_GET_ALL_DOC',{type:this.tabSelected,doc_main_cat:this.docMainCat }).subscribe((res: any) => {     
     //this.docListData = res;
     this.tableData = res;
     console.table(this.tableData)
   });
  }
 
  downLoadFile(id,fileName:string){
    let payload = {id:id};
    this.api.smartPost("SITE_DOCUMENT_GET_DOC",payload).subscribe((res:any)=>{
      this.smartFile.downLoadFile(res?.content, fileName);
   })
    
  }
  


}
