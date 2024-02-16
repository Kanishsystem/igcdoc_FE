import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { get_api_route } from 'src/app/api-services/api-router';
import { CommonService } from 'src/app/api-services/common/common.service';
import { NotifyService } from 'src/app/api-services/common/notify.service';
import { SmartapiService } from 'src/app/api-services/smartapi.service';
import { SmartFormField, SmartFormNewConfig } from 'src/app/shared/core/SmartInterfaces/SmartFormNewInterface';
import { SmartTableColumnConfig, SmartTableConfig, SmartTableMainConfig } from 'src/app/shared/core/SmartInterfaces/SmartTableNewInterface';
import { SmartDialogService } from 'src/app/shared/core/services/smart-dialog.service';
import { default_delete_dialog, default_form_dialog, default_iframe_dialog } from '../../helpers/site-defaults';

@Component({
  selector: 'app-electrical-shutdown',
  templateUrl: './electrical-shutdown.component.html',
  styleUrls: ['./electrical-shutdown.component.css']
})
export class ElectricalShutdownComponent {


  @ViewChild('createform') createform: any;
  @ViewChild('editform') editform: any;
  @ViewChild('viewform') viewform: any;

  constructor(
    // private modalService: NgbModal,
    private route: ActivatedRoute,
    private api: SmartapiService,
    private smartDialog: SmartDialogService,
    private common: CommonService,
    private notify: NotifyService
  ) {}

  tableData: any;
  //
  tableConfigNew: SmartTableConfig;

  editData: any;
  viewData: any;
  formData: any;
  //
  //
  mode: string = '';
  processSelection: string = '';
  selectionButton: boolean = false;
  actionTypes = [
    { value: 'wait', label: 'Waiting' },
    { value: 'process', label: 'Processed' },
  ];
  //
  selectedId: number = 0;
  mode_data = {
    emp: {
      title: 'Electrical Shutdown Requisition',
      url: 'SITE_ELECTRICAL_SHUTDOWN_GET_ALL_USER',
    },
    app: {
      title: 'Electrical Complaints-Approval',
      url: 'SITE_ELECTRICAL_SHUTDOWN_GET_ALL_APP',
    },
    admin: {
      title: 'Electrical Shutdown Requisition-Admin',
      url: 'SITE_ELECTRICAL_SHUTDOWN_GET_ALL',
    },
  };
  /**
   * get mod data
   */
  get modeData() {
    return this.mode_data[this.mode] !== undefined
      ? this.mode_data[this.mode]
      : null;
  }

  get siteTitle() {
    return this.modeData?.title;
  }

  actionChange() {
    this.getTableData();
  }

  getTableData() {
    let tableUrl = get_api_route(this.modeData?.url);
    if (this.processSelection.length > 3) {
      tableUrl += '/' + this.processSelection;
    }
    this.api.smartGet(tableUrl).subscribe((res: any) => {
      this.tableData = res;
    });
  }

