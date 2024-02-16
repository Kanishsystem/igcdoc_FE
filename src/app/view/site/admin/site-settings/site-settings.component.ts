import { Component } from '@angular/core';
import { get_api_route } from 'src/app/api-services/api-router';
import { NotifyService } from 'src/app/api-services/common/notify.service';
import { SmartapiService } from 'src/app/api-services/smartapi.service';
import {
  SmartFormField,
  SmartFormNewConfig,
} from 'src/app/shared/core/SmartInterfaces/SmartFormNewInterface';
import { SmartListConfig } from 'src/app/shared/core/SmartInterfaces/SmartListInterface';
import {
  SmartTableColumnConfig,
  SmartTableConfig,
  SmartTableMainConfig,
} from 'src/app/shared/core/SmartInterfaces/SmartTableNewInterface';
import { SmartDialogService } from 'src/app/shared/core/services/smart-dialog.service';

@Component({
  selector: 'app-site-settings',
  templateUrl: './site-settings.component.html',
  styleUrls: ['./site-settings.component.css'],
})
export class SiteSettingsComponent {
  tableData: any;
  //
  tableConfigNew: SmartTableConfig;
  //
  formData: any;
  //
  tabSelected: string = 'settings';
  //
  loginData: any;

  //

  // tabs
  tabs = [
    { value: 'settings', label: 'Settings', icon: 'fa fa-gear' },
    // { value: 'email', label: 'Email Settings', icon: 'fa fa-envelope' },
    /*{
      value: 'docs',
      label: 'Document Settings',
      icon: 'fa-regular fa-folder-open',
    },*/
    { value: 'meetroom', label: 'Meeting Room', icon: 'fa fa-handshake-o' },
    // { value: 'organization', label: 'Organization', icon: 'fa fa-sitemap' },
    { value: 'admin', label: 'Administrators', icon: 'fa fa-sitemap' },
    { value: 'home', label: 'Home', icon: 'fa fa-home' },
    { value: 'org', label: 'Organization', icon: 'fa fa-file-pdf-o' },
    { value: 'homeimages', label: 'Home Images', icon: 'fa fa-file-pdf-o' },
    { value: 'history', label: 'History', icon: 'fa fa-file-pdf-o' },
    { value: 'gallery', label: 'Gallery', icon: 'fa fa-file-pdf-o' },
    { value: 'awards', label: 'Awards', icon: 'fa fa-file-pdf-o' },
    { value: 'license_documents', label: 'License Documents', icon: 'fa fa-file-pdf-o' },
    { value: 'forms_documents', label: 'Forms Documents', icon: 'fa fa-file-pdf-o' },
  ];

  ngOnInit(): void {
    this.formData = {};
    this.getTableData();
  }

  constructor(
    private api: SmartapiService,
    private smartDialog: SmartDialogService,
    private notify: NotifyService
  ) {}

  getTableData() {
    this.api.smartGet('SITE_GET_ALL').subscribe((res: any) => {
      this.formData = res;
    });
  }

  createDocTypeList() {
    let listConfig: SmartListConfig = {
      type: 'URL',
      dbIndex: 'type_value',
      urls: {
        getAllUrl: get_api_route('SITE_TYPE_GET_ALL') + '/DocumentTypes',
        insertUrl: 'SITE_TYPE_INSERT',
        updateUrl: 'SITE_TYPE_UPDATE',
        deleteUrl: 'SITE_TYPE_DELETE_ONE',
      },
      formPreFillData: {
        type_name: 'DocumentTypes',
      },
    };
    return listConfig;
  }

  createMeetTypeList() {
    let listConfig: SmartListConfig = {
      type: 'URL',
      dbIndex: 'type_value',
      urls: {
        getAllUrl: get_api_route('SITE_TYPE_GET_ALL') + '/MeetTypes',
        insertUrl: 'SITE_TYPE_INSERT',
        updateUrl: 'SITE_TYPE_UPDATE',
        deleteUrl: 'SITE_TYPE_DELETE_ONE',
      },
      formPreFillData: {
        type_name: 'MeetTypes',
      },
    };
    return listConfig;
  }

