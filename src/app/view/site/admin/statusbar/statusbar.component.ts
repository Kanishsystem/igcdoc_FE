import { Component } from '@angular/core';

@Component({
  selector: 'app-statusbar',
  templateUrl: './statusbar.component.html',
  styleUrls: ['./statusbar.component.css']
})
export class StatusbarComponent {
  divData = [
    { id: "01/Aug/2017", content: "Available" },
    { id: "02/Aug/2017", content: "Taken" },
    { id: "03/Aug/2017", content: "broken" },
     { id: "04/Aug/2017", content: "fixed" },
     { id: "05/Aug/2017", content: "Available" },
     { id: "06/Aug/2017", content: "Taken boy" },
     { id: "06/Aug/2017", content: "Broken" },
  ];
}
