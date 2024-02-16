import { DatePipe } from '@angular/common';
import { Component, OnInit, Input, ViewChild, ViewEncapsulation, ElementRef, Output, EventEmitter, OnChanges, SimpleChanges, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import * as XLSX from 'xlsx';
import { SmartTableConfig } from '../../SmartInterfaces/SmartTableNewInterface';
import { SmartapiService } from 'src/app/api-services/smartapi.service';
import { SmartFormField, SmartFormNewConfig } from '../../SmartInterfaces/SmartFormNewInterface';
import { CommonService } from 'src/app/api-services/common/common.service';

@Component({
  selector: 'app-smart-tablenew',
  templateUrl: './smart-tablenew.component.html',
  styleUrls: ['./smart-tablenew.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SmartTablenewComponent {
  @Input() onChangeTrigger: Subject<boolean>
  @Input() serverSide: Subject<boolean>
  // data of the table
  @Input('data') data: any[];
  // configuration 
  @Input('tconfig') tconfig: SmartTableConfig;
  // total count incase of server side  
  @Input('totalCounts') totalCounts: any = 100;
  @Input('totalCount') totCount: number;
  // server side or client side 
  @Input('server') server: boolean = false;

  @Output('bodyAction') bodyAction: EventEmitter<any> = new EventEmitter();
  @Output('headerAction') headerAction: EventEmitter<any> = new EventEmitter();
  @Output('pageChange') pageChange: EventEmitter<any> = new EventEmitter();

  @ViewChild('columnfilter') columnfilter: ElementRef;

  // local variables 

  // table configuration columns and combinations
  tableconfig: any;
  // table data function calls on refresh data or if the server side is enabled on page_click or search also 
  table_data_func: any;
  // table data which holds the data after in ng on init
  table_data: any[];
  //
  filteredClientData:any[];
  // current page
  currentPage: number = 1;
  // show count variable
  count: number = 10;
  // sort variables
  sortColumnName: string = "";
  sortDir = 1;
  page: any = 1;
  // main header details class if the buttons are specified
  buttons_tempalte: boolean = false;
  show_entries_class: string = "column is-6";
  search_bar_class: string = "column is-6";
  buttons_bar_class: string = "column is-4";
  search_bar_placeholder = "Search";

  colspan: string;
  filter: string = ''
  isFilterEnabled: boolean = false

  responsive: boolean = true
  showItems = [2, 5, 10, 25, 50, 100, 500, 1000]
  maxSize: number = 7;

  nestedFilter: any
  nestSearchList: any = []
  dataSource: any
  tabledata: any = []
  searchText: string
  totalCount: number = 0;
  totalFilteredCount: number = 0;
  showStartCount: number = 0;
  showEndCount: number = 0;
  isSearchEnabled: boolean = false;
  excelExportData: any = []
  colsettingsData: any = []
  forceColumnSettings: boolean = true;
  // filter data
  filterInData:any;
  // search filter fields 
  filterFields:any;

  constructor(
    private router: Router,
    private datePipe: DatePipe,
    private api: SmartapiService,
    private common:CommonService
  ) {

  }

  /**
   * 
   */
  ngOnChanges(changes: SimpleChanges): void {
    this.forceColumnSettings = true;
    // this.ngOnInit();
    this.initiateFunction();
    if (changes.data) {
      //console.log("changed the input data");
      this.filteredClientData = this.data;
      //
      this.getTableData();
    }
    
  }
  /**
   * 
   */
  ngOnInit(): void {
    //
    this.initiateFunction();
    // if the table url is specified fetch the data and update the table data
    this.getTableData();
    // 

  }
  /**
   * 
   */
  initiateFunction(): void {
    // table configuration on init
    this.tableconfig = this.tconfig.tableconfig;
    //
    this.generateColumnSettingData();
    // table data 
    this.table_data = this.data;
    //
   // this.filteredClientData = this.data;
    //
    this.table_data_func = this.tconfig.data_func !== undefined ? this.tconfig.data_func : null;
    //
    this.count = this.tconfig.tableconfig.count ? this.tconfig.tableconfig.count : 10;
    // pagination is not enabled 
    if (!this.tableconfig.pagination) {
      this.count = this.totalDataCount;
      this.currentPage = 1;
    }
    // search place holder
    this.search_bar_placeholder = this.tableconfig.search_bar_placeholder !== undefined ? this.tableconfig.search_bar_placeholder : "Search";
    this.buttons_tempalte = this.tableconfig.buttons_tempalte !== undefined ? true : false;
    this.show_entries_class = this.tableconfig.showEntriesClass !== undefined ? this.tableconfig.showEntriesClass : this.show_entries_class;
    this.search_bar_class = this.tableconfig.searchBarClass !== undefined ? this.tableconfig.searchBarClass : this.search_bar_class;
    this.buttons_bar_class = this.tableconfig.buttonBarClass !== undefined ? this.tableconfig.buttonBarClass : "col-4";
    // table filter data 
    this.filterInData = this.tconfig.filterData!==undefined ? this.tconfig.filterData : {};
  }

  /**
   * 
   */
  getTableData() {
    if (this.tconfig?.tableconfig?.tableUrl) {
     // console.log("server= " , this.server)
      if (this.server === true) {
        let payload = this.getServerSidePayLoad();
        this.api.smartPost(this.tconfig.tableconfig.tableUrl,payload).subscribe((res: any) => {
          this.table_data = res?.rows;
          this.totCount = res.tot_count;
        });
      } else {
        this.api.smartGet(this.tconfig.tableconfig.tableUrl).subscribe((res: any) => {
          this.table_data = res;
          this.filteredClientData = this.table_data;
        });
      }
    }else{
     // this.filteredClientData = this.data;
    }
  }

  getServerSidePayLoad(){
     return {
      startCount:this.startIndex,
      pageSize:this.itemsPerPage,
      filterFields:this.filterFields      
     }
  }



  /**
   *  this is to get total count 
   *  if it is server side it takes from total count 
   *  if it is client side it count of total_data
   */
  get totalDataCount(): number {
    if (this.server === true) {
      return this.totCount;
    }
    return Array.isArray(this.table_data) ? this.table_data?.length : 0;
  }
  // get the count variable selected at top
  get itemsPerPage(): number {
    return this.count;
  }
  // get the filter data here filters will apply
  get filteredData(): any[] {
    let data = this.table_data;
    if(!this.server){
      data=this.filteredClientData;
    }
    return data;
  }

  get filteredCount(): number {
    if(this.server){
      return this.totCount;
    }
    return this.filteredClientData!==undefined ? this.filteredClientData.length : 0;
  }

  get endCount(){
    return (this.startIndex * 1 ) + (this.itemsPerPage * 1);
  }

  // get the paginated data
  get paginatedData(): any[] {
    let data = this.sortedData;
    if(this.server===true){
      return data;
    }
    return this.filteredClientData.slice(this.startIndex, this.endCount);
  }
  // get the start index
  get startIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage;
  }
  get startCount(): number {
    return this.startIndex + 1;
  }

  /**
   * 
   */
  get endIndex(): number {
    let total_end_index = this.startIndex + this.itemsPerPage;
    return total_end_index > this.filteredCount ? this.filteredCount : total_end_index;
  }
  /**
   *  get the sorted data
   */
  get sortedData(): any[] {
    let data = this.filteredData;
    if (!this.tableconfig.sorting || this.sortColumnName.length < 1) {
      return data;
    }
    return this.sortFileredData(this.sortColumnName);
  }

  /**
   * this is to add column index to variable for sorting
   * @param colName  
   */
  add_sort_index(colName: string) {
    this.sortColumnName = colName;
  }
  /**
   * 
   * @param colName 
   * @returns 
   */
  sortFileredData(colName: any) {
    this.sortDir = this.sortDir == 1 ? -1 : 1
    return this.filteredData?.sort((a: string, b: string) => {
      a = a[colName].toLowerCase();
      b = b[colName].toLowerCase();
      return a.localeCompare(b) * this.sortDir;
    });
  }


  onPageChange(number: number) {
    this.currentPage = number;
    // if(this.server===true){
    this.getTableData();
    //  }  
  }

  onCountChange() {
    //this.triggerServerSidePage();  
     //this.triggerServerSidePage(); 
     this.currentPage =1;
     if(this.server){     
       this.getTableData();
       
     }   
  }

  searchItems() {
    if (this.filter.length > 0 && this.table_data != undefined && this.table_data.length > 0) {
      this.isSearchEnabled = true;
      this.currentPage =1;
      this.filteredClientData= this.table_data?.filter((items) => this.isMatch(items));
      // this.showEntries('SEARCH')
    } else {
      this.filteredClientData = this.table_data?.filter((items) => this.isMatch(items));
      this.isSearchEnabled = false;
      this.currentPage =1;
    }
  }

  isMatch(item: any) {
    if (item instanceof Object) {
      return Object.keys(item).some((k) => this.isMatch(item[k]));
    } else {
      var searchItem = this.stringSanitize(item);
      var filterdata = this.stringSanitize(this.filter);
      return searchItem.indexOf(filterdata) > -1
    }
  }

  coulmnSearch(key: string, event: any) {
    var sText = event.target.value;
    if (!this.nestSearchList.includes(key) && sText.length > 0) {
      this.nestSearchList.push(key);
    } else if (sText == '') {
      this.nestSearchList.pop(key);
    }
    if (this.filter == '' && this.filter.length <= 0) {
      this.tabledata = this.data.filter((item) => this.nestedSearch(item, key, sText))
    } else {
      this.nestedFilter = this.tabledata.filter((item) => this.nestedSearch(item, key, sText))
      this.tabledata = this.nestedFilter;
    }
    //this.headerAction.emit({'Action':"coulmnSearch","search":sText,"filed":key})

  }

  nestedSearch(item, key, sText) {
    if (item instanceof Object) {
      return Object.keys(item).some((k) => this.nestedSearch(item[key], key, sText));;
    } else {
      var searchItem = this.stringSanitize(item);
      var filterdata = this.stringSanitize(sText);
      return searchItem.indexOf(filterdata) > -1
    }
  }

  stringSanitize(value) {
    return value !== null ? value.toString().toLowerCase().trim().replace(/\s+/g, "") : "";
  }

  openNewModel() {

  }







  onRefreshClick() {
    if (this.tconfig.data_func instanceof Function) {
      this.tconfig.data_func({}, (res: any) => {
        this.data = res;
      })
    }

  }

  generateExcelSheet() {
    if (this.data) {
      if (this.tconfig?.tableconfig?.excelcond) {
        this.data.forEach((tdata) => {
          let exportdata = {}
          for (let ex of this.tconfig?.config) {
            if (ex.export) {
              exportdata[ex.title] = tdata[ex.tbody]
            }
          }
          this.excelExportData.push(exportdata)
        })
      }
    }
  }

  exportexcel(tableId): void {
    let element = document.getElementById(tableId);
    if (this.tconfig?.tableconfig?.excelcond) {
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.excelExportData);
      this.exportTable(tableId, ws)
    } else {
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
      this.exportTable(tableId, ws)
    }
  }

  exportTable(tableId, ws) {
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, tableId + '.xlsx');
  }



  /**
   * 
   */
  generateColumnSettingData() {
    this.forceColumnSettings = !this.forceColumnSettings
    this.colsettingsData = this.tconfig?.config
    if (this.colsettingsData) {

      for (let colset of this.colsettingsData) {
        if (colset.dhide == true && !this.forceColumnSettings) {
          colset['selected'] = false
          colset['disabled'] = false
        } else {
          colset['selected'] = true
          colset['disabled'] = true
        }
      }
    }
  }

  /**
   * 
   * @param event 
   * @param index 
   * @param value 
   */
  onColumnSelected(event, index, value) {
    if (event.target.checked) {
      this.colsettingsData[index].selected = event.target.checked
    } else {
      this.colsettingsData[index].selected = event.target.checked
    }

  }
  /**
   *  this is to get the template of column when the type is tempalte
   * 
   * @param column_config 
   * @returns 
   */
  getTemplateName(column_config: any) {
    if (column_config?.template !== undefined && column_config.template instanceof TemplateRef) {
      return column_config.template;
    }
    return null;
  }
  /**
   *  this is to get button template
   * 
   * @returns 
   */
  getButtonTemplateName() {
    if (this.tableconfig.buttons_tempalte !== undefined && this.tableconfig.buttons_tempalte instanceof TemplateRef) {
      return this.tableconfig.buttons_tempalte;
    }
    return null;
  }

  /**
   * 
   * 
   */
  getTagValue(tagText: string, data: any, col_name: any) {
    if (tagText !== undefined && tagText.length > 1) {
      return tagText;
    }
    return data[col_name] !== undefined ? data[col_name] : "";
  }

  get searchButtonFiled(){
    let buttonFiled:SmartFormField = {
      type: 'button',
      label: 'Search',
      name: 'Submit',
      width: 12,
      buttonClass: 'smart-action-button-secondary is-fullwidth',
      buttonType: 'button',
     // buttonSubmitType: 'submit',
      leftIcon: 'fa-search',
      buttonFunction: (data: any) => {
         this.isFilterEnabled = false;
         this.filterFields = data;
         this.currentPage =1;
       //  console.log("button inside")
         if(this.server){
           this.getTableData()
         }else{
        //  console.log("near filter");
          this.filterDataClient();
         }
         
      },
    }
    return buttonFiled;
  }

  // get filter form configuration 
  get filterFormConfig(){
    let form_fields = this.tconfig.filterConfig!==undefined ? this.tconfig.filterConfig : [];
    let filter_fields = [];
    if(form_fields.length > 0){
      filter_fields = [...form_fields,this.searchButtonFiled];
    }
    let formConfig:SmartFormNewConfig = {
      name: 'Category form',
      SmartFields: filter_fields,
    };
    return formConfig;
  }

  getFilterItemValue(item,filter_param){
    //console.log("item value " , filter_param);
     let filter_field = this.getFilterField(filter_param);
     //console.log("item value " , filter_field);
     let item_field = filter_param;
     let filter_type = "STRING";
     if(filter_field["filterSettings"]!==undefined){
        item_field = filter_field["filterSettings"]["field_name"];
        filter_type = filter_field["filterSettings"]["type"];
     }
     //console.log("item value " , item_field);
     let actual_value = item[item_field]!==undefined ? item[item_field]:"";
     let sanitized_value = ""+actual_value;
     return {sanitized_value,filter_type};     
  }

  getFilterField(filter_param:string){
    let form_fields = this.tconfig.filterConfig!==undefined ? this.tconfig.filterConfig : [];
    //console.log("item value " ,form_fields);
     let filtered_field_arr = form_fields.filter(obj=>obj.name==filter_param);
     return filtered_field_arr[0]!==undefined ? filtered_field_arr[0] : filtered_field_arr; 
  }

  /**
   * counct
   * 
   */
  filterDataClient(){
    this.filteredClientData=[];
    const filterData:any[] = this.table_data.filter((item)=>{
      const keys = Object.keys(this.filterFields);
      let flag = true;
      for(let k=0;k<keys.length;k++){
         let filter_value = this.filterFields[keys[k]];
         // 
         let filtered_params = this.getFilterItemValue(item,keys[k]);
         //console.log("key " , keys[k], "F =" , filter_value, " S =" , filtered_params);
         if(filter_value!==null && filtered_params.sanitized_value.length > 0){  
           //console.log(" flag = ", flag);          
          if(filtered_params.filter_type=="DATE_FROM"){
               flag = flag && this.common.compareDates(filtered_params.sanitized_value,filter_value);
          }else if(filtered_params.filter_type=="DATE_TO"){
              flag = flag && this.common.compareDates(filtered_params.sanitized_value,filter_value,"REVERSE");
          }else{
              filter_value = this.stringSanitize(filter_value);
              //console.log("index = " ,keys[k] , " filter_value " , filter_value , "  final value " , filtered_params.sanitized_value);
              flag = flag && this.stringSanitize(filtered_params.sanitized_value).includes(filter_value);    
            }      
         }
        // let sinlge_index_value = this.stringSanitize(item["book_name"]);
      }    
       return flag;
    });
    this.filteredClientData = filterData; 
  }



}