  createorganizationTypeList() {
    let listConfig: SmartListConfig = {
      type: 'URL',
      dbIndex: 'type_value',
      urls: {
        getAllUrl: get_api_route('SITE_TYPE_GET_ALL') + '/OrgTypes',
        insertUrl: 'SITE_TYPE_INSERT',
        updateUrl: 'SITE_TYPE_UPDATE',
        deleteUrl: 'SITE_TYPE_DELETE_ONE',
      },
      formPreFillData: {
        type_name: 'orgTypes',
      },
    };
    return listConfig;
  }

  createcommitiesTypeList() {
    let listConfig: SmartListConfig = {
      type: 'URL',
      dbIndex: 'type_value',
      urls: {
        getAllUrl: get_api_route('SITE_TYPE_GET_ALL') + '/MomTypes',
        insertUrl: 'SITE_TYPE_INSERT',
        updateUrl: 'SITE_TYPE_UPDATE',
        deleteUrl: 'SITE_TYPE_DELETE_ONE',
      },
      formPreFillData: {
        type_name: 'MomTypes',
      },
    };
    return listConfig;
  }

  createFormConfig(...args: []) {
    let form_fileds: SmartFormField[] = [
      {
        type: 'text',
        name: 'site_name',
        width: 8,
        label: 'Site Name',
        leftIcon: 'fa-user',
        placeHolder: 'Title',
        validations: [
          {
            type: 'required',
            msg: 'Title is Required',
          },
        ],
      },
      {
        type: 'text',
        name: 'site_short_title',
        width: 4,
        label: 'Site Short Name',
        leftIcon: 'fa-user',
        placeHolder: 'Short Name',
        validations: [
          {
            type: 'required',
            msg: 'Title is Required',
          },
        ],
      },
      // site_short_title
      {
        type: 'imagecrop',
        width: 12,
        name: 'book_image',
        label: 'Site Logo',
        validations: [
          {
            type: 'required',
            msg: 'Please Browse Site ',
          },
          {
            type: 'imagesize',
            msg: 'Upload image is size should be less than 30 kb',
            max: 10,
          },
        ],
      },
      {
        type: 'textarea',
        name: 'site_footer',
        width: 12,
        label: 'Site Footer',
        // leftIcon: "fa-user",
        // placeHolder: 'Title',
        validations: [
          {
            type: 'required',
            msg: 'Site Footer is Required',
          },
        ],
      },
      {
        type: 'textarea',
        name: 'site_contect_details',
        width: 12,
        label: 'Site Contact Details',
        // leftIcon: "fa-user",
        // placeHolder: 'Title',
        // validations: [
        //   {
        //     type: 'required',
        //     msg: 'Contact Details is Required',
        //   },
        // ],
      },
      {
        type: 'button',
        label: 'Save',
        name: 'Submit',
        width: 4,
        buttonClass: 'smart-action-button is-fullwidth',
        buttonType: 'button',
        buttonSubmitType: 'submit',
        leftIcon: 'fa-check',
        buttonFunction: (data: any) => {
          this.submitData(data);
        },
      },
    ];
    let formconfig: SmartFormNewConfig = {
      name: 'Book List form',
      SmartFields: form_fileds,
    };
    return formconfig;
  }

  loginFormConfig(...args: []) {
    let form_fileds: SmartFormField[] = [
      {
        type: 'text',
        name: 'failed_password_attempts',
        width: 12,
        label: 'Maximum Number Of Failed Password Attempts',
        leftIcon: 'fa fa-unlock-alt',
        placeHolder: 'Maxmium Numbers',
        allowedPattern: '[^1-9]*',
        validations: [
          {
            type: 'required',
            msg: 'Password attempts are required',
          },
          {
            type: 'pattern',
            msg: 'Please enter numbers',
            pattern: '^[0-9]*$',
          },
          {
            type: 'maxLength',
            msg: 'Password attempts are required',
            max: 2,
          },
        ],
      },

      // {
      //   type: 'text',
      //   name: 'password_expiry_days',
      //   width: 12,
      //   label: 'Password Expiry Days',
      //   leftIcon: 'fa fa-key',
      //   placeHolder: 'Password',
      //   validations: [
      //     {
      //       type: 'required',
      //       msg: 'Days required',
      //     },
      //     {
      //       type: 'pattern',
      //       msg: 'Please enter valid days',
      //       pattern: '^[0-9]*$',
      //     },
      //   ],
      // },

      // {
      //   type: 'textarea',
      //   name: 'white_listed_ip_addresses',
      //   width: 12,
      //   label: 'White Listed Ip Addresses',
        
      // },

      {
        type: 'button',
        label: 'Save',
        name: 'Submit',
        width: 4,
        buttonClass: 'smart-action-button is-fullwidth',
        buttonType: 'button',
        buttonSubmitType: 'submit',
        leftIcon: 'fa-check',
        buttonFunction: (data: any) => {
          this.submitData(data);
        },
      },
    ];
    let formconfig: SmartFormNewConfig = {
      name: 'Book List form',
      SmartFields: form_fileds,
    };
    return formconfig;
  }

