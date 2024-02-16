import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  SmartDashCard,
  SmartDashCards,
} from '../../SmartInterfaces/SmartDashCardInterface';

@Component({
  selector: 'app-smart-dash-cards',
  templateUrl: './smart-dash-cards.component.html',
  styleUrls: ['./smart-dash-cards.component.css'],
})
export class SmartDashCardsComponent implements OnInit, OnChanges {
  /**
   *
   */
  @Input('config') smartDashCards: SmartDashCards;
  @Input('refresh') refresh:any;
  animationClassIndex=0;
  animateClasses=["animate__bounceInDown","animate__bounceInUp"];

  smartDash: SmartDashCard[];

  constructor() {}

  ngOnChanges(): void {
    this.smartDash =
      this.smartDashCards !== undefined &&
      this.smartDashCards.cards !== undefined
        ? this.smartDashCards.cards
        : [];
    this.animationClassIndex = this.animationClassIndex==0 ? 1 : 0
     //   console.log("dash_chnged ", this.smartDash);
  }

  ngOnInit(): void {
    this.smartDash =
      this.smartDashCards !== undefined &&
      this.smartDashCards.cards !== undefined
        ? this.smartDashCards.cards
        : [];
     
      //  console.log("dash_intial ", this.smartDash);
  }

  getCardSizeClass(){
    return this.smartDashCards.cardClass ? this.smartDashCards.cardClass : "is-4";
  }

  //
  getCardCalss(item: SmartDashCard) {
    if (this.smartDashCards.type == 'ICON_TOP') {
      return 'smart-card-' + item.color.toLowerCase();
    }else if (this.smartDashCards.type == 'ICON_RIGHT') {
      return 'smart-card-icon-' + item.color.toLowerCase();
    }
    return 'smart-dash-style-border-' + item.color.toLowerCase();
  }

  trackByFn(index, item) {
    return item.title;
  }
}
