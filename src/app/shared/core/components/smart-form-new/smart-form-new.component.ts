import { Component, OnInit, Input, TemplateRef, OnChanges, SimpleChanges } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import {
  SmartFormField,
  SmartFormNewConfig,
  SmartValidationConfig,
} from '../../SmartInterfaces/SmartFormNewInterface';
import { NotifyService } from 'src/app/api-services/common/notify.service';
import { SmartButtonConfig } from '../../SmartInterfaces/SmartTableNewInterface';
import { SmartapiService } from 'src/app/api-services/smartapi.service';
import { CommonService } from 'src/app/api-services/common/common.service';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-smart-form-new',
  templateUrl: './smart-form-new.component.html',
  styleUrls: ['./smart-form-new.component.css'],
})
export class SmartFormNewComponent implements OnInit, OnChanges {
  /**
   *
   */
  @Input('smartFormConfig') smartFormConfig: SmartFormNewConfig;

  @Input('smartFormData') smartFormData: any;
  /**
   *  main form
   */
  smartForm: FormGroup;
  /**
   *
   */
  isSubmitted: boolean = false;
  /**
   *
   */
  selectOptions: any[] = [];
  /**
   * 
   */
  allowPatterns:any[]=[];
  /**
   * 
   */

  passWordEye:any[]=[];

  minDate:any;

    /**
   * 
   */
    requiredStar:any[] = [];

    options: any[] = [{_id: '1', status: 'waiting'},
    {_id: '2', status: 'open'},
    {_id: '3', status: 'in_progress'},
    {_id: '4', status: 'close'}];

  /**
   *
   * @param fb
   * @param notify
   */
  constructor(
    private fb: FormBuilder,
    private notify: NotifyService,
    private api: SmartapiService,
    private common: CommonService,
    private calendar: NgbCalendar
  ) {
    this.smartForm = this.fb.group({});
    this.minDate = this.calendar.getToday();
  }
  ngOnChanges(changes: SimpleChanges): void {
  //  console.log("componenet is changing too much");
    if (changes.smartFormData) {
      this.updateFiledData();
    }
    //  throw new Error('Method not implemented.');
  }

  updateFiledData() {    
    if (this.smartFormData != null) {
      for (const key in this.smartFormData) {
        if (this.smartFormData.hasOwnProperty(key)) {
          const value = this.smartFormData[key];
          this.updateFieldValue(key, value);
        }
      }
    } else {
      this.smartForm.reset();      
    }
  }

  onSelect(event) {
    this.smartForm.patchValue({ sd_org_id: event });
  }

  /**
   *
   */
  ngOnInit(): void {


    this.smartFormConfig?.SmartFields.forEach((item) => {
      if (this.checkFormElement(item)) {
        let value = this.getValue(item);
       // console.log("value = " , value);
        this.smartForm.addControl(
          item.name,
          this.fb.control(value, this.getValidations(item))
        );
        // check for enable or disbable on page load
         this.enableOrDisableSingleField(item);
      }
      // if select update the api
      if (
        item.type === 'select' ||
        item.type === 'selectsearch' ||
        item.type ==='selectsearchmultiple' ||
        item.type === 'radio' ||
        item.type === 'selectmultiple'
      ) {
        this.updateSelectBoxOptions(item);
        
      }
    });

    /*
    setTimeout(() => {
      this.smartForm.controls['sd_org_id'].setValue(2);
      console.log( "test", this.smartForm.controls['sd_org_id'].value)
  }, 1000);*/
    // console.log("form group " ,  this.smartForm);

    // recongnise for changes
    this.smartForm.valueChanges.subscribe((newValues) => {
      // check all fileds disable or enable on form element change
      this.checkFieldsDisable(newValues);
      // console.log('Form values changed:', newValues);
    });

    // console.log("valid out ", [Validators.required, Validators.min(0), Validators.max(100)]);
  }



