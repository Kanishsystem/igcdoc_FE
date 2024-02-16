import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SessionStorageServiceService } from 'src/app/api-services/core/session-storage-service.service';

@Component({
  selector: 'app-smart-card',
  templateUrl: './smart-card.component.html',
  styleUrls: ['./smart-card.component.css']
})
export class SmartCardComponent {
  @Input("data") data:any;
  constructor(
    private route: Router,
    private userSession: SessionStorageServiceService, 
  ) {
  }

  checkPerm(perm){    
    if(!Array.isArray(perm)){
      return true;
    }
    const userRoleCheck = this.userSession.checkRoleExists(perm);
    return userRoleCheck;  
  }

  get isAdmin(){
    return this.checkPerm(["ADMIN"]);
  }

  get isEle(){
    return this.checkPerm(["SD_ELE_ADMIN"]);
  }

  get isTp(){
    return this.checkPerm(["SD_TP_ADMIN"]);
  }

  get isNw(){
    return this.checkPerm(["SD_NW_ADMIN"]);
  }

  get isMe(){
    return this.checkPerm(["SD_MECH_ADMIN"]);
  }

  get isDoc(){
    return this.checkPerm(["SD_DOC_ADMIN"]);
  }


}
