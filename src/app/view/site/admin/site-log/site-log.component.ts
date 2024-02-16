import { Component } from '@angular/core';
import { CommonService } from 'src/app/api-services/common/common.service';
import { NotifyService } from 'src/app/api-services/common/notify.service';
import { SmartapiService } from 'src/app/api-services/smartapi.service';
import { SmartFormField } from 'src/app/shared/core/SmartInterfaces/SmartFormNewInterface';
import { SmartTableColumnConfig, SmartTableConfig, SmartTableMainConfig } from 'src/app/shared/core/SmartInterfaces/SmartTableNewInterface';

@Component({
  selector: 'app-site-log',
  templateUrl: './site-log.component.html',
  styleUrls: ['./site-log.component.css']
})
export class SiteLogComponent {

  constructor(
    private common: CommonService,
    private api: SmartapiService,
    // private notify: NotifyService,
  ) { }

  tableData: any;
  //
  tableConfigNew: SmartTableConfig;
  currentYear: any;


  ngOnInit(): void {
    this.createTable();
    this.getTableData({});
  }

  updateMonthYear(event) {
    this.getTableData(event);
  }

  getTableData(monthYear = {}) {

    this.api.smartPost('AUTH_LOG', monthYear).subscribe((res: any) => {
      this.tableData = res;
    });
  }

  changeYear(year_flag) {
    if (year_flag == 1) {
      this.currentYear++;
    } else {
      this.currentYear--;
    }
    // get the chat data again
    // this.getChartData();
  }



  createTable() {
    let table_config: SmartTableMainConfig = {
      name: 'VendorsDetails',
      title: 'Vendors Details',
      table_class: "smart-responsive",
      showentries: true,
      showingentries: true,
      pagination: true,
      colsearch: true,
      search:true,
      showEntriesClass: "is-8",
      search_bar_placeholder: "Search Site Log",
      searchBarClass: "col-4 ",
      buttonBarClass: "col-1 d-flex justify-content-end",

    };

    let table_body_config: SmartTableColumnConfig[] = [
      {
        type: 'sno',
        title: 'S.No',
        tbody: 'sno',
        width: '5%'
      },
      {
        type: 'db',
        title: 'Employee',
        tbody: 'emp_name',
        width: '10%'
      },
      {
        type: 'db',
        title: 'Remote IP',
        tbody: 'remoteIp',
        width: '20%'
      },
      {
        type: 'date',
        title: 'Date',
        tbody: 'datetime',
        customFormat: true,
        format: 'dd-MM-YYYY',
        width: '20%'
      },
      {
        type: 'db',
        title: 'Action Performed',
        tbody: "module",
        width: '20%'
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
        name: 'emp_name',
        label: 'Employee',
        placeHolder: 'Employee'
      },
      {
        type: 'text',
        width: 12,
        name: 'remoteIp',
        label: 'Remote IP',
        placeHolder: 'Remote IP'
      },
      {
        type: 'date',
        width: 6,
        label:'From Date',
        name: 'from_date',
        rightIcon:"fa-calendar",    
        placeHolder: 'From Date',
        filterSettings:{
          type:"DATE_FROM",
          field_name:"datetime"
        }         
      },
      {
        type: 'date',
        width: 6,
        label:'To Date',
        name: 'to_date',
        rightIcon:"fa-calendar",   
        placeHolder: 'To Date',
        filterSettings:{
          type:"DATE_TO",
          field_name:"datetime"
        }       
      },
    ];
    return filterConfig;
  }
}
