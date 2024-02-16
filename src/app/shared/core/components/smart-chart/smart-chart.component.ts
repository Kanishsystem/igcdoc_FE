import { Component, ElementRef, Input, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { Colors } from 'chart.js';
import { SmartChartConfig } from '../../SmartInterfaces/SmartChartInterface';
import { CommonService } from 'src/app/api-services/common/common.service';

@Component({
  selector: 'app-smart-chart',
  templateUrl: './smart-chart.component.html',
  styleUrls: ['./smart-chart.component.css']
})
export class SmartChartComponent  implements OnInit {
  public chart: any =[];
  @Input('type') type :  any = 'bar';
  @Input('smartConfig') smartConfig : SmartChartConfig;
  @Input('changeData') changeData : string;

  constructor(private renderer: Renderer2, private el: ElementRef,private common:CommonService) { }
 // @Input('chartName') chartName : any = "smartChart"
  ngOnInit(): void {
    //console.log("char data refresh " ,  this.changeData );
  }

  ngAfterViewInit(){
   // console.log("after view intit" ,  this.changeData );
   if(this.smartConfig){
    let responsive = this.smartConfig.responsive && this.smartConfig.responsive =='0' ? false : true;
    setTimeout(() => {
      this.createChart(this.chartName,responsive);
      this.createChart(this.chartNameMobile,false);
    },0)
    }
    const container = this.el.nativeElement.querySelector('.smart-chart-div-mobile');
    container.scrollLeft = this.common.currentMonth() * 55; // Scroll to position 200 pixels
  
  }

  ngOnChanges(changes: SimpleChanges): void {
   // console.log("char data refresh " ,  this.changeData );
    if(this.smartConfig){
      let responsive = this.smartConfig.responsive && this.smartConfig.responsive =='0' ? false : true;
   
    setTimeout(() => {
      this.createChart(this.chartName,responsive);
      this.createChart(this.chartNameMobile,false);
    },0)
    const container = this.el.nativeElement.querySelector('.smart-chart-div-mobile');
    container.scrollLeft = this.common.currentMonth() * 55;
  }
  }


  get chartName(){
    return this.smartConfig &&  this.smartConfig.name ?  this.smartConfig.name : "chart-1"
  }
  get chartNameMobile(){
    return this.smartConfig  ? this.smartConfig.name + "_mobile" :  "chart-1_mobile"
  }


  createChart(name:string,responsive:boolean  ){ 

    // Get the canvas element
  const canvas: HTMLCanvasElement = <HTMLCanvasElement>(
    document.getElementById(name)
  );

    // Check if a chart with ID '0' exists and destroy it
    if (this.chart && this.chart[name]) {
      // If the chart already exists, destroy it
      this.chart[name].destroy();
    }
    this.chart[name] = new Chart(canvas, {
      type: this.smartConfig.type, 
      data: {
        labels: this.smartConfig.labels, 
	       datasets:this.smartConfig.dataSet /*[
          {
            label: "Sales",
            data:this.smartConfig.data,
          }, 
        ]*/
      },
      options: {
        responsive:responsive,
        maintainAspectRatio: false, 
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              usePointStyle: true,
             // className: 'my-legend' // Custom class for legend
            }
          },
        }
       // aspectRatio:8
      }
    });
    /*
    const legend = this.chart.legend;
    if (legend) {
      legend.legendItems.forEach((item) => {
        item.text += ' my-legend'; // Add the custom class
      });
    }
    */
    const legendContainer = this.el.nativeElement.querySelector('.chartjs-legend');
    if (legendContainer) {
      legendContainer.classList.add('my-legend');
    }
    Chart.register(Colors)
  }
}
