import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent implements OnInit {
  smartSideNav: any = []
  activesidebar: any
  constructor() { }

  ngOnInit(): void {
    this.createSmartSideNav();
  }

  createSmartSideNav() {
    this.smartSideNav = [
      { title: "Home", icon:"fa-brands fa-creative-commons-share", navigateLink: "/home" },
      { title: "Profile", icon:" fa-chart-simple", navigateLink: "/book" },
      { title: "Rooms", icon: " fa-cart-shopping", navigateLink: "/category" },
      { title: "Personal Details1111", icon:" fa-suitcase", navigateLink: "/personal-details" },
      { title: "History", icon:" fa-arrow-trend-up", navigateLink: "/withdraw" },
      { title: "About", icon:"fa-regular fa-message", navigateLink: "/usermaster" },
      { title: "Sign Out", icon:" fa-arrow-right-from-bracket", navigateLink: "#" },
      //  {title:"Reports",icon:" fa-chart-pie",navigateLink:"/report"},
    ]
  }

  onActivesidebar(link) {

  }

  ngAfterViewInit() {
    let liItems = document.querySelectorAll(".sidebar ul li");
    var hamburger = document.querySelector(".hamburger");
  }
}