  /**
   *
   * @param item
   * @returns
   */
  getValue(item: SmartFormField) {
    let value = '';
    value =
      this.smartFormData !== undefined &&
        this.smartFormData[item.name] !== undefined
        ? this.smartFormData[item.name]
        : null;
    if (item.type == "date") {
      if (value == null) {
        return null;
      } else {
        return this.common.convertNormalToNgb(value);
      }
      //return null;
    }
    // console.log("item name " , item.name , "value ", value);
    return value;
  }

  /**
   *
   * @param item
   * @returns
   */
  getValidations(item: SmartFormField) {
    let validations = item.validations !== undefined ? item.validations : [];
    let output = [];
    let patterns ={};
    validations.forEach((cond: SmartValidationConfig) => {
      switch (cond.type) {
        case 'required':
          output.push(Validators.required);
          this.requiredStar[item.name] = 1;
          break;
        case 'minLength':
          output.push(Validators.minLength(cond.min));
          patterns['minLength']=cond.min;
          break;
        case 'min':
          output.push(Validators.min(cond.min));
          patterns['min']=cond.min;
          break;
        case 'max':
          output.push(Validators.max(cond.max));
          patterns['max']=cond.max;
          break;
        case 'maxLength':
          output.push(Validators.maxLength(cond.max));
          patterns['maxLength']=cond.max;
          break;
        case 'pattern':
          output.push(Validators.pattern(cond.pattern));
          patterns['pattern']=cond.pattern;
          break;
        case 'fileSize':
          let size = cond.max * 1000 * 1000;
          output.push(this.fileSizeValidator(size));
          break;
        case 'fileTypes':
          output.push(this.fileTypeValidator(cond.fileTypes));
          break;
       case 'imagesize':
            output.push(this.ValidateImageSize(cond.max))
            break;
        case 'totime' : 
            output.push(this.ToTimeValidatorValidator(cond.pattern,"totime"))
            break; 
       case 'fromtime' : 
            output.push(this.ToTimeValidatorValidator(cond.pattern,"fromtime"))
            break; 
       case 'mintime' : 
            output.push(this.minMaxTimeValidatorValidator(cond.pattern,"mintime"))
            break; 
       case 'maxtime' : 
            output.push(this.minMaxTimeValidatorValidator(cond.pattern,"maxtime"))
            break; 
      }
    });
    this.allowPatterns[item.name] = patterns;
    return output;
  }

  private getImageSizeInBytes(base64Image: string): number {
    // Calculate the size of the base64 image in bytes
    const padding = base64Image.charAt(base64Image.length - 2) === '=' ? 2 : base64Image.charAt(base64Image.length - 1) === '=' ? 1 : 0;
    return Math.ceil((base64Image.length / 4) * 3 - padding) / 10;
  }

