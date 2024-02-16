import { Component, Renderer2 } from '@angular/core';
import { LoaderService } from './api-services/core/loader.service';
import { SpinnerService } from './api-services/common/spinner.service';
import { SmartapiService } from './api-services/smartapi.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 
  constructor(
     private loaderService  :  LoaderService,
     private renderer: Renderer2,
     private spinner : SpinnerService,
     private api: SmartapiService,
     ){}

  ngAfterViewInit() {
    this.loaderService.httpProgress().subscribe((status: boolean) => {
      if(status){
        this.spinner.show();
      }else{
        this.spinner.hide();
      }
    });
  }

 
}
