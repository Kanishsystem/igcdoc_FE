import { TemplateRef } from '@angular/core';
import { SmartFormField } from './SmartFormNewInterface';
// tbale configuration properties
interface SmartTableMainConfig {
    /**
     * The name of the person.
     *
     * @remarks This property holds the full name of the person.
     */
    table_class?: string; // Table css class name for which styles can be added in host componenet
    /**
     * 
     */
    name: string;
    /**
     * 
     */
    width?:string;
    /**
     * 
     */
    title: string;
    /**
     * 
     */
    download?: boolean;
    /**
     * 
     */
    search?: boolean;
    /**
     * 
     */
    showentries?: boolean;
    /**
     * 
     */
    currentpage?: boolean;
    /**
     * 
     */
    refresh?: boolean;
    /**
     * 
     */
    showingentries?: boolean;
    /**
     * 
     */
    sorting?: boolean;
    /**
     * 
     */
    pagination?: boolean;
    /**
     * 
     */
    add?: boolean;
    /**
     * 
     */
    colsearch?: boolean;
    /***
     * 
     */
    excelcond?: boolean;
    /**
     * 
     */
    settings?: boolean;
    /**
     * 
     */
    buttons_tempalte?: TemplateRef<any>,
    /**8
     * 
     */
    showEntriesClass?: string,
    /**
     * 
     */
    searchBarClass?: string,
    /**
     * 
     */
    search_bar_placeholder?:string,
    /**
     * 
     */
    buttonBarClass?: string,
    /**
     * 
     */
    count?:number
    /**
     * Table URL : to fetch the data and update the table data if this is used then table data will be updated
     */
    tableUrl?:string,
    /**
     * 
     */
    headerDisable?:boolean,
    /**
     * 
     */
    no_results?:{
        title?:string,
        icon?:string,
        sub_title?:string
    }
}
// smart table 
interface SmartButtonConfig{
   type: "button", 
   label?: string, 
   class?: string[], 
   btn_type?: "button"|"buttonright"|"icon"|"link",
   btn_func?: any,
   btn_show?:any,
   icon?:string[],
   formSubmitType?:"submit"|"normal"      
}


interface SmartTableColumnConfig {
    type:'db'|'date'|'buttons'|'template'|'tag'|'image'|'sno'|'buttonsAction'|'link';
    title:string;
    tbody?:string;
    width?: string;
    filter?: true,
    export?: true,
    th_class?:string;   
    td_class?:string;
    template?: TemplateRef<any>;
    btn_config?:SmartButtonConfig[],
    customFormat?:boolean,
    format?:string,
    tagCond?:SmartTagField[],
    onClick?:Function
}
/**
 * 
 */
interface SmartTagField{
    comp?:string,
    tagClass?:string,
    tagText?:string
}


interface SmartTableDataFunc {
    (input_param: any, call_back_func: any): any;
}

interface SmartTableConfig{
    data_func?:SmartTableDataFunc;
    tableconfig:SmartTableMainConfig,
    config:SmartTableColumnConfig[],
    filterConfig?:SmartFormField[],
    filterData?:any
} 

export {
    SmartTableMainConfig,
    SmartTableColumnConfig,
    SmartButtonConfig,
    SmartTableConfig
}