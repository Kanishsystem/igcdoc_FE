import { Component, Input } from '@angular/core';
import { SmartFormField, SmartFormNewConfig } from '../../SmartInterfaces/SmartFormNewInterface';
import { SmartTableMainConfig, SmartTableColumnConfig, SmartTableConfig } from '../../SmartInterfaces/SmartTableNewInterface';
import { get_api_route } from 'src/app/api-services/api-router';
import { SmartapiService } from 'src/app/api-services/smartapi.service';
import { default_delete_dialog } from 'src/app/view/site/helpers/site-defaults';
import { NotifyService } from 'src/app/api-services/common/notify.service';
import { SmartDialogService } from '../../services/smart-dialog.service';
import { SmartListConfig, SmartListUrlConfig } from '../../SmartInterfaces/SmartListInterface';

@Component({
  selector: 'app-smart-list',
  templateUrl: './smart-list.component.html',
  styleUrls: ['./smart-list.component.css']
})
export class SmartListComponent {
  
  @Input('smartFormConfig') smartListConfig: SmartListConfig;
  /** */
  formData:any;
  /**  */
  tableData: any;
  //
  tableConfigNew: SmartTableConfig;
  //
  selectedId:number=0;
  //
  selectedObject:any;
  
  constructor(   
    private api: SmartapiService,
    private notify: NotifyService,
    private smartDialog: SmartDialogService,
  ) { }


  ngOnInit(): void {  
    this.getTableData();
  }

  

  get urls():SmartListUrlConfig{
    return this.smartListConfig?.urls;
  }

  getLabel(obj:any){
    return obj[this.smartListConfig?.dbIndex] ? obj[this.smartListConfig?.dbIndex] : "";
  }
  /**
   * 
   */
  getTableData() {
    let url = get_api_route(this.urls?.getAllUrl)
    this.api.smartGet(url).subscribe((res: any) => {
      this.tableData = res;
      this.selectedId =0;
      this.clearFormData();
    });
  }

  editClick(obj:any) {   
    if(obj.ID==this.formData?.ID){     
      this.clearFormData();
    }else{
      this.formData = obj;
    } 
  }

  clearFormData(){
    let index = this.smartListConfig?.dbIndex ;
    this.formData = {}
    this.formData[index] = "";
  }
  
  /**
   * 
   */
  delete_one() {
    let deleteUrl = get_api_route(this.urls.deleteUrl);
    let data_in = {id: this.selectedId};
    this.api.smartPost(deleteUrl, data_in).subscribe((data) => {
      this.notify.success("Deleted successfully");
      this.getTableData();
    })

  }

  /**
   * 
   */
  openDeleteCustomDialog(id:number) {
    this.selectedId =id;
    let dialog_options = default_delete_dialog("Do you want to Delete ?", "The Action Cannot Be Reverted");
    this.smartDialog.openDialog(dialog_options)
      .confirmed.subscribe((data) => {
        if (data.action == "yes") {
          this.delete_one();
        }
      });
  }


  getButtonLabel(){
    if(this.formData?.ID){
      return this.smartListConfig?.addButtonLabel?this.smartListConfig?.updateButtonLabel :"Update"
    }else{
      return this.smartListConfig?.addButtonLabel?this.smartListConfig?.addButtonLabel :"Add"
    }
  }

  /**
   * 
   * @returns 
   */
  createFormConfig() {
    let form_fileds: SmartFormField[] = [
      {
        type: "text",
        name: this.smartListConfig?.dbIndex,
        width: 9,
        label: "",       
        leftIcon: this.smartListConfig?.formIcon,
        placeHolder:this.smartListConfig?.plaseHolder,
        validations:[
          {
            type:"required",
            msg:"Filed is Required"
          }
        ]
      },    

      {
        type: 'button',
        label: this.getButtonLabel(),
        name: 'add',
        width: 3,
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
      name: "smartList",
      SmartFields: form_fileds
    }
    return formconfig;
  }
  get message(){
    if(this.formData?.ID){
      return "Updated successfully";
    }else{
      return "Added Successfully";
    }
  }

  /**
   * 
   * @param data 
   */
  submitData(data: any) {  
    let formData = data; 
    if(this.smartListConfig.formPreFillData){
      formData = {...this.smartListConfig.formPreFillData,...formData};
    }
    if(this.formData?.ID){
      formData["id"] = this.formData?.ID;
    }
    let url = this.formData?.ID ? this.urls.updateUrl : this.urls.insertUrl;
    this.api.smartPost(url, formData).subscribe((res: any) => {
      this.notify.success(this.message)
       this.getTableData();
       
    });
  }

}