  ngOnInit(): void {
    this.mode = this.route.snapshot.data.mode;
    this.createTable();
    if (this.mode != 'emp') {
      this.processSelection = 'wait';
      this.selectionButton = true;
    }
    this.getTableData();
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
      name: 'ACV Shutdown ',
      title: 'Vendors Details',
      table_class: 'smart-responsive',
      download: true,   
      showentries: true,
      currentpage: false,   
      pagination: true,      
      //colsearch: true, 
      search:true, 
      showEntriesClass: 'is-8',
      search_bar_placeholder: 'Search Complaint',
      searchBarClass: 'col-4 ',
      buttonBarClass: 'col-1 d-flex justify-content-end',
      no_results: {
        title: 'No Requisitions Found',
        sub_title: 'Create a New Requisitions',
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
    console.log('table config ', this.tableConfigNew);
  }

  getAdminFilter() {
    let filterConfig: SmartFormField[] = [
      {
        type: 'text',
        width: 12,
        name: 'title',
        label: 'Complaint Title',
        // leftIcon: 'fa-user',
        placeHolder: 'Complaint Title',
      },

      {
        type: 'text',
        width: 12,
        name: 'created_by',
        placeHolder: 'Requester',
        label: 'Requester',
      },
      {
        type: 'text',
        width: 12,
        name: 'location',
        placeHolder: 'Location',
        label: 'Location',
      },
      {
        type: 'date',
        width: 6,
        label: 'From Date',
        name: 'from_date',
        rightIcon: 'fa-calendar',
        placeHolder: 'From Date',
        filterSettings: {
          type: 'DATE_FROM',
          field_name: 'created_time',
        },
      },
      {
        type: 'date',
        width: 6,
        label: 'To Date',
        name: 'to_date',
        rightIcon: 'fa-calendar',
        placeHolder: 'To Date',
        filterSettings: {
          type: 'DATE_TO',
          field_name: 'created_time',
        },
      },
    ];
    return filterConfig;
  }

  getUserFilter() {
    let filterConfig: SmartFormField[] = [
      {
        type: 'text',
        width: 12,
        name: 'title',
        label: 'Complaint Title',
        placeHolder: 'Complaint Title',
      },
      {
        type: 'text',
        width: 12,
        name: 'location',
        label: 'Location',
        // leftIcon: 'fa-user',
        placeHolder: 'Location',
      },
      {
        type: 'date',
        width: 6,
        label: 'From Date',
        name: 'from_date',
        rightIcon: 'fa-calendar',
        placeHolder: 'From Date',
        filterSettings: {
          type: 'DATE_FROM',
          field_name: 'created_time',
        },
      },
      {
        type: 'date',
        width: 6,
        label: 'To Date',
        name: 'to_date',
        rightIcon: 'fa-calendar',
        placeHolder: 'To Date',
        filterSettings: {
          type: 'DATE_TO',
          field_name: 'created_time',
        },
      },
    ];
    return filterConfig;
  }

  getTableColumns(req) {
    let tableColumns: { [key: string]: SmartTableColumnConfig } = {
      sno: {
        type: 'sno',
        title: 'S.No',
        tbody: 's_no',
      },
   
      fromDate: {
        type: 'date',
        title: 'From Date',
        tbody: 'from_date',
        customFormat: true,
        format: 'dd-MM-YYYY',
      },
      toDate: {
        type: 'date',
        title: 'To Date',
        tbody: 'to_date',
        customFormat: true,
        format: 'dd-MM-YYYY',
      },

      description: {
        type: 'db',
        title: 'Description',
        tbody: 'description',
      },

      requester: {
        type: 'date',
        title: 'Date',
        tbody: 'created_time',
        customFormat: true,
        format: 'dd-MM-YYYY',
      },

      status: {
        type: 'tag',
        title: 'Status',
        tbody: 'status',
        tagCond: [
          { comp: '10', tagClass: 'is-link is-dark ', tagText: 'Submitted' },
          { comp: '15', tagClass: 'is-success ', tagText: 'Completed' },
          { comp: '6', tagClass: 'is-danger ', tagText: 'Cancelled' },
          { comp: '11', tagClass: 'is-danger  ', tagText: 'Invalid' },
        ],
      },

      fileButton:{
        type:'buttons',
        title:"Attachment",
        btn_config: [        
          {
            type: 'button',             
            class: ['has-text-info'],
            btn_type: 'icon',
            icon: ['fa fa-file-pdf-o'],
            btn_func: (data) => {            
              this.openPdfView(data);
            },
            btn_show:(data)=>{
              return data["file_check"] && data["file_check"]===true ? true : false;
            }
          },
        ],
      },

      
      buttons: {
        type: 'buttons',
        title: 'Edit',
        btn_config: [
          {
            type: 'button',
            class: ['has-text-info', 'is-small'],
            btn_type: 'icon',
            icon: ['fa-pencil-square-o'],
            btn_func: (data) => {
              // here impliments
              this.openEditForm(data);
            },
            // btn_show:()=>{
            //   return this.processSelection=="wait" ? true: false;
            // }
          },
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
            icon: ['fa-check'],
            btn_func: (data) => {
              //console.log("data ", data);
              this.selectedId = data['ID'] !== undefined ? data['ID'] : 0;
              this.openApproveCustomDialog('Do you Want to Approve the Complaint',"approve");
            },
            btn_show:()=>{
              console.log("this. process " , this.processSelection);
              return this.processSelection=="wait" ? true : false;
            }
          },
          {
            type: 'button',
            label: '',
            class: ['has-text-danger', 'is-small'],
            btn_type: 'icon',
            icon: ['fa-times'],
            btn_func: (data) => {
              //console.log("data ", data);
              this.selectedId = data['ID'] !== undefined ? data['ID'] : 0;
              this.openApproveCustomDialog('Do you Want to Reject the Complaint',"reject");
            },
            btn_show:()=>{
              return this.processSelection=="wait" ? true : false;
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
            },
          },

          {
            type: 'button',
            label: '',
            class: ['has-text-danger', 'is-small'],
            btn_type: 'icon',
            icon: ['fa fa-trash-can'],
            btn_func: (data) => {
              //console.log("data ", data);
              this.selectedId = data['ID'] !== undefined ? data['ID'] : 0;
              this.openDeleteCustomDialog();
            },
            // btn_show: () => {
            //   return this.processSelection == "wait" ? true : false;
            // }
          },
        ],
      },
    };

    let output_columns: SmartTableColumnConfig[] = [];
    req.forEach((element) => {
      let column: SmartTableColumnConfig =
        tableColumns[element[0]] !== undefined
          ? tableColumns[element[0]]
          : null;
      //console.log("columns " , column);
      if (column !== null && element[1] !== undefined) {
        column['width'] = element[1] + '%';
      }
      if (column != null) {
        output_columns.push(column);
      }
    });
    return output_columns;
  }

