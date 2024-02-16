import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbCalendar, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { get_api_route } from 'src/app/api-services/api-router';
import { SmartapiService } from 'src/app/api-services/smartapi.service';
import { SmartFormField, SmartFormNewConfig } from 'src/app/shared/core/SmartInterfaces/SmartFormNewInterface';
import { SmartTableColumnConfig, SmartTableConfig, SmartTableMainConfig } from 'src/app/shared/core/SmartInterfaces/SmartTableNewInterface';
import { SmartDialogService } from 'src/app/shared/core/services/smart-dialog.service';
import { default_delete_dialog, default_form_dialog } from '../../helpers/site-defaults';
import { NotifyService } from 'src/app/api-services/common/notify.service';
import { CommonService } from 'src/app/api-services/common/common.service';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { SessionStorageServiceService } from 'src/app/api-services/core/session-storage-service.service';

@Component({
  selector: 'app-meeting-room',
  templateUrl: './meeting-room.component.html',
  styleUrls: ['./meeting-room.component.css']
})
export class MeetingRoomComponent {

  @ViewChild('createform') createform: any
  @ViewChild('editform') editform: any
  @ViewChild('viewform') viewform: any
  @ViewChild('meetTemplate', { static: true }) meetTemplate: TemplateRef<any>;
  @ViewChild('meetCardTemplate', { static: true }) meetCardTemplate: TemplateRef<any>;
  //
  viewData: any;
  //
  @ViewChild('viewPermissionNote') viewPermissionNote: TemplateRef<any>;
  selectedId: any;

  minDate:any;

  constructor(
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private api: SmartapiService,
    private smartDialog: SmartDialogService,
    private notify: NotifyService,
    private common: CommonService,
    private userSession: SessionStorageServiceService,
    private calendar: NgbCalendar

  ) {
    this.minDate = this.calendar.getToday();
   }

  tableData: any;
  //
  tableConfigNew: SmartTableConfig;
  //
  mode: string = '';
  //
  formData: any;
  //
  editData: any;
  //
  meetData: any;
  // meet room
  meetRoom: any;
  // meet room types
  meetRoomTypes: any;
  // selected Month
  selectedMonth: number;
  // selected year
  selectedYear: number;
  // all/my/booking button label
  bookingButton: boolean = true;
  //
  adminEnable:boolean = false;
  // currentpage: false;
  //refresh: true;
  // mode_data

  mode_data = {
    user: {
      title: "My Bookings",
      url: "SITE_MEETROOM_GET_ALL_USER"
    },
    admin: {
      title: "All Bookings",
      url: "SITE_MEETROOM_GET_ALL"
    }
  }
  singleMeetData: any;

  /**
   * get mod data
   */
  get modeData() {
    return this.mode_data[this.mode] !== undefined ? this.mode_data[this.mode] : null;
  }
  // get page Title
  get title() {
    if (this.bookingButton == true) {
      return "Meeting Calender";
    }
    return this.modeData?.title;
  }


  ngOnInit(): void {
    //this.mode = this.route.snapshot.data.mode;
    this.mode = this.userSession.checkRoleExists(["ADMIN","SITE_ADMIN"]) ? "admin" :"user";
    this.adminEnable = this.userSession.checkRoleExists(["ADMIN","SITE_ADMIN"]);
    this.selectedYear = this.common.currentYear();
    this.selectedMonth = this.common.currentMonth();
    this.getMeetTypes();
  }

  // show table
  showTable(mode) {
    this.mode = mode;
    this.bookingButton = false;
    this.createTable();
    this.getTableData();
  }

  meet_status_disp=[
   
            { comp: "5", tagClass: "is-link is-dark ", tagText: "Submitted" },
            { comp: "10", tagClass: "is-success ", tagText: "Completed" },
            { comp: "15", tagClass: "is-danger ", tagText: "Cancelled" },
            { comp: "8", tagClass: "is-danger  ", tagText: "Invalid" }
  ];

  get_status_disp(status){
    return this. meet_status_disp.filter(item=>item.comp==status)[0]?.tagText;
  }
  
