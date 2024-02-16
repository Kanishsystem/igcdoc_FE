import { Component, TemplateRef, ViewChild } from '@angular/core';
import { CommonService } from 'src/app/api-services/common/common.service';
import { NotifyService } from 'src/app/api-services/common/notify.service';
import { SmartapiService } from 'src/app/api-services/smartapi.service';
import {
  SmartFormField,
  SmartFormNewConfig,
} from 'src/app/shared/core/SmartInterfaces/SmartFormNewInterface';
import {
  SmartTableColumnConfig,
  SmartTableConfig,
  SmartTableMainConfig,
} from 'src/app/shared/core/SmartInterfaces/SmartTableNewInterface';
import { SmartDialogService } from 'src/app/shared/core/services/smart-dialog.service';
import {
  default_delete_dialog,
  default_form_dialog,
  default_iframe_dialog,
} from '../../helpers/site-defaults';
import { get_api_route } from 'src/app/api-services/api-router';

@Component({
  selector: 'app-meet-types',
  templateUrl: './meet-types.component.html',
  styleUrls: ['./meet-types.component.css'],
})
export class MeetTypesComponent {
  @ViewChild('createform') createform: any;
  @ViewChild('membersTemplate', { static: true })
  membersTemplate: TemplateRef<any>;
  @ViewChild('adminTemplate', { static: true }) adminTemplate: TemplateRef<any>;
  constructor(
    private api: SmartapiService,
    private smartDialog: SmartDialogService,
    private notify: NotifyService,
    private common: CommonService
  ) {}

  tableData: any;
  //
  tableConfigNew: SmartTableConfig;

  formData: any;
  //
  selectedId: number = 0;
  //
  currentYear: number = 2023;

  ngOnInit(): void {
    this.createTable();
    this.getTableData();
  }

  createTable() {
    let table_config: SmartTableMainConfig = {
      name: 'Role-Management',
      title: 'Vendors Details',
      table_class: 'smart-responsive',
      download: true,
      showentries: true,
      currentpage: true,
      colsearch: true,
      search:true,
      pagination: true,
      showEntriesClass: 'is-8',
      search_bar_placeholder: 'Search Meet Type',
      searchBarClass: 'col-4 ',
      buttonBarClass: 'col-1 d-flex justify-content-end',
      no_results: {
        title: 'No Meetings Found',
        sub_title: 'Create a New Meeting',
        icon: 'fa fa-user',
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
        title: 'Type',
        tbody: 'type',
        width: '10%',
      },

      {
        type: 'template',
        title: 'Members',
        tbody: 'members_role_id',
        width: '40%',
        template: this.membersTemplate,
      },

      {
        type: 'template',
        title: 'Chairman,Secretary',
        tbody: 'members_role_id',
        width: '40%',
        template: this.adminTemplate,
      },
      {
        type: 'link',
        title: 'committee File',
        tbody: 'view',
        export: true,
        onClick: (data) => {
          this.openPdfView(data);
        },
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
            icon: ['fa-pencil-square-o'],
            btn_func: (data) => {
              // here impliments
              this.openEditForm(data);
            },
          },

          {
            type: 'button',
            label: '',
            class: ['has-text-danger', 'is-small'],
            btn_type: 'icon',
            icon: [' fa-trash'],
            btn_func: (data) => {
              //console.log("data ", data);
              this.selectedId = data['ID'] !== undefined ? data['ID'] : 0;
              this.openDeleteCustomDialog();
            },
          },
        ],
      },
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
        name: 'role_name',
        label: 'Role Name',
        // leftIcon: 'fa-user',
        placeHolder: 'Role Name',
      },
    ];
    return filterConfig;
  }

  openPdfView(data) {
    let id = data?.ID !== undefined ? data?.ID : 0;
    let options = {
      title: 'PDF Viewer',
      iframe: get_api_route('SITE_MOMTYPE_GET_PDF'),
    };
    let dialog_options = default_iframe_dialog(options);
    dialog_options.iframe_payload = { id: id };
    this.smartDialog.openDialog(dialog_options);
  }

  createFormConfig() {
    let form_fileds: SmartFormField[] = [
      {
        type: 'text',
        name: 'type',
        width: 12,
        label: 'Type',
        placeHolder: 'Type',
        validations: [
          {
            type: 'required',
            msg: 'Type is Required',
          },
        ],
      },

      {
        type: 'selectsearch',
        width: 12,
        label: 'Select Members Role',
        name: 'member_role_id',
        selectOptionType: 'api',
        selectOptionApi: 'SITE_ROLE_GET_ALL_SELECT',
      },

      {
        type: 'selectsearch',
        width: 12,
        label: 'Select Chairman,Secretary',
        name: 'admin_role_id',
        selectOptionType: 'api',
        selectOptionApi: 'SITE_ROLE_GET_ALL_SELECT',
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
            type: 'required',
            msg: 'Please Browse the File',
          },
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
        label: 'Submit Committee',
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
      name: 'momtype form',
      SmartFields: form_fileds,
    };
    return formconfig;
  }

  openForm(data: any = null) {
    if (data != null) {
      this.formData = data;
    } else {
      this.formData = {};
    }
    let options = {
      title: 'Committee Form',
      template: this.createform,
    };
    let dialog_options = default_form_dialog(options);
    dialog_options.width = 70;
    this.smartDialog.openDialog(dialog_options);
  }

  openEditForm(data) {
    let id = data.ID !== undefined ? data.ID : 0;
    let get_one = get_api_route('SITE_MOMTYPE_GET_ONE');
    this.api.smartPost(get_one, { id: id }).subscribe((res: any) => {
      // this.formData = res;
      this.openForm(res);
    });
  }

  getTableData() {
    this.api.smartGet('SITE_MOMTYPE_GET_ALL').subscribe((res: any) => {
      this.tableData = res;
    });
  }

  submitData(data) {
    let formData = this.api.preparePostData(data);
    formData.append('uploaded_file', data['uploaded_file']);
    this.api
      .smartPost(
        'SITE_MOMTYPE_INSERT',
        formData,
        false,
        false,
        'multipart/form-data'
      )
      .subscribe((res: any) => {
        this.smartDialog.closeDialog();
        this.notify.success('Submitted successfully');
        this.getTableData();
      });
  }

  updateDate(data) {
    let formData = this.api.preparePostData(data);
    formData.append('uploaded_file', data['uploaded_file']);
    let id = data.ID !== undefined ? data.ID : 0;
    let update_url = get_api_route('SITE_MOMTYPE_UPDATE');
    data['id'] = id;
    this.api
      .smartPost(
        'SITE_MOMTYPE_UPDATE',
        formData,
        false,
        false,
        'multipart/form-data'
      )
      .subscribe((res: any) => {
        this.notify.success('Updated successfully');
        this.smartDialog.closeDialog();
        this.getTableData();
      });
    // this.api.smartPost(update_url, formData).subscribe((res: any) => {
    //   this.notify.success("Updated successfully");
    //   this.smartDialog.closeDialog();
    //   this.getTableData();
    // });
  }

  delete_one() {
    let deleteUrl = get_api_route('SITE_MOMTYPE_DELETE_ONE');
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
}