  getAppTableConfig() {
    let columns = [
      ['sno', 5],
      ['complaint_title', 30],
      ['requester_name', 15],
      ['requester', 10],
      ['location', 15],
      ['intercom_number', 10],
      ['status', 10],
      ['buttonsApp', 10],
    ];
    let table_body_config = this.getTableColumns(columns);
    return table_body_config;
  }

  getAdminTableConfig() {
    let columns = [
      ['sno', 5],
      ['fromDate', 10],
      ['toDate', 10],
      [ 'description',30 ],
      ['requester_name', 15],
      ['requester', 10],
  
    
      ['status', 10],
      ['fileButton',5],
      ['buttons', 5],
    ];
    let table_body_config = this.getTableColumns(columns);
    return table_body_config;
  }

  getUserTableConfig() {
    let columns = [
      ['sno', 5],
      ['fromDate', 10],
      ['toDate', 10],
      [ 'description',40 ],
      ['status', 10],
      ['fileButton',5],
      ['user_buttons', 10],
    ];
    let table_body_config = this.getTableColumns(columns);
    return table_body_config;
  }

  createFormConfig() {
    let form_fileds: SmartFormField[] = [
      {
        type: "date",
        name: "from_date",
        width: 6,
        label: "From Date",
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
        type: "date",
        name: "to_date",
        width: 6,
        label: "To Date",
        leftIcon: "fa fa-calendar",
        placeHolder: 'Date',
        validations: [
          {
            type: "required",
            msg: "To Date is Required"
          }
        ]

      },
      {
        type: "time",
        name: "from_time",
        width: 6,
        label: "Start Time ",
        timeSettings:{
          step:30
        },
      //  horizontal:true,
        validations: [
          {
            type: "required",
            msg: " Start time is Required"
          },
          // {
          //   type:'mintime',
          //   msg:"Start Time should be greater then 8 AM",
          //   pattern:"8:00"
          // },
          // {
          //   type:'maxtime',
          //   msg:"Start Time should be lesser then 6:30 PM",
          //   pattern:"18:30"
          // },
          {
            type: 'fromtime',
            msg: ' start Time Cannot Be Greater Than End Time',
            pattern:"meet_end_time"
          }, 
        ]

      },
      {
        type: "time",
        name: "to_time",
        width: 6,
        label: "End Time",
       // horizontal:true,
        timeSettings:{
          step:30
        },        
        validations: [
          {
            type: "required",
            msg: " End Time is Required"
          },
          // {
          //   type:'mintime',
          //   msg:"End Time should be greater then 8:30 AM",
          //   pattern:"8:30"
          // },
          // {
          //   type:'maxtime',
          //   msg:"End Time should be lesser then 7:00 PM",
          //   pattern:"19:00"
          // },
          {
            type: 'totime',
            msg: ' End Time Cannot Be Less Than Start Time',
            pattern:"meet_start_time"
          }, 
        ]

      },
      {
        type: 'textarea',
        name: 'description',
        width: 12,
        label: 'Description',
        // leftIcon: "fa fa-audio-description",
        placeHolder: 'Description',
        validations: [
          {
            type: 'required',
            msg: 'Description is Required',
          },
        ],
      },
      {
        type: 'file',
        width: 12,
        label: 'Browse the Form',
        name: 'uploaded_file',
        leftIcon: 'fa fa-file',
        placeHolder: 'Browse File',
        validations: [
        
          {
            type: 'fileTypes',
            msg: 'only Pdf is Required',
            fileTypes: ['pdf', 'docx'],
          },
          {
            type: 'fileSize',
            msg: 'File size should be less tha 10 MB',
            max: 10,
          },
        ],
      },

     

     

      {
        type: 'button',
        label: 'Submit New Requisition',
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
        label: 'Update ',
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
      name: 'Book List form',
      SmartFields: form_fileds,
    };
    return formconfig;
  }

  editFormConfig() {
    let form_fileds: SmartFormField[] = [
      {
        type: 'select',
        width: 12,
        name: 'status',
        label: 'Status',
        placeHolder: 'Please Select',
        selectOptionType: 'self',
        selectOptions: [
          { value: 15, label: 'Completed' },
          { value: 11, label: 'Invalid/Incomplete' },
        ],
      },
      {
        type: 'textarea',
        name: 'admin_remarks',
        width: 12,
        label: 'Admin Remarks',
        hideFunction: (item, get_value) => {
          //console.log("formdata " , data);
          return get_value('status') == 11 ? false : true;
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

  viewFormConfig() {
    let form_fileds: SmartFormField[] = [
      {
        type: 'text',
        name: 'title',
        width: 6,
        label: 'Title',
        leftIcon: 'fa fa-heading',
        placeHolder: 'Title',
        validations: [
          {
            type: 'required',
            msg: 'Title is Required',
          },
        ],
      },

      {
        type: 'textarea',
        name: 'description',
        width: 6,
        label: 'Description',
        // leftIcon:"fa fa-audio-description",
        placeHolder: 'Description',
        validations: [
          {
            type: 'required',
            msg: 'Description is Required',
          },
        ],
      },

      {
        type: 'text',
        name: 'location',
        width: 6,
        label: 'Location',
        leftIcon: 'fa fa-location-dot',
        placeHolder: 'Location',
        validations: [
          {
            type: 'required',
            msg: 'Location is Required',
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
    // console.log("hello button clicked")
    // this.modalService.open(this.viewform, { size: 'lg' });
    let options = {
      title: 'Details',

      template: this.viewform,
    };
    let dialog_options = default_form_dialog(options);
    dialog_options.width = 70;
    this.smartDialog.openDialog(dialog_options);
  }
  openViewForm(data) {
    let id = data.ID !== undefined ? data.ID : 0;
    let get_one = get_api_route('SITE_ELECTRICAL_SHUTDOWN_ONE');
    this.api.smartPost(get_one, { id: id }).subscribe((res: any) => {
      // console.log('single data', res);
      this.viewData = res;
      console.log("View data",this.viewData)
      this.viewForm(data);
    });
  }

  openForm(data: any = null) {
    let options = {
      title: 'ELECTRICAL Shutdown Requisition Form',

      template: this.createform,
    };
    let dialog_options = default_form_dialog(options);
    dialog_options.width = 70;
    this.smartDialog.openDialog(dialog_options);
  }
  editForm(data: any = null) {
    let options = {
      title: 'ELECTRICAL Shutdown Requisition Update Form',
      template: this.editform,
    };
    let dialog_options = default_form_dialog(options);
    dialog_options.width = 100;
    this.smartDialog.openDialog(dialog_options);
    // console.log('hello button clicked');
    // this.modalService.open(this.viewform, { size: 'lg' });
  }

  openEditForm(data) {
    let id = data.ID !== undefined ? data.ID : 0;
    let get_one = get_api_route('SITE_ELECTRICAL_SHUTDOWN_ONE');
    this.api.smartPost(get_one, { id: id }).subscribe((res: any) => {
      //  console.log("single data", res);
      this.editData = res;
      // console.table( "table Data",this.editData)
      this.editForm();
    });
  }

  openAppForm(data) {
    let id = data.ID !== undefined ? data.ID : 0;
    let get_one = get_api_route('SITE_ELECTRICAL_SHUTDOWN_ONE');
    this.api.smartPost(get_one, { id: id }).subscribe((res: any) => {
      //  console.log("single data", res);
      this.editData = res;
      this.editForm();
    });
  }

  delete_one() {
    let deleteUrl = get_api_route('SITE_ELECTRICAL_SHUTDOWN_DELETE_ONE');
    this.api.smartPost(deleteUrl, { id: this.selectedId }).subscribe((data) => {
      this.notify.success('Deleted successfully');
      this.getTableData();
    });
  }

  openDeleteCustomDialog() {
    let dialog_options = default_delete_dialog(
      'Do you want to Delete?',
      'The Action Cannot Be Reverted'
    );
    this.smartDialog.openDialog(dialog_options).confirmed.subscribe((data) => {
      if (data.action == 'yes') {
        this.delete_one();
      }
    });
  }

  openApproveCustomDialog(msg:string,action:string) {
    let dialog_options = default_delete_dialog(msg);
    this.smartDialog.openDialog(dialog_options).confirmed.subscribe((data) => {
      if (data.action == 'yes') {
        this.app_status_update_one(action);
      }
    });
  }

  app_status_update_one(status: string) {
    // url needs to be changed
    let deleteUrl = get_api_route('SITE_ELECTRICAL_SHUTDOWN_UPDATE_APP');
    this.api
      .smartPost(deleteUrl, { id: this.selectedId, action: status })
      .subscribe((data) => {
        this.notify.success('Updated Successfully');
        this.getTableData();
      });
  }

  // getTableData() {
  //   this.api.smartGet('SITE_ELECTRICAL_GET_ALL').subscribe((res: any) => {
  //     this.tableData = res;
  //   });
  // }

  submitData(data) {
    let formData = this.api.preparePostData(data);
    formData.append("uploaded_file",data["uploaded_file"]);
    this.api.smartPost('SITE_ELECTRICAL_SHUTDOWN_INSERT', formData, false, false, "multipart/form-data").subscribe((res: any) => {
      this.smartDialog.closeDialog();
      this.notify.success("Submitted successfully");
      this.getTableData();
    });
    /*
    // console.log('Fetch Data',data);
    this.api.smartPost('SITE_SHUTDOWN_INSERT', data).subscribe((res: any) => {
      this.smartDialog.closeDialog();
      this.notify.success('Submitted successfully');
      this.getTableData();
    });
    */
  }

  updateDate(data) {
    let id = data.ID !== undefined ? data.ID : 0;
    let update_url = get_api_route('SITE_ELECTRICAL_SHUTDOWN_UPDATE');
    data['id'] = id;
    this.api.smartPost(update_url, data).subscribe((res: any) => {
      //  console.log('data ', res);
      this.notify.success('Updated successfully');
      this.smartDialog.closeDialog();
      this.getTableData();
    });
  }

  status_disp=[
    { comp: '10', tagClass: 'is-link is-dark ', tagText: 'Submitted' },
    { comp: '15', tagClass: 'is-success ', tagText: 'Completed' },
    { comp: '6', tagClass: 'is-danger ', tagText: 'Cancelled' },
    { comp: '11', tagClass: 'is-danger  ', tagText: 'Invalid' },

  ];

  get_status_disp(status)
  {
    return this.status_disp.filter(item=>item.comp==status)[0]?.tagText;
  }

  openPdfView(data) {
    let id = data?.ID!==undefined ? data?.ID : 0;
    let options = {
      title:"PDF Viewer",
      iframe:get_api_route("SITE_ELECTRICAL_SHUTDOWN_GET_PDF")
    };
    let dialog_options = default_iframe_dialog(options);
    dialog_options.iframe_payload = {id:id};  
    this.smartDialog.openDialog(dialog_options)
  }


 }


