import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SmartButtonConfig } from '../../SmartInterfaces/SmartTableNewInterface';


export interface ButtonConfig {
  class: [];
  label: string;
  btn_type: string;
  btn_func: any;
  btn_show: any;
  icon: string;
  // You can add more properties if needed
}

@Component({
  selector: 'app-smart-button',
  templateUrl: './smart-button.component.html',
  styleUrls: ['./smart-button.component.css']
})
export class SmartButtonComponent  {
  @Input('btn_config') config: SmartButtonConfig[];
  @Input('row_data') row_data: any;
  @Output('smartFormOnChange') smartFormOnChange: EventEmitter<any> = new EventEmitter();
  // @Input('row_data') row_data : any;
  constructor() {
     console.log("config coming " , this.config);
  }

 
  /**
   * 
   * @returns 
   */
  getRowData() {
    if (this.row_data !== undefined && this.row_data instanceof Function) {
      return this.row_data();
    } else {
      return this.row_data;
    }
  }


  /**
   * 
   * @param config_index 
   */
  button_click(config_index: number) {
   // setTimeout(() => {
      console.log("button clicked inside ");
      // console.log("button clicked",this.smartFormOnChange);
      let obj = this.config[config_index];
      // added to cater form buttons
      if (obj.formSubmitType == "submit") {
        // console.log("button clicked inside ");
        this.smartFormOnChange.emit(obj);
      } else if (obj.btn_func !== undefined && obj.btn_func instanceof Function) {
        // console.log("entered here ")
        obj.btn_func(this.getRowData());
      }
   // }, 100);
  }
  /**
   * 
   * @param config_index 
   * @returns 
   */
  button_show(config_index: number) {
    let show_flag = true;
    let obj = this.config[config_index];
    if (obj.btn_show !== undefined && obj.btn_show instanceof Function) {
      show_flag = obj.btn_show(this.row_data);
    }
    return show_flag;
  }

}
