import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SmartapiService } from 'src/app/api-services/smartapi.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  footer_title: any;
  constructor(private api: SmartapiService,
    private route: Router,
  ) { }

  ngOnInit(): void {
    // this.getDetails()
  }
  getDetails() {
    this.api.smartGet('GET_DETAILS').subscribe((res: any) => {
      console.log(res);
      // this.logoImage=res.site_logo;
      this.footer_title = res.site_footer
      console.log(this.footer_title)

    });
  }
}
