import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SmartCarouselConfig, SmartCarouselItemConfig } from '../../SmartInterfaces/SmartCarouselInterface';

@Component({
  selector: 'app-smart-carousel',
  templateUrl: './smart-carousel.component.html',
  styleUrls: ['./smart-carousel.component.css']  
})
export class SmartCarouselComponent {
  @Input() config:SmartCarouselConfig
  activeIndex = 0;
  intervalId: any;
  @Input() templateArray: any[];

  private shouldClearInterval = false;

  ngOnInit() {    
    this.intervalId = setInterval(() => {
      if (this.shouldClearInterval) {
        clearInterval(this.intervalId);
      } else {
       // this.next();
        console.log("interval called");
      }
    }, 5 * 1000);
  }

  ngOnChange(){
    console.log("chnage called" , this.config)
  }
  
  ngOnDestroy() {
    this.shouldClearInterval = true;
  }


  prev() {
    if (this.activeIndex > 0) {
      this.activeIndex--;
    }
  }

  next() {
    //console.log("active = ", this.activeIndex  , " data " , this.config.data.length)
    if (this.activeIndex < this.config.data.length - 1) {
      this.activeIndex++;
    }else{
      this.activeIndex=0;
    }
  }
}
