import { Component, Input,EventEmitter,Output } from '@angular/core';

@Component({
  selector: 'app-smart-pagination',
  templateUrl: './smart-pagination.component.html',
  styleUrls: ['./smart-pagination.component.css']
})
export class SmartPaginationComponent {
 // @Input('currentPage') currentPage: any;
  @Input('totalCount') totalCount: any;
  @Input('itemsPerPage') itemsPerPage: number;
  @Input('currentPage') currentPage:number;
  @Output('pageChange') pageChange : EventEmitter<any> = new EventEmitter();

 // totalPages: number;
 // currentPage:number=1;

  constructor() {
   
  //  this.totalPages = Math.ceil(this.totalCount / this.itemsPerPage);
  //  console.log("total oages " , this.totalPages);
  }

  ngOnChanges(){
  }

  get totalPages():number{
    return Math.ceil(this.totalCount / this.itemsPerPage);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }

  get pagesToDisplay(): number[] {
    if (this.currentPage <= 2) {
      return this.pages.slice(0, 10);
    } else if (this.currentPage >= this.totalPages - 1) {
      return this.pages.slice(-10);
    } else {
      const startIndex = Math.max(0, this.currentPage - 5); // Ensure startIndex >= 0
      const endIndex = Math.min(this.totalPages, this.currentPage + 5);
      return this.pages.slice(startIndex, endIndex);
    }
  }

  setCurrentPage(page: number) {
      this.currentPage = page;
      if(this.currentPage < 1){
        this.currentPage = 1;
      }
      if(this.currentPage > this.totalPages){
        this.currentPage = this.totalPages;
      }
      this.pageChange.emit(page);
  }


}
