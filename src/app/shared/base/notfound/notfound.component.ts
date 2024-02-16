import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionStorageServiceService } from 'src/app/api-services/core/session-storage-service.service';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.css']
})
export class NotfoundComponent implements OnInit {

  userName:"";
  constructor(private userSession:SessionStorageServiceService,
    private route: Router,
    ) { }

  ngOnInit(): void {
    this.userName = this.userSession.getUserName();
  }

  getBack() {
    if(this.userSession.checkRole("ADMIN")){
      
      this.route.navigate(['/dashboard'])
    }else{
      this.route.navigate(['/home'])
    }
    
  }

}
