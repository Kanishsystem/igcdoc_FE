import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, Renderer2 } from '@angular/core';
import { SmartFormField } from '../../../SmartInterfaces/SmartFormNewInterface';

@Component({
  selector: 'app-smart-select',
  templateUrl: './smart-select.component.html',
  styleUrls: ['./smart-select.component.css']
})
export class SmartSelectComponent implements OnInit{
  // input and output options 
  @Input("item") item: SmartFormField;
  @Input("selectOptions") selectOptions: any;
  @Input("selectValue") selectValue: any;
  @Output("selectCheckedList") selectedCheckedList = new EventEmitter();
  @ViewChild('filterInput', { static: false }) filterInput: ElementRef;
  // form control
  showDropDown: Boolean = false;
  //
  checkedList: any[];
  //
  filterText = ''; 
 

  constructor(private renderer2: Renderer2) {
    this.checkedList = [];
  }

  openFocus(){
    console.log("tesitng things");
    this.renderer2.selectRootElement(this.filterInput.nativeElement).focus();

  }

  ngOnInit(){
    if(Array.isArray(this.selectValue)){
      this.checkedList = this.selectValue;
    }else{
      this.checkedList = [];
    }  
    console.log("select value " , this.selectValue);
    //console.log("checked list " , this.checkedList, " split value " , this.selectValue.split(","));
  }

  /**
   * 
   * @param opt_value 
   * @returns 
   */
  getOptLabels() {
    let labels = [];
    for (let i = 0; i < this.selectOptions.length; i++) {
      if (this.checkedList.includes(this.selectOptions[i]["value"])) {
        labels.push(this.selectOptions[i]["label"]);
      }
    }
    return labels;
  }


  get selectLabel() {
    if (this.checkedList.length > 0) {
      return this.getOptLabels()
    }
    return [];
   // return this.item.placeHolder !== undefined ? this.item.placeHolder : "";
  }

  getSelectedValue(value: String, event: any) {
    if (event.target.checked) {
      this.checkedList.push(value);
    } else {
      var index = this.checkedList.indexOf(value);
      this.checkedList.splice(index, 1);
    }
     //share checked list
    this.shareCheckedList();
    // 
    this.filterText = '';
  }
/**
 * 
 * @param index 
 */
  removeOption(index:number){  
    this.checkedList.splice(index, 1);
  }

  getCheckedStatus(value:any){
      let filtered_content = this.checkedList.filter(obj => obj.value==value);
      return filtered_content.length > 0 ? true : false;
  }


  shareCheckedList() {
    // updating the selected list
    this.selectedCheckedList.emit({name:this.item.name , value:this.checkedList});
  }

  /**
   * 
   * @returns 
   */
  get getSelectOptions() {
    if (Array.isArray(this.selectOptions)) {
      if(this.filterText.length > 0){
        return this.selectOptions.filter(opt =>
          opt.label.toLowerCase().includes(this.filterText.toLowerCase())
        );
      }else{
      return this.selectOptions;
      }
    }
    return [];
  }


}
