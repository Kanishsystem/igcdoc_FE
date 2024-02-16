import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { get_api_route } from 'src/app/api-services/api-router';
import { CommonService } from 'src/app/api-services/common/common.service';
import { SmartapiService } from 'src/app/api-services/smartapi.service';
import { SmartFormField, SmartFormNewConfig, SmartValidationConfig } from 'src/app/shared/core/SmartInterfaces/SmartFormNewInterface';
import { SmartTableColumnConfig, SmartTableConfig, SmartTableMainConfig } from 'src/app/shared/core/SmartInterfaces/SmartTableNewInterface';
import { SmartDialogService } from 'src/app/shared/core/services/smart-dialog.service';
import { default_delete_dialog, default_form_dialog, default_iframe_dialog } from '../../helpers/site-defaults';
import { NotifyService } from 'src/app/api-services/common/notify.service';
import { DOC_STATUS } from 'src/app/api-services/status-helper';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent {


  @ViewChild('createform') createform: any;
  @ViewChild('editform') editform: any;
  @ViewChild('viewform') viewform: any;
  @ViewChild('viewPermissionNote') viewPermissionNote: TemplateRef<any>;
  @ViewChild('downloadPermissionNote') downloadPermissionNote: TemplateRef<any>;


  constructor(
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private api: SmartapiService,
    private common: CommonService,
    private smartDialog: SmartDialogService,
    private notify: NotifyService,

  ) { }

  tableData: any;
  tableFullData:any;

  //
  tableConfigNew: SmartTableConfig;
  //
  formData: any;
  //
  editData: any;
  viewData: any;
  //
  mode: string = '';
  processSelection: string = '';
  selectionButton: boolean = false;
  actionTypes = [
    { value: 'wait', label: 'Waiting' },
    { value: 'process', label: 'Completed' },
  ];
  //
  selectedId: number = 0;
  docList: any = []
  isUploadActive: boolean = true;
  mode_data = {
    emp: {
      title: " Document Management System",
      url: "SITE_DOCUMENT_GET_ALL_USER"
    },
    app: {
      title: "Documents  Approval",
      url: "SITE_DOCUMENT_GET_ALL_APP"
    },
    admin: {
      title: "Documents Admin",
      url: "SITE_DOCUMENT_GET_ALL_ADMIN"
    }
  }

 

  docMainCat:number =1;
  docMainCatTypes=[
    {value:1,label:"Knowledge"},
    {value:2,label:"Work Order"},
    {value:3,label:"Drawings"},
  ];
  docTypes:any;
  /**
   * get mod data
   */
  get modeData() {
    return this.mode_data[this.mode] !== undefined ? this.mode_data[this.mode] : null;
  }

  get siteTitle() {
    return this.modeData?.title;
  }

  get docMainCategory(){
    return this.docMainCatTypes.find((obj)=>obj.value==this.docMainCat)?.label;
  }


  getTableData() {
    let tableUrl = get_api_route(this.modeData?.url);
    if (this.processSelection.length > 3) {
      tableUrl += '/' + this.processSelection;
    }
    //console.log("table url = " , tableUrl , "   process selecton " , this.processSelection);
    this.api.smartGet(tableUrl).subscribe((res: any) => {
      this.tableData = res;
      this.tableFullData = res;
    });
  }

  docMainCatChange=()=>{
    this.tableData = this.tableFullData.filter((obj)=>obj.doc_main_cat == this.docMainCat);
    this.getDocTypes();
  }

  getDocTypes(){
    let payload = {doc_category:this.docMainCat}
    let api_route = get_api_route('DOC_GET_ALL_SELECT');
    this.api.smartPost(api_route,payload).subscribe((res: any) => {     
       this.docTypes = res;
    }); 
  }

  actionChange() {
    // here we need to get new document types also 
    this.getTableData();
    //
   
  }

  ngOnInit(): void {

    this.mode = this.route.snapshot.data.mode;
    if (this.mode != 'emp') {
      this.processSelection = 'wait';
      this.selectionButton = true;
    }
    this.createTable();
    this.getTableData();
    this.docList = [
      {
        title: 'All Document'
      },
      {
        title: 'My Document'
      },
    ]
    this.getDocTypes();
  }

  getTableConfig() {
    if (this.mode == 'admin') {
      return this.getAdminTableConfig();
    } else if (this.mode === 'app') {
      return this.getAppTableConfig();
    } else {
      return this.getUserTableConfig();
    }
  }

  getFilterConfig() {
    if (this.mode == 'admin') {
      return this.getAdminFilter();
    } else if (this.mode === 'app') {
      return this.getAdminFilter();
    } else {
      return this.getUserFilter();
    }
  }


  createTable() {
    let table_config: SmartTableMainConfig = {
      name: 'Documents',
      title: 'Vendors Details',
      table_class: "smart-responsive",
      download: true,   
      showentries: true,
      currentpage: false,   
      pagination: true,      
      colsearch: true, 
      search:true,    
      showEntriesClass: "is-8",
      search_bar_placeholder: "Search Document",
      searchBarClass: "is-4 ",
      buttonBarClass: "is-1",
      no_results: {
        title: 'No Documents Found',
        sub_title: 'Create a New Document',
        icon: 'fa fa-user',
      },
    };


    this.tableConfigNew = {
      tableconfig: table_config,
      config: this.getTableConfig(),
      filterConfig: this.getFilterConfig(),
      filterData: {
        from_date: this.common.addDays(-30),
        to_date: this.common.currentDate(),
      },

    };

  }

  getTableColumns(req) {
    let tableColumns: { [key: string]: SmartTableColumnConfig } = {
      sno: {
        type: 'sno',
        title: 'S.No',
        tbody: 's_no',
        export: true,
      },
      doc_title: {
        type: 'link',
        title: 'Document Title',
        tbody: 'doc_title',
        export: true,
        onClick: (data) => {
          this.openPdfView(data);
        }
      },
      doc_type: {
        type: 'db',
        title: 'Type',
        tbody: 'doc_type',
        export: true
      },

      doc_date: {
        type: 'date',
        title: 'Date',
        tbody: 'created_time',
        customFormat: true,
        format: 'dd-MM-YYYY',
        export: true
      },
      status: {
        type: 'tag',
        title: 'Status',
        tbody: 'doc_status',
        tagCond: DOC_STATUS
      },
      buttons: {
        type: 'buttons',
        title: 'Actions',
        btn_config: [
          // {
          //   type: 'button',
          //   class: ['is-small has-text-info'],
          //   btn_type: 'icon',
          //   icon: ['fa-pencil-square-o'],
          //   btn_func: (data) => {
          //     this.openEditForm(data);
          //   }
          // },

          {
            type: 'button',
            label: '',
            class: ['has-text-danger', 'is-small'],
            btn_type: 'icon',
            icon: ["fa fa-trash-o"],
            btn_func: (data) => {
              //console.log("data ", data);
              this.selectedId = data["ID"] !== undefined ? data["ID"] : 0;
              this.openDeleteCustomDialog();
            }
          },
        ],
      },
      user_buttons: {
        type: 'buttons',
        title: 'Actions',
        btn_config: [
          {
            type: 'button',
            label: '',
            class: ['has-text-primary', 'is-small'],
            btn_type: 'icon',
            icon: ['fa-eye'],
            btn_func: (data) => {
              //console.log("data ", data);
              this.openViewForm(data);
            }
          },
         
          {
            type: 'button',
            label: '',
            class: ['has-text-danger', 'is-small'],
            btn_type: 'icon',
            icon: ["fa fa-trash-o"],
            btn_func: (data) => {
              //console.log("data ", data);
              this.selectedId = data["ID"] !== undefined ? data["ID"] : 0;
              this.openDeleteCustomDialog();
            }
          },
          /*
          {
            type: 'button',
            class: ['is-small has-text-info'],
            btn_type: 'icon',
            icon: ['fa-pen-to-square'],
            btn_func: (data) => {
              this.openEditForm(data);
            }
          },*/
        ],
      },
      buttonsApp: {
        type: 'buttons',
        title: 'Actions',
        btn_config: [
          {
            type: 'button',
            label: '',
            class: ['has-text-primary', 'is-small'],

            btn_type: 'icon',
            icon: ['fa-eye'],
            btn_func: (data) => {
              //console.log("data ", data);
              this.openViewForm(data);
            },
          },
          {
            type: 'button',
            label: '',
            class: ['has-text-success', 'is-small'],
            btn_type: 'icon',
            icon: ['fa fa-check'],
            btn_func: (data) => {
              //console.log("data ", data);
              this.selectedId = data['ID'] !== undefined ? data['ID'] : 0;
              this.openApproveCustomDialog(
                'Do you Want to Approve the Document',
                "approve"
              );
            },
            btn_show: () => {
              return this.processSelection == "wait" ? true : false;
            }
          },
          {
            type: 'button',
            label: '',
            class: ['has-text-danger', 'is-small'],
            btn_type: 'icon',
            icon: ['fa fa-times'],
            btn_func: (data) => {
              //console.log("data ", data);
              this.selectedId = data['ID'] !== undefined ? data['ID'] : 0;
              this.openApproveCustomDialog(
                'Do you Want to Reject the Document',
                "reject"
              );
            },
            btn_show: () => {
              return this.processSelection == "wait" ? true : false;
            }
          },
        ],
      },
    };

    let output_columns: SmartTableColumnConfig[] = [];
    req.forEach(element => {
      let column: SmartTableColumnConfig = tableColumns[element[0]] !== undefined ? tableColumns[element[0]] : null;
      //console.log("columns " , column);
      if (column !== null && element[1] !== undefined) {
        column["width"] = element[1] + "%";
      }
      if (column != null) {
        output_columns.push(column);
      }
    });
    return output_columns;
  }

  openPdfView(data) {
    let id = data?.ID !== undefined ? data?.ID : 0;
    let options = {
      title: "PDF Viewer",
      iframe: get_api_route("SITE_DOCUMENT_GET_DOC")
    };
    let dialog_options = default_iframe_dialog(options);
    dialog_options.iframe_payload = { id: id };
    this.smartDialog.openDialog(dialog_options)
  }


  getAppTableConfig() {
    let columns = [["sno", 5], ["doc_title", 50], ["doc_type", 10], ["doc_date", 10],

    ["status", 10], ["buttonsApp", 10]];
    let table_body_config = this.getTableColumns(columns);
    return table_body_config;
  }

  getAdminTableConfig() {
    let columns = [["sno", 5], ["doc_title", 50], ["doc_type", 10], ["doc_date", 10],

    ["status", 10], ["buttons", 10]];
    let table_body_config = this.getTableColumns(columns);
    return table_body_config;
  }

  getUserTableConfig() {
    let columns = [["sno", 5], ["doc_title", 60], ["doc_type", 10],
    ["status", 10], ["user_buttons", 10]];
    let table_body_config = this.getTableColumns(columns);
    return table_body_config;
  }


  getAdminFilter() {
    let filterConfig: SmartFormField[] = [
      {
        type: 'text',
        width: 12,
        name: 'doc_title',
        label: 'Document Title',
        placeHolder: 'Document Title'
      },
      {
        type: "text",
        name: "doc_type",
        width: 12,
        label: 'Document Type',
        placeHolder: 'Document Type',
      },

      {
        type: 'date',
        width: 6,
        label: 'From Date',
        name: 'from_date',
        rightIcon: "fa-calendar",
        placeHolder: 'From Date',
        filterSettings: {
          type: "DATE_FROM",
          field_name: "created_time"
        }
      },
      {
        type: 'date',
        width: 6,
        label: 'To Date',
        name: 'to_date',
        rightIcon: "fa-calendar",
        placeHolder: 'To Date',
        filterSettings: {
          type: "DATE_TO",
          field_name: "created_time"
        }
      },



    ];
    return filterConfig;
  }

  getUserFilter() {
    let filterConfig: SmartFormField[] = [
      {
        type: 'text',
        width: 12,
        name: 'doc_title',
        label: 'Document Title',
        placeHolder: 'Document Title'
      },
      {
        type: "text",
        name: "doc_type",
        width: 12,
        label: 'Document Type',
        placeHolder: 'Document Type',

      },
    ];
    return filterConfig;
  }

 

  createFormConfig() {

    let document_cat_options = [
      {
        value: "Engineering",
        label: "Engineering"
      },
      {
        value: "Science",
        label: "Science"
      }
    ]


    let draw_cat_options = [
      {
        value: "Electrical Drawing",
        label: "Electrical Drawing"
      },
      {
        value: "Civil Drawing",
        label: "Civil Drawing"
      }
    ]


    let validation_file_knowledge:SmartValidationConfig[] = [
      {
        type: "required",
        msg: "Please Browse the File"
      },
      {
        type: "fileTypes",
        msg: "only Pdf is Required",
        fileTypes: ["pdf"]
      },
      {
        type: "fileSize",
        msg: "File size should be less tha 10 MB",
        max: 10
      }
    ];

    let validation_file_work:SmartValidationConfig[] = [
      {
        type: "fileTypes",
        msg: "only Pdf is Required",
        fileTypes: ["pdf"]
      },
      {
        type: "fileSize",
        msg: "File size should be less tha 10 MB",
        max: 10
      }
    ]

    let form_fileds: SmartFormField[] = [

      {
        type: "text",
        name: "doc_title",
        width: 12,
        label: "Title",
        placeHolder: 'Title',
        validations: [
          {
            type: "required",
            msg: "Title is Required"
          },
          // {
          //   type:"pattern",
          //   msg:"Please Enter Correct Title",
          //   pattern:'[a-zA-Z]+\\.?'
          // }
        ]
      },

      {
        type: "select",
        name: "doc_type",
        width: 6,
        label: "Document Type",
        leftIcon: "fa fa-file",
        placeHolder: 'Please Select',
        selectOptionType: "self",
        selectOptions:this.docTypes,
        selectOptionApi: "SITE_TYPE_GET_ALL_DOC_TYPES",
        validations: [
          {
            type: "required",
            msg: "Document / Drawing Type is Required"
          }
        ]
      },
      // doc_category
      {
        type: "select",
        name: "doc_category",
        width: 6,
        label: "Select Category",
        leftIcon: "fa fa-file",
        placeHolder: 'Please Select',
        selectOptionType: "self",
        selectOptions: this.docMainCat==3 ? draw_cat_options : document_cat_options,
        //selectOptionApi: "SITE_TYPE_GET_ALL_DOC_TYPES",
        validations: [
          {
            type: "required",
            msg: "Category is Required"
          }
        ]
      },
      {
        type: "file",
        width: 12,
        label: "Browse the Document",
        name: "uploaded_file",
        leftIcon: "fa fa-file",
        placeHolder: 'Browse File',
        validations: this.docMainCat==1 ? validation_file_knowledge : validation_file_work,
      },

      {
        type: "text",
        name: "wo_no",
        width: 4,
        label: "Work Order  Number",
        placeHolder: 'Work Order Number',
      
        hideFunction:(data:any)=>{
          return this.docMainCat==2 ? false : true;
        }
       
      },
      {
        type: "text",
        name: "wo_value",
        width: 4,
        label: "Work Order Value",
        allowedPattern: '[^0-9]*',
        placeHolder: 'Work Value',
        hideFunction:(data:any)=>{
          return this.docMainCat==2 ? false : true;
        }
     
      },
      {
        type: "text",
        name: "no_employees",
        width: 4,
        label: "No of Employees",
        allowedPattern: '[^0-9]*',
        placeHolder: 'No Of Employees',
        hideFunction:(data:any)=>{
          return this.docMainCat==2 ? false : true;
        }
     
      },
      {
        type: "text",
        name: "wo_name",
        width: 4,
        label: "Work Name",
        placeHolder: 'Work Name',
        hideFunction:(data:any)=>{
          return this.docMainCat==2 ? false : true;
        }
        
      },
      // {
      //   type: "text",
      //   name: "wo_type",
      //   width: 4,
      //   label: "Work Type  ",
      //   placeHolder: 'Work Type',
      //   hideFunction:(data:any)=>{
      //   return this.docMainCat==2 ? false : true;
      //   }
      
      // },
      {
        type: "date",
        name: "wo_start_from",
        width: 4,
        label: "Duration From Date",
        leftIcon: "fa fa-calendar",
        placeHolder: 'Date',
        hideFunction:(data:any)=>{
          return this.docMainCat==2 ? false : true;
        }
     

      },
      {
        type: "date",
        name: "wo_start_to",
        width: 4,
        label: "Duration To Date",
        leftIcon: "fa fa-calendar",
        placeHolder: 'Date',
        hideFunction:(data:any)=>{
          return this.docMainCat==2 ? false : true;
        }
     
      },
      {
        type: "text",
        name: "contractor_name",
        width: 4,
        label: "Contractor Name",
        placeHolder: 'Contractor Name',
        hideFunction:(data:any)=>{
          return this.docMainCat==2 ? false : true;
        }
     
      },
      {
        type: 'select',
        width: 4,
        label: 'Work Type',
        name: 'wo_type',
        placeHolder: 'Please Select',
        selectOptionType: 'self',
        selectOptions: [
          { value: 1, label: 'NIT' },
          { value: 2, label: 'NIQ' },
        ],    
        hideFunction:(data:any)=>{
          return this.docMainCat==2 ? false : true;
        }
        
      },
      {
        type: "selectsearchmultiple",
        width: 12,
        label: "Select Authors",
        name: "doc_auth",
        selectOptionType: 'api',
        selectOptionApi: "USER_GET_ALL_SELECT",
        validations: [
          {
            type: "required",
            msg: "Please Select Authors"
          }
        ]
      },
      {
        type: "template",
        name: "view_perm",
        label: "",
        template: this.viewPermissionNote,
        width: 12
      },
      {
        type: "selectsearchmultiple",
        width: 6,
        label: "Select Roles:",
        name: "view_per_role",
        selectOptionType: 'api',
        selectOptionApi: "SITE_ROLE_GET_ALL_SELECT",
      },
      {
        type: "selectsearchmultiple",
        width: 6,
        label: "Select Users:",
        name: "view_per_user",
        selectOptionType: 'api',
        selectOptionApi: "USER_GET_ALL_SELECT",
      },
      {
        type: "template",
        name: "download_perm",
        label: "",
        template: this.downloadPermissionNote,
        width: 12
      },
      {
        type: "selectsearchmultiple",
        width: 6,
        label: "Select Roles:",
        name: "download_per_role",
        selectOptionType: 'api',
        selectOptionApi: "SITE_ROLE_GET_ALL_SELECT",
      },
      {
        type: "selectsearchmultiple",
        width: 6,
        label: "Select Users:",
        name: "download_per_user",
        selectOptionType: 'api',
        selectOptionApi: "USER_GET_ALL_SELECT",
      },
      /*
      {
        type: 'select',
        width: 6,
        name: 'app_id',
        label: 'Select Approver',
        placeHolder: 'please select',
        selectOptionType: 'api',
        selectOptionApi: "ORG_GET_APPROVERS",
        selectOptions: [
          { value: 5, label: 'Active' },
          { value: 0, label: 'In Active' },
        ],
        validations: [
          {
            type: 'required',
            msg: 'Status is Required',
          },
        ],
      },
      */
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
      name: "Book List form",
      SmartFields: form_fileds
    }
    return formconfig;
  }

  editFormConfig() {
    let form_fileds: SmartFormField[] = [
      {
        type: "select",
        width: 12,
        name: "doc_status",
        label: "Status",
        placeHolder: "Please select",
        selectOptionType: "self",
        selectOptions: [
          { value: 5, label: "Submitted" },
          { value: 20, label: "Approved" }
        ],


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
      name: 'Role list form',
      SmartFields: form_fileds,
    };
    return formconfig;
  }



  viewFormConfig() {
    let form_fileds: SmartFormField[] = [
      {
        type: 'text',
        name: 'title',
        width: 12,
        label: 'Title',
        placeHolder: 'Title',
        validations: [
          {
            type: 'required',
            msg: 'Title is Required',
          },
        ],
      },




    ];

    let formconfig: SmartFormNewConfig = {
      name: 'Role list form',
      SmartFields: form_fileds,
    };
    return formconfig;
  }
  viewForm(data: any = null) {
    let options = {
      title: 'Document Details',
      template: this.viewform,
    };
    let dialog_options = default_form_dialog(options);
    dialog_options.width = 70;
    this.smartDialog.openDialog(dialog_options);
    // console.log('hello button clicked');
    // this.modalService.open(this.viewform, { size: 'lg' });
  }
  openViewForm(data) {
    let id = data.ID !== undefined ? data.ID : 0;
    let get_one = get_api_route('SITE_DOCUMENT_ONE');
    this.api.smartPost(get_one, { id: id }).subscribe((res: any) => {
      console.log('single data', res);
      this.viewData = res;
      this.viewForm(data);
    });
  }



  openForm(data: any = null) {
    this.formData = {};
    let options = {
      title: "New Document Form",
      template: this.createform,
    };
    let dialog_options = default_form_dialog(options);
    dialog_options.width = 90;
    this.smartDialog.openDialog(dialog_options)
  }

  dockClick(title: any) {
    if (title == 'My Document')
      this.isUploadActive = true
    else
      this.isUploadActive = false
  }

  editForm(data: any = null) {
    let options = {
      title: 'Document Management Update Form',
      template: this.createform,
    };
    let dialog_options = default_form_dialog(options);
    dialog_options.width = 70;
    this.smartDialog.openDialog(dialog_options);


  }


  openApproveCustomDialog(msg: string, action: string) {
    let dialog_options = default_delete_dialog(msg);
    this.smartDialog.openDialog(dialog_options).confirmed.subscribe((data) => {
      if (data.action == 'yes') {
        this.app_status_update_one(action);
      }
    });
  }

  app_status_update_one(status: string) {
    // url needs to be changed
    let deleteUrl = get_api_route('SITE_DOCUMENT_UPDATE_APP');
    this.api
      .smartPost(deleteUrl, { id: this.selectedId, action: status })
      .subscribe((data) => {
        this.notify.success('submitted successfully');
        this.getTableData();
      });
  }






  openEditForm(data) {
    let id = data.ID !== undefined ? data.ID : 0;
    let get_one = get_api_route("SITE_DOCUMENT_ONE");
    this.api.smartPost(get_one, { id: id }).subscribe((res: any) => {
      this.formData = res;
      this.editForm();
    });
  }






  submitData(data: any) {

    let formData = this.api.preparePostData(data);
    formData.append("uploaded_file", data["uploaded_file"]);
    formData.append("doc_main_cat",""+this.docMainCat);
    //  console.log("formdata modified ", formData);
    this.api.smartPost('SITE_DOCUMENT_INSERT', formData, false, false, "multipart/form-data").subscribe((res: any) => {
      this.notify.success("Submited successfully");
      this.getTableData();
      this.smartDialog.closeDialog()
    });

  }


  updateDate(data) {
    let id = data.ID !== undefined ? data.ID : 0;
    let update_url = get_api_route('SITE_DOCUMENT_UPDATE');
    data["id"] = id;
    this.api.smartPost(update_url, data).subscribe((res: any) => {
      //  console.log('data ', res);
      this.notify.success("Updated successfully");
      this.smartDialog.closeDialog();
      this.getTableData();
    });

  }


  delete_one() {
    let deleteUrl = get_api_route("SITE_DOCUMENT_DELETE_ONE");
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