  administrators(...args: []) {
    let form_fileds: SmartFormField[] = [
      {
        type: 'select',
        name: 'electrical_admin',
        width: 8,
        label: 'Select Electrical Engineer Incharge',
        leftIcon: 'fa-user',
        selectOptionType: 'api',
        selectOptionApi: 'SITE_ROLE_GET_ALL_SELECT',
      },
      {
        type: 'select',
        name: 'telephone_admin',
        width: 8,
        label: 'Select Telephone Engineer Incharge',
        leftIcon: 'fa-user',
        selectOptionType: 'api',
        selectOptionApi: 'SITE_ROLE_GET_ALL_SELECT',
      },
      {
        type: 'select',
        name: 'network_admin',
        width: 8,
        label: 'Select Network Engineer Incharge',
        leftIcon: 'fa-user',
        selectOptionType: 'api',
        selectOptionApi: 'SITE_ROLE_GET_ALL_SELECT',
      },
      {
        type: 'select',
        name: 'workshop_admin',
        width: 8,
        label: 'Select Workshop Engineer Incharge',
        leftIcon: 'fa-user',
        selectOptionType: 'api',
        selectOptionApi: 'SITE_ROLE_GET_ALL_SELECT',
      },
      {
        type: 'select',
        name: 'acv_shutdown',
        width: 8,
        label: 'Select Shutdown ACV Engineer Incharge',
        leftIcon: 'fa-user',
        selectOptionType: 'api',
        selectOptionApi: 'SITE_ROLE_GET_ALL_SELECT',
      },
      {
        type: 'select',
        name: 'elec_shutdown',
        width: 8,
        label: 'Select Shutdown Electrical Engineer Incharge',
        leftIcon: 'fa-user',
        selectOptionType: 'api',
        selectOptionApi: 'SITE_ROLE_GET_ALL_SELECT',
      },
      {
        type: 'select',
        name: 'system_admin',
        width: 8,
        label: 'Select System Administrator Role',
        leftIcon: 'fa-user',
        selectOptionType: 'api',
        selectOptionApi: 'SITE_ROLE_GET_ALL_SELECT',
      },
      {
        type: 'button',
        label: 'Save',
        name: 'Submit',
        width: 12,
        buttonClass: 'smart-action-button is-fullwidth',
        buttonType: 'button',
        buttonSubmitType: 'submit',
        leftIcon: 'fa-check',
        buttonFunction: (data: any) => {
          this.submitData(data);
        },
      },
    ];
    let formconfig: SmartFormNewConfig = {
      name: 'Book List form',
      SmartFields: form_fileds,
    };
    return formconfig;
  }

  createFormConfigHome(...args: []) {
    let form_fileds: SmartFormField[] = [
      {
        type: 'text',
        name: 'home_title',
        width: 8,
        label: 'Home-Page Title',
        leftIcon: 'fa-user',
        placeHolder: 'Title',
        validations: [
          {
            type: 'required',
            msg: 'Title is Required',
          },
        ],
      },
      {
        type: 'text',
        name: 'home_content_provider',
        width: 4,
        label: 'Content Manager',
        leftIcon: 'fa-user',
        placeHolder: 'Short Name',
        validations: [
          {
            type: 'required',
            msg: 'Manager Name is Required',
          },
        ],
      },
      // site_short_title
      // {
      //   type: 'imagecrop',
      //   width: 12,
      //   name: 'book_image',
      //   label: 'Site Logo',
      //   validations: [
      //     {
      //       type: 'required',
      //       msg: 'Please Browse Site ',
      //     },
      //     {
      //       type: 'imagesize',
      //       msg: 'Upload image is size should be less than 30 kb',
      //       max: 10,
      //     },
      //   ],
      // },
      {
        type: 'text',
        name: 'home_number',
        width: 12,
        label: 'Phone Number',
        leftIcon: 'fa fa-phone',
        placeHolder: 'Phone Number',
        validations: [
          {
            type: 'required',
            msg: 'Phone Number is Required',
          },
        ],
      },
      {
        type: 'textarea',
        name: 'home_address',
        width: 12,
        label: 'Address',
        // leftIcon: 'fa-user',
        placeHolder: 'Address',
        validations: [
          {
            type: 'required',
            msg: 'Address is Required',
          },
        ],
      },
      {
        type: 'textarea',
        name: 'home_content',
        width: 12,
        label: 'Content of Home-Page',
        // leftIcon: "fa-user",
        // placeHolder: 'Title',
        validations: [
          {
            type: 'required',
            msg: 'Title is Required',
          },
        ],
      },
      {
        type: 'button',
        label: 'Save',
        name: 'Submit',
        width: 4,
        buttonClass: 'smart-action-button is-fullwidth',
        buttonType: 'button',
        buttonSubmitType: 'submit',
        leftIcon: 'fa-check',
        buttonFunction: (data: any) => {
          this.submitData(data);
        },
      },
    ];
    let formconfig: SmartFormNewConfig = {
      name: 'Book List form',
      SmartFields: form_fileds,
    };
    return formconfig;
  }

