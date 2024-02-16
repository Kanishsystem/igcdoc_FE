import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifyService } from 'src/app/api-services/common/notify.service';
import { SpinnerService } from 'src/app/api-services/common/spinner.service';
import { SessionStorageServiceService } from 'src/app/api-services/core/session-storage-service.service';
import { SmartapiService } from 'src/app/api-services/smartapi.service';

@Component({
  selector: 'app-smart-theme-nav',
  templateUrl: './smart-theme-nav.component.html',
  styleUrls: ['./smart-theme-nav.component.css'],
})
export class SmartThemeNavComponent implements OnInit {
  isSideNavOpen: boolean = false;
  userName:"";
  activeLink="";
  site_title="IGCAR";
  site_footer="rcl";

  constructor(
     private route: Router,
    private userSession:SessionStorageServiceService,
    private notify:NotifyService,
    private api: SmartapiService,
    private routeAct: ActivatedRoute,
    private spinner:SpinnerService
  ) {     
    const segments = this.routeAct.snapshot.url.map(segment => segment.path);
    this.activeLink = '/' + segments.join('/');
    //console.log("active link =" , this.activeLink);
    this.userName = this.userSession.getUserName();
  }
  ngOnInit(): void {
     this.site_title = this.userSession.getSettings("site_name",this.site_title);
     this.site_footer = this.userSession.getSettings("site_footer",this.site_footer);

     //console.log("site title ", this.site_title);
  }
  
  
  openCloseSideNav() {
    console.log('button')
    this.isSideNavOpen = !this.isSideNavOpen;
  }
  admin_nav = [
    {
      title: 'Dashboard',
      icon: 'fa fa-archive',
      navigateLink: '/dashboard',
    },
   
    {
      title: 'All Document',
      icon: 'fa fa-folder-plus',
      navigateLink: '/all-document',
    },
    
    {
      title: 'User Management',
      icon: 'fa fa-users',
      navigateLink: '/user-management',
    },
    {
      title: 'Role Management',
      icon: 'fa-regular fa-chess-rook',
      navigateLink: '/role-management',
    },
    
    {
      title: 'Documents',
      icon: 'fa-regular fa-folder-open',
      navigateLink: '/documents',
    },
    {
      title:'  Meeting Rooms',
      icon:'fa fa-people-roof',
      navigateLink:'/meeting-rooms'
    },
    {
      title: 'Electrical Complaint',
      icon: 'fa fa-plug',
      navigateLink: '/electrical-complaints-admin',
    },
    {
      title: 'Telephone Complaints',
      icon: 'fa fa-phone',
      navigateLink: '/telephone-complaints-admin',
    },
    /*
    {
      title: 'Types Management',
      icon: 'fa fa-vector-square',
      navigateLink: '/types-management',
    },*/
    
    {
      title: 'Site Circular',
      icon: 'fa fa-circle-info',
      navigateLink: '/site-circular',
    },
    {
      title: 'Site Activities',
      icon: 'fa-sharp fa fa-universal-access',
      navigateLink: '/site-activities',
    },
    {
      title: 'Site Settings',
      icon: 'fa fa-gear',
      navigateLink: '/site-settings',
    },
    {
      title: 'Site Log',
      icon: 'fa fa-arrow-right-arrow-left',
      navigateLink: '/site-log',
    },
   
    {
      title: 'LOGOUT',
      icon: 'fa fa-arrow-right-from-bracket',
      navigateLink: '/',
      navClickType:"LOGOUT",
    },
  ]

  user_nav = [
    {
      title: 'Document Managment',
      icon: 'fa-regular fa-folder-open',
      navigateLink: '/document-managment',
    },
    {
      title: 'Meeting Room Booking',
      icon:'fa fa-people-roof',
      navigateLink: '/meeting-room-booking',
    },
    {
      title: 'Electrical Complaint',
      icon: 'fa fa-plug',
      navigateLink: '/electrical-complaint',
    },
    {
      title: 'Telephone Complaint',
      icon: 'fa fa-phone',
      navigateLink: '/telephone-complaint',
    },
    {
      title: 'User Profile',
      icon: 'fa fa-user',
      navigateLink: '/user-profile',
    },
    {
      title: 'LOGOUT',
      icon: 'fa fa-arrow-right-from-bracket',
      navigateLink: '#',
      navClickType:"LOGOUT",      
    },
    //  {title:"Reports",icon:"fa fa-chart-pie",navigateLink:"/report"},
  ];
 

  getSmartSideNav() {
    if(this.userSession.checkRole("ADMIN")){
      return this.admin_nav;
    }
    return this.user_nav;
  }

  logout(){
     //console.log("logout clicked");
      this.userSession.clear();
      this.spinner.show();
      setTimeout(() => {
        this.notify.info("logged out successfully");
        this.spinner.hide();
        this.route.navigate(['/']);        
       // console.log('After navigation');
      }, 1000);
     //this.notify.info("logged out successfully");
    // this.route.navigate(['home']);
  }
}
