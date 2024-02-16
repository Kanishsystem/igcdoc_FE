import { Component } from '@angular/core';
import { SmartTableColumnConfig, SmartTableConfig, SmartTableMainConfig } from 'src/app/shared/core/SmartInterfaces/SmartTableNewInterface';

@Component({
  selector: 'app-backup',
  templateUrl: './backup.component.html',
  styleUrls: ['./backup.component.css']
})
export class BackupComponent {
  tableData: any;
  //
  tableConfigNew: SmartTableConfig;

  ngOnInit(): void{
    this.createTable();
    this.getTableData();
  }

  createTable() {
    let table_config: SmartTableMainConfig = {
      name: 'User-Details',
      title: 'Vendors Details',
      table_class: "smart-responsive",
      download: true,
      showentries: true,
      currentpage: false,
      pagination: true,
      colsearch: true,
      search:true, 
      showEntriesClass: "is-8",
      search_bar_placeholder: "Search User ",
      searchBarClass: "is-4",
      buttonBarClass: "is-1 d-flex justify-content-end",
    };

    let table_body_config: SmartTableColumnConfig[] = [
      {
        type: 'sno',
        title: 'S.No',
        tbody: 'sno',
        width: '5%',
      },
      {
        type: 'db',
        title: 'File Name',
        tbody: 'filename',
        width: '10%',
      },
      {
        type: 'date',
        title: 'Date',
        tbody: 'date',
        width: '20%',
      },
      {
        type: 'tag',
        title: 'Status',
        tbody: 'active_status',
        width: '5%',
        tagCond: [
          { comp: "5", tagClass: "is-success  ", tagText: "Active" },
          { comp: "0", tagClass: "is-danger  ", tagText: "In-Active" },
          // { comp: "10", tagClass: "is-danger  ", tagText: "Locked" }
        ]
      },
      {
        type: 'buttons',
        title: 'Action',
        width: '5%',
        btn_config: [
          {
            type: 'button',
            class: ['has-text-success', 'is-small'],
            btn_type: 'icon',
            icon: ['fa fa-download'],
            // btn_func: (data) => {
            //   //console.log(data)
            //   //  this.downLoadFile(data.ID,data.doc_loc)
            // },
            // btn_show:(data)=>{
            //   if(data["file_check"] && data["file_check"]==true && data["download_perm"] && data["download_perm"]==true ){
            //     return  true;
            //   }
            //   return false;           
            // }
          },
        ],
      }
    ];
    this.tableConfigNew = {
      tableconfig: table_config,
      config: table_body_config,
      // filterConfig: this.getAdminFilter(),
      filterData: {
        // from_date: this.common.addDays(-30),
        // to_date: this.common.currentDate(),
      },
    };
  }

  getTableData(){
    this.tableData=[
      {
        sno: '1',
        filename: 'demo',
        date: '22/01/2024',
        active_status: '5'
      },
      {
        sno: '2',
        filename: 'test',
        date: '20/01/2024',
        active_status: '0'
      },
      {
        sno: '3',
        filename: 'sample',
        date: '21/01/2024',
        active_status: '5'
      },
      {
        sno: '4',
        filename: 'demo1',
        date: '18/01/2024',
        active_status: '0'
      },
      {
        sno: '5',
        filename: 'test2',
        date: '16/01/2024',
        active_status: '5'
      }
    ]
  }
}