  EmailFormConfig(...args: []) {
    let form_fileds: SmartFormField[] = [
      {
        type: 'text',
        name: 'server_ip',
        width: 6,
        label: 'Server IP',
        // leftIcon: "fa-user",
        placeHolder: 'Server IP',
        leftIcon: 'fa-user',
        // allowedPattern: '[^1-9]*',
        validations: [
          {
            type: 'required',
            msg: 'IP required',
          },
          // {
          //   type: 'pattern',
          //   msg: 'Please enter numbers',
          //   pattern: '^[0-9]*$',
          // },
          // {
          //   type: 'maxLength',
          //   msg: 'Password attempts are required',
          //   max: 2,
          // },
        ],
      },

      {
        type: 'text',
        name: 'server_user',
        width: 6,
        label: 'Server User',
        // leftIcon: "fa-user",
        leftIcon: 'fa fa-server',
        placeHolder: 'Server User',
        validations: [
          {
            type: 'required',
            msg: 'User required',
          },
          // {
          //   type: 'pattern',
          //   msg: 'Please enter valid days',
          //   pattern: '^[0-9]*$',
          // },
        ],
      },

      {
        type: 'password',
        name: 'server_password',
        width: 6,
        label: 'Server Password',
        leftIcon: 'fa-eye',
        placeHolder: 'Type Of Password',
        validations: [
          {
            type: 'required',
            msg: 'Password required',
          },
          // {
          //   type: 'pattern',
          //   msg: 'Please enter valid days',
          //   pattern: '^[0-9]*$',
          // },
        ],
      },

      {
        type: 'text',
        name: 'server_port',
        width: 6,
        label: 'Server port',
        leftIcon: 'fa fa-list-ol',
        placeHolder: 'Server Number',
        validations: [
          {
            type: 'required',
            msg: 'Port required',
          },
          // {
          //   type: 'pattern',
          //   msg: 'Please enter valid days',
          //   pattern: '^[0-9]*$',
          // },
        ],
      },

      {
        type: 'button',
        label: 'Save',
        name: 'Submit',
        width: 4,
        buttonClass: 'smart-action-button is-fullwidth',
        buttonType: 'button',
        buttonSubmitType: 'submit',
        leftIcon: 'fa-check',
        buttonFunction: (data: any) => {
          this.submitData(data);
        },
      },
    ];
    let formconfig: SmartFormNewConfig = {
      name: 'Book List form',
      SmartFields: form_fileds,
    };
    return formconfig;
  }

  getDocSettingsForm() {
    let form_fileds: SmartFormField[] = [
      {
        type: 'text',
        name: 'doc_max_size',
        width: 12,
        label: 'Enter Document Maximum Size Allowed (Default 10 MB)',
        leftIcon: 'fa-user',
        placeHolder: 'Ex:250 MB',
        validations: [
          {
            type: 'required',
            msg: 'Title is Reuqired',
          },
        ],
      },
      {
        type: 'text',
        name: 'doc_extenstions',
        width: 12,
        label: 'Document Extentions Allowed (Default PDF) (comma seperated)',
        leftIcon: 'fa-user',
        placeHolder: 'Enter Extenstions with (,) seperations',
        validations: [
          {
            type: 'required',
            msg: 'Field is Required',
          },
        ],
      },
      {
        type: 'button',
        label: 'Save',
        name: 'Submit',
        width: 4,
        buttonClass: 'smart-action-button is-fullwidth',
        buttonType: 'button',
        buttonSubmitType: 'submit',
        leftIcon: 'fa-check',
        buttonFunction: (data: any) => {
          this.submitData(data);
        },
      },
    ];
    let formconfig: SmartFormNewConfig = {
      name: 'Book List form',
      SmartFields: form_fileds,
    };
    return formconfig;
  }