  ValidateImageSize(max:number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const inputValue = control.value;
      //
      if(inputValue){
        let image_size = this.getImageSizeInBytes(inputValue) / 1000000;
       // console.log("img " , image_size , " in " , max);
        if(image_size > max){
          return {imagesize: true };
        }
      }
      //      
      return null;
    };
  }

  /**
   *
   * @param index
   * @param item
   * @returns
   */
  trackByFn(index, item) {
    return item.name;
  }
  /**
   *
   */
  ngAfterViewInit() { }
  /**
   *
   * @param item
   * @returns
   */
  checkFormElement(item: SmartFormField) {
    let non_form_elements = ['buttons', 'template', "button"];
    return non_form_elements.indexOf(item.type) !== -1 ? false : true;
  }

  /**
   *
   */
  get SmartFieldsConfig() {
    return this.smartFormConfig?.SmartFields !== undefined
      ? this.smartFormConfig.SmartFields
      : [];
  }
  /**
   *
   * @param item
   * @returns
   */
  getLabel(item: SmartFormField) {
    if (
      item.labelFunction !== undefined &&
      item.labelFunction instanceof Function
    ) {
      return item.labelFunction();
    }
    return item.label !== undefined ? item.label : '';
  }

  /**
   *
   * @param item
   */
  updateSelectBoxOptions(item: SmartFormField) {
    // console.log ("update the select box  ",item.name);
    switch (item.selectOptionType) {
      case 'self':
        this.selectOptions[item.name] = item.selectOptions;
        break;
      case 'api':
        this.getSelectOptionsApi(item);
        break;
      default:
        break;
    }
    //   console.log("item options " , this.selectOptions);
  }
  /**
   *
   * @param item
   */
  getSelectOptionsApi(item: SmartFormField) {

    this.api.smartGet(item.selectOptionApi).subscribe((res: any) => {
      this.selectOptions[item.name] = res;
      if(item.type==="selectsearchmultiple"){
        // let selected =  this.selectOptions[item.name] 
          let selected = this.getValue(item);      
           console.log("selected asdfasdf " , selected , " ind " , item.name);
         //  console.log("selected details " , selected);
           this.updateFieldValue(item.name,selected);    
       }
    });
  }
  /**
   *
   * @param item
   * @returns
   */
  getSelectBoxOptions(item: SmartFormField) {
    //console.log("request has eom " ,item.name , this.selectOptions);
    return this.selectOptions !== undefined &&
      this.selectOptions[item.name] !== undefined
      ? this.selectOptions[item.name]
      : [];
  }

  /**
   *
   * @param filed
   * @returns
   */
  getFieldClass(filed: SmartFormField) {
    return filed.fieldClass !== undefined ? filed.fieldClass : "";
  }

  getSubFieldClass(item: SmartFormField) {
    let class_list = [];
    if (item?.horizontal) {
      class_list.push('is-horizontal');
    }
    let errorType = this.smartFormConfig.errorType;
    if (errorType === 'TOPRIGHT') {
      class_list.push('smart-form-field');
    }
    return class_list;
  }
  /**
   *
   * @returns
   */
  getErrorClass() {
    let class_list = [];
    let errorType = this.smartFormConfig.errorType;
    if (errorType === 'TOPRIGHT') {
      class_list.push('smart-tooltip-error');
    }
    return class_list;
  }
  /**
   *
   * @param item
   * @returns
   */
  getLabelClass(item: SmartFormField) {
    let class_list = [];
    if (item.labelClass) {
      class_list.push(item.labelClass);
    }
    if (item.horizontal) {
      class_list.push('field-label is-normal');
    }
    return class_list;
  }
  /**
   * 
   * @param index 
   * @returns 
   */
  getFiledValue(index: any) {
    // let raw
    if (this.smartForm.get(index)) {
      return this.smartForm.get(index).value;
    }
    //console.log("formdata " , this.smartFormData);
    if (this.smartFormData && this.smartFormData[index]) {
      return this.smartFormData[index];
    }
    // this.myForm.get('name').value;
  }
  /**
   * 
   * @param item 
   */
  changeFormFiled(item: SmartFormField) {
    if (item.onChange !== undefined && item.onChange instanceof Function) {
      item.onChange(
        (index: string) => this.getFiledValue(index),
        (index: string, value: any) => this.updateFieldValue(index, value),
        (index: string, type: string) => this.updateValidations(index, type)
      );
    }
  }
  /**
   * 
   * @param index 
   * @param type 
   */
  updateValidations(index: string, type: string) {
    if (type == "ENABLE") {
      // enable validations 
      let items: SmartFormField[] = this.smartFormConfig.SmartFields.filter((obj) => obj.name == index);
      let validations = this.getValidations(items[0]);
      this.smartForm.get(index).setValidators(validations);
      this.smartForm.get(index).updateValueAndValidity();
    } else {
      this.smartForm.get(index).clearValidators();
      this.smartForm.get(index).updateValueAndValidity();
    }
  }


  /**
   *
   * @param filed
   * @returns
   */
  getHideInfo(item: SmartFormField): boolean {
    if (item.hideFunction !== undefined) {
      let item_disable = item.hideFunction(item, (index:any)=>this.getFiledValue(index),this.smartForm);
      if(this.checkFormElement(item)){
        if(item_disable===true){
         this. updateValidations(item.name,"DISABLED");
        }else{
         this. updateValidations(item.name,"ENABLE");
        }          
     }
      return item_disable;
    }
    return false;
  }
  /**
   *
   * @param item
   * @returns
   */
  getControlBoxClass(item: SmartFormField) {
    let class_list = [];
    if (item.leftIcon != undefined) {
      class_list.push('has-icons-left');
    }
    if (item.rightIcon != undefined) {
      class_list.push('has-icons-right');
    }
    if (item.controlClass !== undefined && item.controlClass.length > 1) {
      class_list.push(item.controlClass);
    }
    if(this.smartFormConfig.fieldIndicationType=="label"){
      class_list.push('smart-control-label');
    }
    return class_list;
  }
  /**
   *
   * @param item
   * @returns
   */
  getPlaceHolder(item: SmartFormField) {
    return item.placeHolder !== undefined ? item.placeHolder : '';
  }

  /**
   *
   * @param item
   * @param position
   * @returns
   */
  checkErrorPosition(item: SmartFormField, position: string) {
    let errorType = item.errorType !== undefined ? item.errorType : 'bottom';
    return errorType === position ? true : false;
  }
  /**
   * 
   * @param formData 
   */
  checkFieldsDisable(formData) {
    this.smartFormConfig?.SmartFields.forEach((item) => {
      if (this.checkFormElement(item)) {
        this.enableOrDisableSingleField(item);
      }
    })
  }
  /**
   * 
   * @param item 
   */
  enableOrDisableSingleField(item: SmartFormField) {
    let disable_prop = this.checkDisable(item);
    if (disable_prop == true && this.smartForm.get(item.name).enabled) {
      this.smartForm.get(item.name).disable();
    } else if (disable_prop == false && this.smartForm.get(item.name).disabled) {
      this.smartForm.get(item.name).enable();
    }
  }

  /**
   *
   * @param item
   */
  checkDisable(item: SmartFormField) {
    if (item.disabled_func == undefined) {
      return false;
    }
    // if it is a function send disbaled value after executing function
    if (item.disabled_func instanceof Function) {
      //return item.disabled_func(this.getRowData);
      return item.disabled_func((index:any)=>this.getFiledValue(index))
    }
    // else
    return item.disabled_func;
  }

  /**
   *
   */
  getRowData() {
    return this.smartForm.getRawValue();
  }
  /**
   *
   */
  get smartFormControl() {
    return this.smartForm.controls;
  }
  /**
   * 
   * @param newValue 
   */
  updateFieldValue(name: string, value: any) {
    const field1Control = this.smartForm.get(name);

    if (field1Control instanceof FormControl) {
      field1Control.patchValue(value);
    }
  }

  /**
   *
   * @param item
   * @returns
   */
  checkErrorExists(item: SmartFormField) {
    const filed_control = this.smartForm.get(item.name) as FormControl;
    if (filed_control.errors && (this.isSubmitted || filed_control.touched)) {
      return true;
    }
    return false;
    // FormControl field_test = this.smartForm.controls[item.name];
  }

  /**
   *
   * @param item
   * @returns
   */
  getErrorMsg(item: SmartFormField) {
    const filed_control = this.smartForm.get(item.name) as FormControl;
    let validations = item.validations !== undefined ? item.validations : [];
    let msg = 'filed required';
    // console.log("Processing control:", item.name);
    for (let i = 0; i < validations.length; i++) {
      let cond = validations[i];
      // console.log("Checking validation:", cond.type, "field control ", filed_control.errors);
      if (filed_control.hasError(cond.type.toLowerCase())) {
        // console.log("Entered here - validation:", cond.type);
        //  console.log("Error message:", cond.msg);
        return cond.msg;
      }
    }
    // console.log("No validation errors found for:", item.name);
    // console.log(item.name, "   ",filed_control);
    return msg;
  }

  /**
   *
   */
  smartFormSubmit(obj: SmartFormField) {
    // console.log(this.smartForm.getRawValue());
    this.isSubmitted = true;
    //  console.log("obj  ", obj);
    if (obj.buttonSubmitType !== undefined && obj.buttonSubmitType === 'submit') {
      //  console.log("form valid ", this.smartForm.valid, "errors ", this.smartForm.errors);
      if (this.smartForm.valid) {
        this.executeButtonFunc(obj, this.smartForm.getRawValue());
      } else {
        this.notify.error('Please Fill The Required Fields');
      }
    } else {
      this.executeButtonFunc(obj, this.smartForm.getRawValue());
    }
  }

  executeButtonFunc(obj: SmartFormField, data: any) {
    if (
      this.smartFormData !== undefined &&
      this.smartFormData !== null && 
      this.smartFormData['ID'] !== undefined
    ) {
      data['ID'] = this.smartFormData['ID'];
    }
    if (obj.buttonFunction !== undefined && obj.buttonFunction instanceof Function) {
      obj.buttonFunction(data,this.smartForm);
    }
  }
  /**
   *
   * @param item
   * @returns
   */
  getTemplateName(item: SmartFormField) {
    if (item?.template !== undefined && item.template instanceof TemplateRef) {
      return item.template;
    }
    return null;
  }
  /**
   * 
   * @param item 
   */
  selectCheckedList(item: {}) {
    // console.log('item ', item);
    if (item["name"] !== undefined) {
      this.updateFieldValue(item["name"], item["value"]);
    }
  }


  button_click(obj: SmartFormField) {
    // setTimeout(() => {
    // console.log("button clicked inside ");
    // console.log("button clicked",this.smartFormOnChange);
    // let obj = this.config[config_index];
    // added to cater form buttons
    if (obj.buttonSubmitType == "submit") {
      // console.log("button clicked inside ");
      this.smartFormSubmit(obj);
    } else if (obj.buttonFunction !== undefined && obj.buttonFunction instanceof Function) {
      // console.log("entered here ")
      obj.buttonFunction(this.getRowData());
    }
    // }, 100);
  }

  changePasswordEye(item:SmartFormField){  
    const index = this.passWordEye.indexOf(item.name);
    if (index !== -1) {
      this.passWordEye.splice(index, 1);
    }else{
      this.passWordEye.push(item.name);
    }
   }

   getPassWordEye(index){
    return this.passWordEye.includes(index);
   }



  fileTypeValidator(allowedTypes: string[]) {
    return (control) => {
      const file = control.value;
      if (file) {
        const fileType = file.name?.split('.').pop().toLowerCase();
        if (allowedTypes.indexOf(fileType) === -1) {
          return { filetypes: true };
        }
      }
      return null;
    };
  }

  fileSizeValidator(maxSize: number) {
    return (control) => {
      const file = control.value;
      if (file) {
        const fileSize = file.size;
        if (fileSize > maxSize) {
          return { max: true };
        }
      }
      return null;
    };
  }


  ToTimeValidatorValidator(fromName: string,type:string) {
    return (control) => {
      const current_value = control.value;
     // console.log("current value ", current_value)
      const from_time = this.getFiledValue(fromName);
      //console.log(" from time value " , from_time);
      if (current_value && from_time) {
        if(type=="totime"){
        if(this.isToTimeGreaterThanFromTime(current_value,from_time)){
           return {totime:true}
        }      
      }else{
        if(this.isToTimeGreaterThanFromTime(from_time,current_value)){
          return {fromtime:true}
       } 
      }
      }
      return null;
    };
  }

  minMaxTimeValidatorValidator(timestring: string,type:string) {
    return (control) => {
      const current_value = control.value;  
      if (current_value) {
        if(type=="mintime"){

        if(this.isToTimeGreaterThanFromTime(current_value,timestring)){
           return {maxtime:true}
        }      
      }else{
        //console.log(" given time ", timestring , " currnet_time " , current_value)
        if(this.isToTimeGreaterThanFromTime(timestring,current_value)){
          return {mintime:true}
       } 
      }
      }
      return null;
    };
  }


   isToTimeGreaterThanFromTime(fromTime, toTime) {
    // Parse the time strings into hours and minutes
    const [fromHour, fromMinute] = fromTime.split(':').map(Number);
    const [toHour, toMinute] = toTime.split(':').map(Number);

    // Convert the times to total minutes for easy comparison
    const fromTotalMinutes = fromHour * 60 + fromMinute;
    const toTotalMinutes = toHour * 60 + toMinute;
    
    // Compare the total minutes
    return toTotalMinutes > fromTotalMinutes;
}

}
