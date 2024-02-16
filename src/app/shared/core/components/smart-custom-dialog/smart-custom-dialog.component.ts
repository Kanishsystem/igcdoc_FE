import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SmartDialogConfig } from '../../SmartInterfaces/SmartDialogInterface';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SmartapiService } from 'src/app/api-services/smartapi.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-smart-custom-dialog',
  templateUrl: './smart-custom-dialog.component.html',
  styleUrls: ['./smart-custom-dialog.component.css']
})
export class SmartCustomDialogComponent {

  @Output() confirmed = new EventEmitter<any>();
  @Input() title: string;
  @Input() message: string;
  pdfData:any;
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: SmartDialogConfig,
    public dialogRef: MatDialogRef<SmartCustomDialogComponent>,
    private sanitizer: DomSanitizer,
    private api: SmartapiService,
    private http: HttpClient,
  ) {}

  ngOnInit() {
    if(this.data.iframe){
      this.getPdfData();
    }   
  }
  onButtonClick(action: string): void {   
     this.confirmed.emit({action:action});
     this.dialogRef.close();
  }
  // on close click
  onCloseClick():void{
    this.dialogRef.close();
  }

  get alertClass(){
    if(this.data.type=="LINK-ALERT"){
      return  "smart-link-confirm";
    }else if(this.data.type=="SMART-ACTION"){
      return "smart-action-confirm" 
    }else if(this.data.type=="DEFAULT-ALERT"){
      return "smart-action-default" 
    }else if(this.data.type=="CUSTOM-ALERT"){
      return this.data?.class;
    }else{
      return  "smart-delete-confirm";
    }
  }

  get widthClass(){
    return  this.data.width ? "smart-alert-width-" + this.data.width : "";
  }

  get dialogClass(){
     return this.alertClass + " " + this.widthClass;
  }

  get url(){
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.data.iframe);
  }

  getPdfData(){
    let payload = this.data.iframe_payload ? this.data.iframe_payload : {};
    /*
    this.api.smartPostPdf(this.data.iframe, payload).subscribe((res: any) => {
      //this.pdfData = new Blob([res], { type: 'application/pdf' });
      console.log("res === " , res);
      this.pdfData = res.content;
      console.log("pdf data  " , this.pdfData);
    });
    */
   this.api.smartPost(this.data.iframe,payload).subscribe((res:any)=>{
      this.pdfData = res.content;
   })
    /*
    const headers = new HttpHeaders({
      'Content-Type': 'application/pdf',
      'Accept': 'application/pdf'
    });
    let url  = this.api.getFullUrl(this.data.iframe);
    //url = 'http://localhost:4200/assets/abhi.pdf';
    this.http.post(url,{}, {  headers: headers,responseType: 'arraybuffer' }).subscribe(
    (data) => {
      this.pdfData = new Blob([data], { type: 'application/pdf' });
    },
    (error) => {
      //console.error(error);
    }
  );*/


  }

  getPdfUrl(): SafeResourceUrl {
    return this.pdfData ? this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(this.pdfData)) :null;
  }

}