  createOrgList() {
    let form_fileds: SmartFormField[] = [
      {
        type: 'file',
        width: 12,
        label: 'Browse the Document(First Chart)',
        name: 'uploaded_file_org_one',
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
            fileTypes: ['pdf'],
          },
          {
            type: 'fileSize',
            msg: 'File size should be less tha 10 MB',
            max: 10,
          },
        ],
      },
      {
        type: 'file',
        width: 12,
        label: 'Browse the Document(Second chart)',
        name: 'uploaded_file_org_two',
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
            fileTypes: ['pdf'],
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
        label: 'Save',
        name: 'Submit',
        width: 4,
        buttonClass: 'smart-action-button is-fullwidth',
        buttonType: 'button',
        buttonSubmitType: 'submit',
        leftIcon: 'fa-check',
        buttonFunction: (data: any) => {
          this.submitDataPdfs(data);
        },
      },
    ];
    let formconfig: SmartFormNewConfig = {
      name: 'Book List form',
      SmartFields: form_fileds,
    };
    return formconfig;
  }

  createFormHomeImages(...args: []) {
    let form_fileds: SmartFormField[] = [     
      // site_short_title
      {
        type: 'imagecrop',
        width: 6,
        name: 'home_image_one',
        label: 'Select Home Image (1)',
        validations: [
          {
            type: 'required',
            msg: 'Please Browse Site ',
          },
          {
            type: 'imagesize',
            msg: 'Upload image is size should be less than 30 kb',
            max: 10,
          },
        ],
      },
      {
        type: 'imagecrop',
        width: 6,
        name: 'home_image_two',
        label: 'Select Home Image (2)',
        validations: [
          {
            type: 'required',
            msg: 'Please Browse Site ',
          },
          {
            type: 'imagesize',
            msg: 'Upload image is size should be less than 30 kb',
            max: 10,
          },
        ],
      },
      {
        type: 'imagecrop',
        width: 6,
        name: 'home_image_three',
        label: 'Select Home Image (3)',
        validations: [
          {
            type: 'required',
            msg: 'Please Browse Site ',
          },
          {
            type: 'imagesize',
            msg: 'Upload image is size should be less than 30 kb',
            max: 10,
          },
        ],
      },
      {
        type: 'imagecrop',
        width: 6,
        name: 'home_image_four',
        label: 'Select Home Image (4)',
        validations: [
          {
            type: 'required',
            msg: 'Please Browse Site ',
          },
          {
            type: 'imagesize',
            msg: 'Upload image is size should be less than 30 kb',
            max: 10,
          },
        ],
      },
    
      {
        type: 'button',
        label: 'Save',
        name: 'Submit',
        width: 4,
        buttonClass: 'smart-action-button is-fullwidth',
        buttonType: 'button',
        buttonSubmitType: 'submit',
        leftIcon: 'fa-check',
        buttonFunction: (data: any) => {
          this.submitData(data);
        },
      },
    ];
    let formconfig: SmartFormNewConfig = {
      name: 'Book List form',
      SmartFields: form_fileds,
    };
    return formconfig;
  }

  submitDataPdfs(data) {
    let formData = this.api.preparePostData(data);
    formData.append("uploaded_file_org_one",data["uploaded_file_org_one"]);
    formData.append("uploaded_file_org_two",data["uploaded_file_org_two"]);
    this.api.smartPost('SITE_INSERT_ORG', formData, false, false, "multipart/form-data").subscribe((res: any) => {
     // this.smartDialog.closeDialog();
      this.notify.success("Submitted successfully");
     // this.getTableData();
    });
    
  }

  submitData(data) {
    let formData = data;
    this.api.smartPost('SITE_INSERT', formData).subscribe((res: any) => {
      //this.smartDialog.closeDialog();
      this.notify.success('saved successfully');
    });
  }
}
