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
import { get_api_full_route, get_api_route } from 'src/app/api-services/api-router';

@Component({
  selector: 'app-home-images',
  templateUrl: './home-images.component.html',
  styleUrls: ['./home-images.component.css']
})
export class HomeImagesComponent {
  @ViewChild('createform') createform: any;
  @ViewChild('imageTemplate', { static: true })  imageTemplate: TemplateRef<any>;
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
  //
  imageUrl = "";

  ngOnInit(): void {
    this.imageUrl = get_api_full_route("HOME_IMAGES_GET_ONE_IMAGE")
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
     // colsearch: true,
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
        type: 'template',
        title: 'Image',
        tbody: 'members_role_id',
        width: '40%',
        template: this.imageTemplate,
      },
      {
        type: 'buttons',
        title: 'Actions',
        width: '5%',
        btn_config: [
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
      /*
      {
        type: "imagecrop",
        name: "home_image",
        label: " Activity Image",
        width: 6,
        // leftIcon: "fa fa-file-signature",
        placeHolder: 'Image',
        validations: [
          {
            type: "required",
            msg: "Image is Required"
          },
          {
            type: 'imagesize',
            msg: "Upload image is size should be lessthan 2 mb" ,
            max:2,
          },

        ]

      },*/
      {
        type: 'file',
        width: 12,
        label: 'Browse the Image',
        name: 'uploaded_file',
        leftIcon: 'fa fa-file',
        placeHolder: 'Browse File',
        validations: [        
          {
            type: 'fileTypes',
            msg: 'only png/jpeg is Required',
            fileTypes: ['png', 'jpeg','jpg'],
          }       
        ],
      },

      {
        type: 'button',
        label: 'Add',
        name: 'Submit',
        width: 12,
        buttonClass: 'smart-action-button is-fullwidth',
        buttonType: 'button',
        buttonSubmitType: 'submit',
        leftIcon: 'fa-check',
        buttonFunction: (data: any) => {
          this.submitData(data);
        }      
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
      title: 'Home Images Form',
      template: this.createform,
    };
    let dialog_options = default_form_dialog(options);
    dialog_options.width = 70;
    this.smartDialog.openDialog(dialog_options);
  }

  openEditForm(data) {
    let id = data.ID !== undefined ? data.ID : 0;
    let get_one = get_api_route('HOME_IMAGES_GET_ONE');
    this.api.smartPost(get_one, { id: id }).subscribe((res: any) => {
      // this.formData = res;
      this.openForm(res);
    });
  }

  getTableData() {
    this.api.smartGet('HOME_IMAGES_GET_ALL').subscribe((res: any) => {
      this.tableData = res;
    });
  }

  submitData(data) {
    let formData = this.api.preparePostData(data);
    formData.append('uploaded_file', data['uploaded_file']);
    this.api
      .smartPost(
        'HOME_IMAGES_INSERT',
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
    let update_url = get_api_route('HOME_IMAGES_UPDATE');
    data['id'] = id;
    this.api
      .smartPost(
        update_url,
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
    let deleteUrl = get_api_route('HOME_IMAGES_DELETE_ONE');
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
