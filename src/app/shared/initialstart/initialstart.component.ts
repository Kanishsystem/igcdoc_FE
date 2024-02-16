import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-initialstart',
  templateUrl: './initialstart.component.html',
  styleUrls: ['./initialstart.component.css']
})
export class InitialstartComponent {

  constructor(private route: Router) {
  }
  startApplication(){
    this.route.navigate(['/add'])
  }
}
