import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-smart-dashboard-cards',
  templateUrl: './smart-dashboard-cards.component.html',
  styleUrls: ['./smart-dashboard-cards.component.css']
})
export class SmartDashboardCardsComponent implements OnInit {
  @Output('ViewMoreAction') ViewMoreAction : EventEmitter<any> = new EventEmitter();
  @Input('title') title : any
  @Input('data') data : any
  @Input('icon') icon : any
  @Input('color') color : any

  ngOnInit(): void {
    

  }

  onViewMore(title: string){
    this.ViewMoreAction.emit(title)
  }

  sanitizeTitle(title: string){
    let data  = title.replace('_', ' ')
    return data
  }
}
