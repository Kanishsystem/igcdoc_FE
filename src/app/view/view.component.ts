import { Component, HostListener } from '@angular/core';
import { SessionStorageServiceService } from '../api-services/core/session-storage-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifyService } from '../api-services/common/notify.service';
import { SmartapiService } from '../api-services/smartapi.service';
import { SpinnerService } from '../api-services/common/spinner.service';
import { get_api_route } from '../api-services/api-router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent {
  isSideNavOpen: boolean = false;
  userName: '';
  activeLink = '';
  site_title = 'IGCAR';
  site_footer = 'rcl';
  site_shot_title = 'IGCAR CM';
  site_contect_details = 'test';
  profile_button: boolean = false;
  sidebar_active: boolean = false;
  site_logo = null;
  profile_img = null;
  momTypes: any = [];
  comTypes: any = [];
  navs: any = [];

  constructor(
    private route: Router,
    private userSession: SessionStorageServiceService,
    private notify: NotifyService,
    private api: SmartapiService,
    private routeAct: ActivatedRoute,
    private spinner: SpinnerService
  ) {
    const segments = this.routeAct.snapshot.url.map((segment) => segment.path);
    this.activeLink = '/' + segments.join('/');
    //console.log("active link =" , this.activeLink);
    this.userName = this.userSession.getUserName();
  }

  ngOnInit(): void {
    this.getMoM();
    this.getUserData();
    this.site_title = this.userSession.getSettings(
      'site_name',
      this.site_title
    );
    this.site_footer = this.userSession.getSettings(
      'site_footer',
      this.site_footer
    );
    this.site_contect_details = this.userSession.getSettings(
      'site_contect_details',
      this.site_contect_details
    );
    this.site_logo = this.userSession.getSettings('book_image', this.site_logo);
    this.site_shot_title = this.userSession.getSettings(
      'site_short_title',
      this.site_shot_title
    );
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event) {
    if (
      !event.target.closest('.navbar-burger') &&
      !event.target.closest('.smart-side-column')
    ) {
      if (this.sidebar_active == true) {
        this.sidebar_active = false;
      }
    }
  }

  getUserData() {
    // console.log("d ", this.user_data);
    let id = this.userSession.getUserId();
    this.api
      .smartPost('USER_GET_ONE_IMAGE', { id: id })
      .subscribe((res: any) => {
        this.profile_img = res?.img;
        //this.user_data["profile"] = res?.img;
        // this.formData = res;
        //this.openForm();
      });
  }

  getMoM() {
    // let url = get_api_route('SITE_MOMTYPE_GET_ALL_SELECT') + '/MomTypes';
    this.api.smartGet('SITE_MOMTYPE_GET_ALL_SELECT').subscribe((res: any) => {
      this.momTypes = res;
      this.getComplaints();
    
      //this.profile_img = res?.img;
      //console.log("mom types " , res)
    });
  }

  getComplaints() {
    this.api.smartGet('SITE_COMPLAINT_TYPE_GET_ALL').subscribe((res: any) => {
      this.comTypes = res;
      this.getNavs();
    });
  }

  logout() {
    //console.log("logout clicked");
    this.userSession.clear();
    this.spinner.show();
    setTimeout(() => {
      this.notify.logout('logged out successfully');
      this.spinner.hide();
      this.route.navigate(['/']);
      // console.log('After navigation');
    }, 1000);
    //this.notify.info("logged out successfully");
    // this.route.navigate(['home']);
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
      title: '  Meeting Rooms',
      icon: 'fa fa-people-roof',
      navigateLink: '/meeting-rooms',
    },
    {
      title: 'Electrical Complaints',
      icon: 'fa-brands fa-nfc-directional',
      navigateLink: '/electrical-complaints-admin',
    },
    {
      title: 'Telephone Complaints',
      icon: 'fa fa-phone',
      navigateLink: '/telephone-complaints-admin',
    },
    {
      title: 'Network Complaints',
      icon: 'fa fa-ethernet',
      navigateLink: '/network-complaints-admin',
    },
    /*
    {
      title: 'Types Management',
      icon: 'fa fa-vector-square',
      navigateLink: '/types-management',
    },*/
    {
      title: 'Site Settings',
      icon: 'fa fa-gear',
      navigateLink: '/site-settings',
    },
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
      title: 'Organization',
      icon: 'fa fa-sitemap',
      navigateLink: '/org',
    },
    {
      title: 'Site Log',
      icon: 'fa fa-arrow-right-arrow-left',
      navigateLink: '/site-log',
    },
    /*
    {
      title: 'LOGOUT',
      icon: 'fa fa-arrow-right-from-bracket',
      navigateLink: '/',
      navClickType: "LOGOUT",
    },*/
  ];

  user_nav = [
    {
      title: 'All Document',
      icon: 'fa fa-folder-plus',
      navigateLink: '/all-document',
    },
    {
      title: 'My Documents',
      icon: 'fa-regular fa-folder-open',
      navigateLink: '/document-managment',
    },
    {
      title: 'Meeting Room Booking',
      icon: 'fa fa-people-roof',
      navigateLink: '/meeting-room-booking',
    },
    {
      title: 'Electrical Complaint',
      icon: 'fa-brands fa-nfc-directional',
      navigateLink: '/electrical-complaint',
    },
    {
      title: 'Telephone Complaint',
      icon: 'fa fa-phone',
      navigateLink: '/telephone-complaint',
    },
    {
      title: 'Network Complaint',
      icon: 'fa fa-ethernet',
      navigateLink: '/network-complaint',
    },
    {
      title: 'Organization',
      icon: 'fa fa-sitemap',
      navigateLink: '/org-user',
    },
    /*
    {
      title: 'User Profile',
      icon: 'fa fa-user',
      navigateLink: '/user-profile',
    },*/
    /*
    {
      title: 'LOGOUT',
      icon: 'fa fa-arrow-right-from-bracket',
      navigateLink: '#',
      navClickType: "LOGOUT",
    },*/
    //  {title:"Reports",icon:"fa fa-chart-pie",navigateLink:"/report"},
  ];

  

  documentNavs = [
    {
      title: 'My Documents',
      icon: 'fa-regular fa-folder-open',
      navigateLink: '/document-management-user',
      perm: ['USER', 'ADMIN'],
    },
    // {title: 'My Approvals', icon: 'fa-regular fa-folder-open',
    // navigateLink: '/document-management-app',perm:["SD_DOC_ADMIN","ADMIN"]},
    {
      title: 'All Documents',
      icon: 'fa-regular fa-folder-open',
      navigateLink: '/all-document',
      perm: ['USER', 'ADMIN'],
    },
    {
      title: 'Admin',
      icon: 'fa-regular fa-folder-open',
      navigateLink: '/document-management-admin',
      perm: ['ADMIN'],
    },
  ];
  getWorkshopNavs(index) {
    return [
      {
        title: 'My Workshop',
        icon: 'fa fa-grav',
        navigateLink: '/' + index + '-requisition-emp',
        perm: ['USER', 'ADMIN'],
      },
      //  { title: 'My Approvals',  icon: 'fa-brands fa-nfc-directional',   navigateLink: '/'+index+'-complaint-app'},
      {
        title: 'Admin',
        icon: 'fa fa-grav',
        navigateLink: '/' + index + '-requisition-admin',
        perm: ['ADMIN', 'SD_WORK_ADMIN'],
      },
    ];
  }
  getShutdownNavs(index) {
    return [
      {
        title: 'ACV Shutdown',
        icon: 'fa fa-grav',
        navigateLink: '/' + index + '-requisition-emp',
        perm: ['USER', 'ADMIN'],
      },
      //  { title: 'My Approvals',  icon: 'fa-brands fa-nfc-directional',   navigateLink: '/'+index+'-complaint-app'},
      {
        title: 'Admin',
        icon: 'fa fa-grav',
        navigateLink: '/' + index + '-requisition-admin',
        perm: ['ADMIN', 'SD_ACV_SHUT_ADMIN'],
      },
    ];
  }
  getElcShutdownNavs(index) {
    return [
      {
        title: 'Electrical Shutdown',
        icon: 'fa fa-grav',
        navigateLink: '/' + index + '-requisition-emp',
        perm: ['USER', 'ADMIN'],
      },
      //  { title: 'My Approvals',  icon: 'fa-brands fa-nfc-directional',   navigateLink: '/'+index+'-complaint-app'},
      {
        title: 'Admin',
        icon: 'fa fa-grav',
        navigateLink: '/' + index + '-requisition-admin',
        perm: ['ADMIN', 'SD_ELEC_SHUT_ADMIN'],
      },
    ];
  }
  
  

  getComplaintNavs(index) {
    return [
      {
        title: 'My Complaints',
        icon: 'fa-brands fa-nfc-directional',
        navigateLink: '/' + index + '-complaint-emp',
      },
      //  { title: 'My Approvals',  icon: 'fa-brands fa-nfc-directional',   navigateLink: '/'+index+'-complaint-app'},
      {
        title: 'Admin',
        icon: 'fa-brands fa-nfc-directional',
        navigateLink: '/' + index + '-complaint-admin',
        perm: ['ADMIN', 'SD_ELE_ADMIN'],
      },
    ];
  }
  getTelephoneComplaintNavs(index) {
    return [
      {
        title: 'My Complaints',
        icon: 'fa-brands fa-nfc-directional',
        navigateLink: '/' + index + '-complaint-emp',
      },
      //   { title: 'My Approvals',  icon: 'fa-brands fa-nfc-directional',navigateLink: '/'+index+'-complaint-app'},
      {
        title: 'Admin',
        icon: 'fa-brands fa-nfc-directional',
        navigateLink: '/' + index + '-complaint-admin',
        perm: ['ADMIN', 'SD_TP_ADMIN'],
      },
    ];
  }
  getNetworkComplaintNavs(index) {
    return [
      {
        title: 'My Complaints',
        icon: 'fa-brands fa-nfc-directional',
        navigateLink: '/' + index + '-complaint-emp',
      },
      // { title: 'My Approvals',  icon: 'fa-brands fa-nfc-directional', navigateLink: '/'+index+'-complaint-app'},
      {
        title: 'Admin',
        icon: 'fa-brands fa-nfc-directional',
        navigateLink: '/' + index + '-complaint-admin',
        perm: ['ADMIN', 'SD_NW_ADMIN'],
      },
    ];
  }
  getMechanicalComplaintNavs(index) {
    return [
      {
        title: 'My Complaints',
        icon: 'fa-brands fa-nfc-directional',
        navigateLink: '/' + index + '-complaint-emp',
      },
      // { title: 'My Approvals',  icon: 'fa-brands fa-nfc-directional', navigateLink: '/'+index+'-complaint-app'},
      {
        title: 'Admin',
        icon: 'fa-brands fa-nfc-directional',
        navigateLink: '/' + index + '-complaint-admin',
        perm: ['ADMIN', 'SD_MECH_ADMIN'],
      },
    ];
  }
  
  

  getMomNavs(index) {
    let nav_array = [];
    this.momTypes.forEach((element) => {
      nav_array.push({
        title: element.label,
        icon: 'fa-brands fa-nfc-directional',
        navigateLink: 'meeting-minutes/' + element.label,
        perm: ['USER'],
      });
      //  }
    });
    console.log(' mom type array ', nav_array);
    return nav_array;
    /*
    return [
      { title: 'SORC',  icon: 'fa-brands fa-nfc-directional',navigateLink: 'meeting-minutes/sorc'}, 
      { title: 'SAFTEY',  icon: 'fa-brands fa-nfc-directional',navigateLink: 'meeting-minutes/safety'},  
    ]*/
  }

  getComNavs() {
    let nav_array = [];
   // console.log("complaints", this.comTypes);
    this.comTypes.forEach((element) => {
      let admin_group = 'SD_COM_' + element.ID + '_ADMIN';
      nav_array.push({
        title: element.complaint_type,
        children:[
          {
            title: 'My Complaints',
            icon: 'fa-brands fa-nfc-directional',
            navigateLink:  'custom-complaints-emp/' + element.ID,
          },
          //  { title: 'My Approvals',  icon: 'fa-brands fa-nfc-directional',   navigateLink: '/'+index+'-complaint-app'},
          {
            title: 'Admin',
            icon: 'fa-brands fa-nfc-directional',
            navigateLink: 'custom-complaints-admin/' + element.ID,
            perm: ['ADMIN', admin_group],
          },
        ]      
      });
    
    });
   // console.log("out complain ", nav_array)
    return nav_array;
  }
  getRequisitionNavs() {
    let nav_array = [];
   // console.log("complaints", this.comTypes);
    this.comTypes.forEach((element) => {
      let admin_group = 'SD_COM_' + element.ID + '_ADMIN';
      nav_array.push({
        title: element.complaint_type,
        children:[
          {
            title: 'My Requisition',
            icon: 'fa-brands fa-nfc-directional',
            navigateLink:  'custom-requisition-emp/' + element.ID,
          },
          //  { title: 'My Approvals',  icon: 'fa-brands fa-nfc-directional',   navigateLink: '/'+index+'-complaint-app'},
          {
            title: 'Admin',
            icon: 'fa-brands fa-nfc-directional',
            navigateLink: 'custom-requisition-admin/' + element.ID,
            perm: ['ADMIN', admin_group],
          },
        ]      
      });
    
    });
   // console.log("out complain ", nav_array)
    return nav_array;
  }

  checkChildren(inputElement: any) {
    return inputElement?.children ? true : false;
  }
  getChildren(inputElement: any) {
    return inputElement?.children ? inputElement?.children : [];
  }

  checkPerm(perm) {
    //console.log("perm   ", perm);
    if (!Array.isArray(perm)) {
      return true;
    }
    const userRoleCheck = this.userSession.checkRoleExists(perm);
    return userRoleCheck;
    /*
    const userRole = this.userSession.getRoleName(); 
    if (Array.isArray(userRole) &&  perm.includes(userRole)) {
      return false;
    }else{
        return perm.includes(userRole);
    }*/
  }

  complaints = [
    { title: 'Electrical', children: this.getComplaintNavs('electrical') },
    {
      title: 'Telephone',
      children: this.getTelephoneComplaintNavs('telephone'),
    },
    { title: 'Network', children: this.getNetworkComplaintNavs('network') },
    // {
    //   title: 'Mechanical',
    //   children: this.getMechanicalComplaintNavs('mechanical'),
    // },
   
  ];
  requisition = [
    { title: 'Workshop', children: this.getWorkshopNavs('workshop') },
    {
      title: 'ACV Shutdown',
      children: this.getShutdownNavs('shutdown'),
    },
    {
      title: 'Electrical Shutdown',
      children: this.getElcShutdownNavs('electrical_shutdown'),
    },
   
   
  ];

  UserManagement = [
    { title: 'Users', navigateLink: '/user-management' },
    { title: 'Roles/Groups', navigateLink: '/role-management' },
    { title: 'Organization', navigateLink: '/org' },
  ];
  ImageManagement = [
    { title: 'History about RCL', navigateLink: '/history-about-rcl' },
    { title: 'Gallery Section', navigateLink: '/gallery-section' },
    { title: 'Awards', navigateLink: '/awards' },
    { title: 'License Documents', navigateLink: '/license-documents' },
  ];
  settings = [
    { title: 'Committee', navigateLink: '/meet-types' },
    { title: 'Site settings', navigateLink: '/site-settings' },
    { title: 'Complaint Types', navigateLink: '/complaint-type' },
    { title: 'Document Types', navigateLink: '/document-type' },
    // { title: 'Requisition Types', navigateLink: '/requisition-type' },
    { title: 'Site Log', navigateLink: '/site-log' },
    { title: 'Site Circular', navigateLink: '/site-circular' },
    { title: 'Site Activities', navigateLink: '/site-activities' },
  ];

  meetinRoomNav = [{ title: 'Meeting Rooms', navigateLink: '/meeting-rooms' }];

  dashboardNav = [{ title: 'Dashboard', navigateLink: '/dashboard' }];

  getNavs() {
    let complaints = [...this.complaints, ...this.getComNavs()];
  
    console.log("total complains ", complaints);
    this.navs = [
      {
        title: 'Dashboard',
        icon: 'fa fa-archive',
        navigateLink: '/dashboard',
        perm: [
          'ADMIN',
          'SD_ELE_ADMIN',
          'SD_TP_ADMIN',
          'SD_NW_ADMIN',
          'SD_MECH_ADMIN',
        ],
      },
      {
        title: 'Organization',
        icon: 'fa fa-sitemap',
        navigateLink: '/org-user',
      },
      {
        title: 'Documents',
        icon: ' fa fa-folder-open',
        children: this.documentNavs,
      },
      {
        title: 'Complaints',
        icon: 'fa fa-comments',
        children: complaints,
      },
      {
        title: 'Requisition',
        icon: 'fa fa-grav',
        children: this.requisition,
      },
      {
        title: 'Meeting Rooms',
        icon: 'fa fa-handshake-o',
        navigateLink: '/meeting-rooms',
      },
      {
        title: 'Management',
        icon: 'fa fa-users',
        perm: ['ADMIN'],
        children: this.UserManagement,
      },
      /*
      {
        title: 'Backup',
        icon: 'fa fa-database',
        navigateLink: '/backup',
        perm: [
          'ADMIN',
        
        ],
      },*/
      // {
      //   title: 'Image',
      //   icon: 'fa fa-users',
      //   perm: ['ADMIN'],
      //   children: this.ImageManagement,
      // },
      // {title: 'Settings', icon: 'fa fa-gear', perm:["ADMIN"],children:this.settings}
    ];
    let commiteeNavs = this.getMomNavs('');
    // console.log("committe navs " , commiteeNavs);
    //  if (commiteeNavs.length > 0) {
    this.navs.push({
      title: 'Committee',
      icon: 'fa fa-users',
      perm: ['ADMIN', 'USER'],
      navigateLink: '/meeting-minutes/:mom',
      children: commiteeNavs,
    });
    // let requisitionNavs = this.getRequisitionNavs();
    // // console.log("committe navs " , commiteeNavs);
    // //  if (commiteeNavs.length > 0) {
    // this.navs.push({
    //   title: 'Requisition',
    //   icon: 'fa fa-users',
    //   perm: ['ADMIN', 'USER'],
    //   navigateLink: '/meeting-minutes/:mom',
    //   children: requisitionNavs,
    // });
    //}

    this.navs.push({
      title: 'Settings',
      icon: 'fa fa-gear',
      perm: ['ADMIN'],
      children: this.settings,
    });
    console.log('nav thing s ', this.navs);
  }

  getSmartSideNav() {
    if (this.userSession.checkRole('ADMIN')) {
      return this.admin_nav;
    }
    return this.user_nav;
  }

  onLinkClick(route: string): void {
    console.log('test');
    this.route.navigate([route]);
  }
}
