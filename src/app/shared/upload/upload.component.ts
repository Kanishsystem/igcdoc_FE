import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifyService } from 'src/app/api-services/common/notify.service';
import { SpinnerService } from 'src/app/api-services/common/spinner.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit{
  @ViewChild('imageUpload') imageUpload!: ElementRef;
  @ViewChild('pdfUpload') pdfUpload!: ElementRef
  isFileSelector :  string = "SELECT";
  fileSelector :  any ="IMAGE"
  captureType : string
  base64Data : any
  base64PDF : any

  constructor(
    private notify :  NotifyService,
    private spinner : SpinnerService,
    private modalServices : NgbModal,
    private sanitize :  DomSanitizer
  ){

  }

  ngOnInit(): void {
   
  }

  onProceed(){
    if(this.fileSelector == "IMAGE"){
        this.imageUpload.nativeElement.value = '';
        this.imageUpload.nativeElement.click()
    }else if(this.fileSelector == "CAMERA"){
      this.isFileSelector  =  "CAPTURE"
      this.captureType =  this.fileSelector
    }else if(this.fileSelector == "PDF"){
      this.pdfUpload.nativeElement.value = '';
      this.pdfUpload.nativeElement.click();
    }
  }

  ngAfterViewInit(){
    
  }

  resetCapture(){
    this.captureType =  '';
    this.isFileSelector =  "SELECT"
  }

  onSave(){
      let payload : {
        
      }
      this.notify.success("Document Uploaded SuccessFully")
      this.modalServices.dismissAll();

  }

  capturedData(data){
    if(data?._mimeType == "image/jpeg")
    this.base64Data = data?._imageAsDataUrl
    this.isFileSelector =  "CROPPER"
  }

  getCroppedImage(data){
    this.isFileSelector =  "FINAL"
    this.base64Data  =  data?.base64Image
  }

  getUploadedImage(event){
    if(this.fileSelector == 'IMAGE'){
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.base64Data = reader.result;
        this.isFileSelector =  "CROPPER"
      };
    }else if(this.fileSelector == 'PDF'){
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        let base64PDFData : any = reader?.result;
        this.base64PDF =  this.sanitize.bypassSecurityTrustResourceUrl(base64PDFData)
        this.isFileSelector =  "FINAL"
      };
    }

  }
}
