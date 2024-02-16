import { TemplateRef } from '@angular/core';
import { SmartButtonConfig } from './SmartTableNewInterface';

interface SmartFormField{
    /**
     * 
     */
    type:"text"|"select"|"textarea"|"checkbox"|"radio"|
    "buttons"|"password"|"template"|"selectmultiple"|"imagecrop"|"button"
    |"date"|"file"|"time"|"selectsearch"|"selectsearchmultiple",
    /**
     * 
     */
    name:string,
    /**
     * 
     */
    label?:string,
    /**
     * 
     */
    labelFunction?:any,
    /**
     * 
     */
    width:number,
    /**
     * 
     */
    leftIcon?:string,
    /**
     * 
     */
    rightIcon?:string,
    /**
     * 
     */
    errorType?:string;
    /**
     * 
     */
    buttons?:SmartButtonConfig[]
    /**
     * 
     */
    placeHolder?:string;
    /**
     * 
     */
    validations?:SmartValidationConfig[];
    /**
     * 
     */
    selectOptionType?:'self'|'api'|'apiPayload'|'Function';
    /**
     * 
     */
    selectOptions?:any[];
     /**
     * 
     */
     selectOptionFunction?:any;
    /**
     * 
     */
    selectOptionApi?:string;
    /**
     * 
     */
    selectOptionParam?:any[];
    /**
     * 
     */
    hideFunction?:Function,
    /**
     * 
     */
    horizontal?:boolean,
    /**
     * 
     */
    template?: TemplateRef<any>,
    /**
     * 
     */
    labelClass?:string,
    /**
     * 
     * 
     */
    controlClass?:string,
    /**
     *  check bos or radio button bulma extenstion class
     */
    checkBoxClass?:string,
    /**
     * 
     */
    disabled_func?:any,
    /**
     *  number of rows in text area
     */
    rows?:number,
    /**
     * 
     */
    buttonFunction?:any
    /**
     * 
     */
    buttonClass?:string
    /**
     * 
     */
    buttonType?:"button"|"icon"|"link",
    /**
     * 
     */
    buttonSubmitType?:"submit"|"general",
    /**
     * 
     */
    buttonShowFunction?:any
    /**
     *  field class
     */
    fieldClass?:string,
    /**
     * 
     */
    onChange?:any,
    /**
     * 
     */
    fileType?:"single" | "multiple",
    /**
     * 
     */
    allowedPattern?:string

    /**
     * 
     */
    filterSettings?:SmartFormFilter
    /**
     * 
     */
    timeSettings?:SmartTimeSettings
    //
    dateSettings?:SmartDateSettings
}

interface SmartFormFilter {
    type: "DATE_FROM"|"DATE_TO"
    field_name?:string
}

interface SmartTimeSettings {
    step?:number,
    minTime?:any,
    maxTime?:any
}

interface SmartDateSettings {
    minDate?:any
}

/**
 * 
 */
interface SmartFieldFunc {
    (item: any, formData: any): any;
}

// tbale configuration properties
interface SmartFormNewConfig {
    name: string;
    fieldIndicationType?:'border'|'borderLeft'|'none'|'label',
    errorType?:"TOP"|"BOTTOM"|"TOPRIGHT"|"TOOLTIP",
    SmartFields:SmartFormField[],
    formValidation?:any
}
/**
 * 
 */
interface SmartValidationConfig{
    type:"required"|"pattern"|"custom"|"minLength"|"maxLength"|
    "min"|"max"|"fileSize"|"fileTypes"|"mismatch"|"imagesize"|'totime'|'fromtime'|'mintime'|'maxtime',
    msg?:string,
    min?:number,
    max?:number,
    patternType?:string,
    pattern?:string,
    fileTypes?:string[],
    custom_function?:Function
}


export {
    SmartFormNewConfig,
    SmartFormField,
    SmartValidationConfig
}