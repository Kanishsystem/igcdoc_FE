import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SmartapiService } from 'src/app/api-services/smartapi.service';

@Component({
  selector: 'app-topheader',
  templateUrl: './topheader.component.html',
  styleUrls: ['./topheader.component.css']
})
export class TopheaderComponent implements OnInit {
  logoImage: any = './assets/images/applicationicon.png';
  profile: any = './assets/images/profile.png';
  title: any = 'Smart DIGI Solutions';
  user:any={};
  constructor(
    private route: Router,
    private api: SmartapiService,
  ) { 
    this.user=sessionStorage.getItem('user_data');
    this.user=JSON.parse(this.user);
    console.log(this.user)
  }
  

  ngOnInit(): void {
    // this.getDetails();
   

  }

  onLogOut() {
    this.route.navigate(['/login'])
  }

  getDetails() {
    this.api.smartGet('GET_DETAILS').subscribe((res: any) => {
      console.log(res);
      // this.logoImage=res.site_logo;
      this.title = res.site_title ? res.site_title : 'PDF MAPPING';
      this.logoImage = './assets/images/' + res.site_logo

    });
  }

  isShow : boolean = false
  getMenu(){
    this.isShow = ! this.isShow
  }

}
