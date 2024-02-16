import { Component, Input, EventEmitter, Output, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, } from '@angular/forms';
import { NotifyService } from 'src/app/api-services/common/notify.service';

@Component({
  selector: 'app-smart-form',
  templateUrl: './smart-form.component.html',
  styleUrls: ['./smart-form.component.css']
})
export class SmartFormComponent implements OnInit {
  @Output('smartFormData') smartFormData: EventEmitter<any> = new EventEmitter();
  @Output('smartFormOnChange') smartFormOnChange: EventEmitter<any> = new EventEmitter();
  @Input('smartFormConfig') smartFormConfig: any
  smartForm: FormGroup
  filterForm: any = []
  formFileds: any = []
  isSubmitted: boolean = false

  constructor(
    private notify: NotifyService
  ) { }

  ngOnChanges(): void {
    this.ngOnInit()
  }

  ngOnInit(): void {
    this.createDynamicForm()
  }

  ngAfterViewInit() {
    this.createDynamicForm()
  }

  get smartFormControl() {
    return this.smartForm.controls
  }

  createDynamicForm() {
    const formFileds = this.getFormFields();
    this.smartForm = new FormGroup(formFileds)
  }

  getFormFields() {
    const formGroupFields = {}
    for (let fileds of this.smartFormConfig) {
      if (fileds.type != 'button') {
        let validations: any = this.generateFormValidation(fileds.validations)
        formGroupFields[fileds.name] = new FormControl(fileds?.default ? fileds?.default : null, validations)
        this.formFileds.push(fileds)
      }
    }
    return formGroupFields
  }

  generateFormValidation(validation) {
    if (validation) {
      const validators = Object.keys(validation).map((rule) => {
        switch (rule) {
          case "required":
            return Validators.required;
          case "minLength":
            return Validators.minLength(validation[rule]);
          case "maxLength":
            return Validators.maxLength(validation[rule]);
          case "pattern":
            return Validators.pattern(validation[rule]);
        }
      });
      return validators
    }
    return []
  }

  smartOnChange(data) {
    this.smartFormOnChange.emit({ onchange: data, data: this.smartForm.getRawValue() })
  }

  smartFormSubmit() {
    this.isSubmitted = true
    if (this.smartForm.valid) {
      this.smartFormData.emit(this.smartForm.getRawValue())
    } else {
      this.notify.error("Please Fill The Required Fields")
    }
  }
}