  get_statusClass_disp(status){
    return this. meet_status_disp.filter(item=>item.comp==status)[0]?.tagClass;
  }
  
  // create table
  createTable() {
    let table_config: SmartTableMainConfig = {
      name: 'meetDetails',
      title: 'meet Details',
      table_class: "smart-responsive",
      download: true,
      colsearch: true,
      search:true, 
      showEntriesClass: "is-4",
      search_bar_placeholder: "Search Meeting List",
      searchBarClass: "col-4 ",
      buttonBarClass: "col-4 d-flex justify-content-end",
      showentries: true,
     // search:true,
      // currentpage: false,
      //refresh: true,
      showingentries: true,
      // sorting: true,
      pagination: true,
    };
    this.tableConfigNew = {
      tableconfig: table_config,
      filterConfig: this.getAdminFilter(),
      filterData: {
        from_date: this.common.addDays(-30),
        to_date: this.common.currentDate(),
      },
      config: this.mode === 'user' ? this.getUserTableConfig() : this.getAdminTableConfig(),
    };
  }

  getTableColumns(req) {
    let tableColumns: { [key: string]: SmartTableColumnConfig } = {
      sno: {
        type: 'sno',
        title: 'S.No',
        tbody: 's_no',
      },
      room_name: {
        type: 'db',
        title: 'Room Name',
        tbody: 'room_name',
      },
      meet_purpose: {
        type: 'db',
        title: 'Meet Purpose',
        tbody: 'meet_purpose',
      },
      employee: {
        type: 'db',
        title: 'Requester',
        tbody: 'created_by',
      },
      meet_date: {
        type: 'date',
        title: 'Date',
        tbody: 'meet_date',
        customFormat: true,
        format: 'dd-MM-YYYY',
      },
      start_time: {
        type: 'db',
        title: 'Start Time',
        tbody: 'meet_start_time',
      },
      end_time: {
        type: 'db',
        title: 'End Time',
        tbody: 'meet_end_time',
      },

      status: {
        type: 'tag',
        title: 'Status',
        tbody: 'status',
        tagCond: [
          { comp: "5", tagClass: "is-link is-dark ", tagText: "Booked" },
         { comp: "10", tagClass: "is-success ", tagText: "Completed" },
          { comp: "15", tagClass: "is-danger ", tagText: "Cancelled" },
          { comp: "8", tagClass: "is-danger  ", tagText: "Invalid" }
        ]
      },
      buttons: {
        type: 'buttonsAction',
        title: 'Edit/View',
        btn_config: [
          {
            type: 'button',
            label: 'View',
            class: ['has-text-primary', 'is-small'],
            btn_type: 'icon',
            icon: ['fa-eye'],
            btn_func: (data) => {
              //console.log("data ", data);
              // this.selectedId = data["ID"] !== undefined ? data["ID"] : 0;
              this.openViewForm(data);
            }
          },
          {
            type: 'button',
            class: ['is-small has-text-info'],
            btn_type: 'icon',
            icon: ['fa-pencil-square-o'],
            btn_func: (data) => {
              // here impliments
              this.openEditForm(data);
            }
          },
          {
            type: 'button',
            class: ['is-small has-text-danger'],
            btn_type: 'icon',
            icon: ['fa fa-trash '],
            btn_func: (data) => {
              this.selectedId = data["ID"] !== undefined ? data["ID"] : 0;
              this.openDeleteCustomDialog();

            }
          },

        ],
      },
      user_buttons: {
        type: 'buttons',
        title: 'View',
        btn_config: [
          {
            type: 'button',
            label: '',
            class: ['has-text-primary', 'is-small'],

            btn_type: 'icon',
            icon: ['fa-eye'],
            btn_func: (data) => {
              console.log("data ", data);
              this.openViewForm(data);
            }
          },
          {
            type: 'button',
            class: ['is-small has-text-danger'],
            btn_type: 'icon',
            icon: ['fa fa-trash '],
            btn_func: (data) => {
              this.selectedId = data["ID"] !== undefined ? data["ID"] : 0;
              this.openDeleteCustomDialog();


            },
            btn_show:(data)=>{
              let status = data["status"]!==undefined ? parseInt(data["status"]) : 0;
              return status==15 ? true : false;
                //console.log("who function to test " , data);
            }
          },


          {
            type: 'button',
            label: '',
            class: ['has-text-danger', 'is-small'],
            btn_type: 'icon',
            icon: ["fa-close"],
            btn_func: (data) => {
              //console.log("data ", data);
              this.selectedId = data["ID"] !== undefined ? data["ID"] : 0;
              this.openCancelCustomDialog();
            },
            btn_show:(data)=>{
              let status = data["status"]!==undefined ? parseInt(data["status"]) : 0;
              return status==15 ? false : true;
                //console.log("who function to test " , data);
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
        column["width"] = element[1] + '%';
      }
      if (column != null) {
        output_columns.push(column);
      }
    });
    return output_columns;
  }
  getAdminFilter() {
    let filterConfig: SmartFormField[] = [
      {
        type: 'text',
        width: 6,
        name: 'room_name',
        label: 'Room Name',
        placeHolder: 'Room Name'
      }, 
      {
        type: 'text',
        width: 6,
        name: 'meet_purpose',
        label: 'Meeting Purpose',
        placeHolder: 'Meeting Purpose'
      },    
      {
        type: 'text',
        width: 6,
        name: 'created_by',
        label: 'Requester',
        placeHolder: 'Requester',
      },
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
        }         
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
        }       
      },
    ];
    return filterConfig;
  }



  getAdminTableConfig() {
    let columns = [["sno", 5], ["room_name", 15], ["meet_purpose", 15],
    ["employee", 10], ["meet_date", 10], ["start_time", 10], ["end_time", 10], ["status", 5], ["buttons", 5]];
    let table_body_config = this.getTableColumns(columns);
    return table_body_config;
  }

  getUserTableConfig() {
    let columns = [["sno", 5], ["room_name", 15], ["meet_purpose", 15],
    ["meet_date", 10], ["start_time", 5], ["end_time", 5], ["status", 5], ["user_buttons", 5]];
    let table_body_config = this.getTableColumns(columns);
    return table_body_config;
  }


  createFormConfig() {
    let form_fileds: SmartFormField[] = [

      {
        type: "text",
        name: "meet_purpose",
        width: 12,
        label: "Meet Purpose",
        leftIcon: "fa-regular fa-comments",
        placeHolder: 'Meet Purpose',
        validations: [
          {
            type: "required",
            msg: "Meet Purpose is Required"
          }
        ]

      },

      {
        type: "select",
        name: "room_name",
        width: 6,
        label: "Select Meet Room",
        leftIcon: "fa fa-handshake-o",
        placeHolder: 'Please Select',
        selectOptionType: 'api',
        selectOptionApi: get_api_route("SITE_TYPE_GET_ALL_SELECT") + "meetTypes",
        // selectOptions:this.meetRoomTypes,
        selectOptions: [
          { value: 'Room1', label: 'Room 1' },
          { value: 'Room2', label: 'Room 2' },
        ],





        validations: [
          {
            type: "required",
            msg: "Meet Room Name is Required"
          }
        ]

      },
      {
        type: "date",
        name: "meet_date",
        width: 6,
        label: "Meeting Date",
        leftIcon: "fa fa-calendar",
        placeHolder: 'Date',
        dateSettings:{
          minDate: this.minDate 
        },
        validations: [
          {
            type: "required",
            msg: "Meet Date is Required"
          }
        ]

      },
      {
        type: "time",
        name: "meet_start_time",
        width: 6,
        label: "Start Time ",
        timeSettings:{
          step:30
        },
      //  horizontal:true,
        validations: [
          {
            type: "required",
            msg: "Meet Start time is Required"
          },
          {
            type:'mintime',
            msg:"Start Time should be greater then 8 AM",
            pattern:"8:00"
          },
          {
            type:'maxtime',
            msg:"Start Time should be lesser then 6:30 PM",
            pattern:"18:30"
          },
          {
            type: 'fromtime',
            msg: 'Meeting  start Time Cannot Be Greater Than End Time',
            pattern:"meet_end_time"
          }, 
        ]

      },
      {
        type: "time",
        name: "meet_end_time",
        width: 6,
        label: "End Time",
       // horizontal:true,
        timeSettings:{
          step:30
        },        
        validations: [
          {
            type: "required",
            msg: "Meet End Time is Required"
          },
          {
            type:'mintime',
            msg:"End Time should be greater then 8:30 AM",
            pattern:"8:30"
          },
          {
            type:'maxtime',
            msg:"End Time should be lesser then 7:00 PM",
            pattern:"19:00"
          },
          {
            type: 'totime',
            msg: 'Meeting End Time Cannot Be Less Than Start Time',
            pattern:"meet_start_time"
          }, 
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
      SmartFields: form_fileds,
      formValidation:this.customValidator()
    }
    return formconfig;
  }


  

  openForm(data: any = null) {
    if(data!=null){
      this.formData = data
    }else{
      this.formData = {};
    }
    let options = {
      title: "New Meeting Creation",
      template: this.createform
    };
    let dialog_options = default_form_dialog(options);
    // dialog_options.width = 90;
    this.smartDialog.openDialog(dialog_options)
  }

  /***  all api related functions */
  getMeetTypes() {
    let url = get_api_route("SITE_TYPE_GET_ALL_SELECT") + "MeetTypes";
    this.api.smartGet(url).subscribe((res: any) => {
      this.meetRoomTypes = res;
      this.meetRoom = this.meetRoomTypes[0]?.value;
      this.getCalenderTableData();
    });
  }

  get meetRoomTitle() {
    return this.meetRoomTypes ? this.meetRoomTypes.filter(obj => obj.value == this.meetRoom)[0]?.label : "";
  }



  getTableData() {
    this.api.smartGet(this.modeData?.url).subscribe((res: any) => {
      this.tableData = res;
    });
  }


  submitData(data) {
    this.api.smartPost('SITE_MEETROOM_INSERT', data).subscribe((res: any) => {
      // this.modalService.dismissAll();
      this.smartDialog.closeDialog();
      this.notify.success("Meeting created successfully");
      this.getCalenderTableData();
      this.getTableData();
    });
  }


  updateDate(data) {
    let id = data.ID !== undefined ? data.ID : 0;
    let update_url = get_api_route("SITE_MEETROOM_UPDATE");
    data["id"] = id;
    this.api.smartPost(update_url, data).subscribe((res: any) => {
      //  console.log('data ', res);
      //this.modalService.dismissAll();
      this.smartDialog.closeDialog();
      this.notify.success("Meeting updated successfully");
      this.getTableData();
    });
  }

  delete_one() {
    let deleteUrl = get_api_route("SITE_MEETROOM_DELETE_ONE");
    this.api.smartPost(deleteUrl, { id: this.selectedId }).subscribe((data) => {
      this.notify.success("Deleted successfully");
      this.getTableData();
    })

  }

  cancel_one() {
    let deleteUrl = get_api_route("SITE_MEETROOM_CANCEL_ONE");
    this.api.smartPost(deleteUrl, { id: this.selectedId }).subscribe((data) => {
      this.notify.success("Cancelled successfully");
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

  
  openCancelCustomDialog() {
    let dialog_options = default_delete_dialog("Do you want to Cancel?", "The Action Cannot Be Reverted");
    this.smartDialog.openDialog(dialog_options)
      .confirmed.subscribe((data) => {
        if (data.action == "yes") {
          this.cancel_one();
        }
      });
  }
  /**
   * 
   * @param event 
   */
  monthAction(event: any) {
    this.selectedYear = event.year;
    this.selectedMonth = event.month;
    this.getCalenderTableData();
  }
  /**
   * 
   * @param event 
   */
  clickAction(obj: any) {
    this.singleMeetData = obj;
    console.log(this.singleMeetData)
    let options = {
      title: "Meeting Details",
      template: this.meetTemplate
    };
    let dialog_options = default_form_dialog(options);
    // dialog_options.width = 90;
    this.smartDialog.openDialog(dialog_options)
  }



  getCalenderTableData() {
    let data = {
      room_name: this.meetRoom,
      year: this.selectedYear,
      month: this.selectedMonth
    };
    this.api.smartPost('SITE_MEETTOOM_CALANDER', data).subscribe((res: any) => {
      this.meetData = res;
    });
  }


  meetRoomChange() {
    this.getCalenderTableData();
  }

  viewFormConfig() {
    let form_fileds: SmartFormField[] = [

      {
        type: "text",
        name: "title",
        width: 6,
        label: "Title",
        leftIcon: "fa fa-heading",
        placeHolder: 'Title',
        validations: [
          {
            type: "required",
            msg: "Title is Required"
          }
        ]

      },

      {
        type: "textarea",
        name: "description",
        width: 6,
        label: "Description",
        // leftIcon:"fa fa-audio-description",
        placeHolder: 'Description',
        validations: [
          {
            type: "required",
            msg: "Description is Required"
          }
        ]

      },


      {
        type: "text",
        name: "location",
        width: 6,
        label: "Location",
        leftIcon: "fa fa-location-dot",
        placeHolder: 'Location',
        validations: [
          {
            type: "required",
            msg: "Location is Required"
          }
        ]

      },



    ];

    let formconfig: SmartFormNewConfig = {
      name: "Role list form",
      SmartFields: form_fileds
    }
    return formconfig;
  }

  viewForm(data: any = null) {

    // console.log("hello button clicked")
    // this.modalService.open(this.viewform, { size: 'lg' });
    let options = {
      title: "Details",

      template: this.viewform
    };
    let dialog_options = default_form_dialog(options);
    dialog_options.width = 70;
    this.smartDialog.openDialog(dialog_options)

  }
  openViewForm(data) {
    let id = data.ID !== undefined ? data.ID : 0;
    let get_one = get_api_route("SITE_MEETROOM_ONE");
    this.api.smartPost(get_one, { id: id }).subscribe((res: any) => {
      console.log("single data", res);
      this.viewData = res;
      this.viewForm(data);
    });
  }




  openEditForm(data) {
    let id = data.ID !== undefined ? data.ID : 0;
    let get_one = get_api_route("SITE_MEETROOM_ONE");
    this.api.smartPost(get_one, { id: id }).subscribe((res: any) => {
      //  console.log("single data", res);
      this.editData = res;
      this.editForm();
    });
  }

  editFormConfig() {
    let form_fileds: SmartFormField[] = [

      {
        type: "select",
        width: 12,
        name: "status",
        label: "Status",
        placeHolder: "Please Select",
        selectOptionType: "self",
        selectOptions: [
          { value: 10, label: "Completed" },
          { value: 8, label: "Invalid" }
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
  editForm(data: any = null) {
    let options = {
      title: 'Meeting Rooms',
      template: this.editform,
    };
    let dialog_options = default_form_dialog(options);
    dialog_options.width = 70;
    this.smartDialog.openDialog(dialog_options);
    // console.log('hello button clicked');
    // this.modalService.open(this.viewform, { size: 'lg' });
  }


  customValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const startTime = control.get('meet_start_time');
      const endTime = control.get('meet_end_time');    
      // if (startTime.value == endTime.value) {
      //   endTime.setErrors({mismatch:true});
      //   //console.log("cpc", confirmPassword);
      //   return { 'mismatch': true };
      // }
      if (startTime?.value && endTime?.value && endTime?.value<=startTime?.value){
        // startTime.setErrors({mismatch:true});
        return { 'mismatch': true };

      }
      
      else if (endTime?.value && startTime?.value && startTime?.value>=endTime?.value){
        // endTime.setErrors({mismatch:true});
        return { 'mismatch': true };
        
     
      }
     
       else {
        return null;
      }
    };
  }
}
