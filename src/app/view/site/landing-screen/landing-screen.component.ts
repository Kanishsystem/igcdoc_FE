import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { get_api_full_route } from 'src/app/api-services/api-router';
import { NotifyService } from 'src/app/api-services/common/notify.service';
import { SpinnerService } from 'src/app/api-services/common/spinner.service';
import { SessionStorageServiceService } from 'src/app/api-services/core/session-storage-service.service';
import { SmartapiService } from 'src/app/api-services/smartapi.service';
import { SmartDialogService } from 'src/app/shared/core/services/smart-dialog.service';

@Component({
  selector: 'app-landing-screen',
  templateUrl: './landing-screen.component.html',
  styleUrls: ['./landing-screen.component.css'],
})
export class LandingScreenComponent {
  imageUrl = "";
  constructor(
    private route: Router,
    private spinner: SpinnerService,
    private api: SmartapiService,
    private notify: NotifyService,
    private userSession: SessionStorageServiceService,
    private modalService: NgbModal,
    private smartDialog: SmartDialogService
  ) {
    console.log('login componeent loaded ');
    this.imageUrl = get_api_full_route("HOME_IMAGES_GET_ONE_IMAGE")
  }

  images: string[] = [
    '/assets/images/slide-images/igcar-1.jpg',
    '/assets/images/slide-images/igcar-2.jpg',
    '/assets/images/slide-images/igcar-3.jpg',
    // Add more image URLs as needed
  ];

  currentImageIndex: number = 0;

  siteSettings: any;

  openCLose: boolean = false;
  //
  cardData: any;

  newArray: any;

  number: number;

  array: any = [];
  //
  shutdowndata:any=[];
  //
  mainTab:string="main";

  ngOnInit(): void {
    this.getHomeImagesData();
    this.getSettingsData();
    this.getActivity();
    this.startSlideshow();
    this.getShutDownData();
  }

  getHomeImagesData() {
    this.images = [];
    this.api.smartGet('HOME_IMAGES_GET_ALL').subscribe((res: any) => {
       res.forEach(element => {
        let image_url = this.imageUrl + "/" + element.ID;
        this.images.push(image_url)
        this.getSettingsData();
       });
    });
  }

  updateTab(tab){
    this.mainTab = tab;
  }

  getShutDownData() {
    this.images = [];
    this.api.smartGet('SITE_DASH_SHUTDOWN').subscribe((res: any) => {
       this.shutdowndata = res;
    });
  }

  startSlideshow(): void {
    setInterval(() => {
      this.getNextImage();
    }, 3000); // Change 3000 to the desired timeout interval in milliseconds (3 seconds in this example)
  }

  getNextImage() {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
  }

  getSettingsData() {
    this.api.smartGet('AUTH_SITE_SETTINGS').subscribe((res: any) => {
      this.siteSettings = res;
     // console.log("site settings " , this.siteSettings);
      this.userSession.setSettings(res);
    });
  }

  getActivity() {
    let activity = this.userSession.getActivity();
    if (!activity) {
      this.api.smartGet('ACTIVITY_GET_ALL').subscribe((res: any) => {
        //console.log(res);
       // this.userSession.setActivity(res);
        this.cardData = res;
      });
    } else {
      this.cardData = activity;
    }
  }

  shouldFloatReverse: boolean = false;

  // Function to toggle the float reverse
  // toggleFloatReverse() {
  //   this.shouldFloatReverse = !this.shouldFloatReverse;
  // }
  // }
  isEven(number: number): boolean {
    number = this.cardData;
    return number % 2 === 0;
  }
}
