import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { SmartFormField } from '../../../SmartInterfaces/SmartFormNewInterface';

@Component({
  selector: 'app-smart-image',
  templateUrl: './smart-image.component.html',
  styleUrls: ['./smart-image.component.css']
})
export class SmartImageComponent implements OnInit{
  @Input("item") item: SmartFormField;
  @Input("inputValue") inputValue:any;
  @Output("selectCheckedList") selectedCheckedList = new EventEmitter();
  @ViewChild('imageCropForm') imageCropForm: any;
  imagePath: string = 'assets/images/browse-file.png';
  imageChangedEvent: any = '';
  croppedImage: any = '';
  finalImage:any='';
  modalRef: any;
  // Add rotation and scale properties
  canvasRotation = 0;
  rotation = 0;
  transform: any = {};
  rotateAngle: number = 0;
  scale: number = 1;
  containWithinAspectRatio = false;
  croppedImageDimensions: { width: number; height: number } = { width: 0, height: 0 };
  croppedImageSize: string = ""; // Size in bytes
  /**
   * 
   * @param modalService 
   */
  constructor(private modalService: NgbModal) {
    this.finalImage = this.imagePath;
   // this.croppedImage = this.finalImage;
  }

  ngOnInit(): void {
     if(this.inputValue!==undefined && this.inputValue!==null && this.inputValue.length > 5){
        this.finalImage = this.inputValue; 
        this.croppedImage =  this.inputValue;      
     }
  }

  /**
   * 
   * @param sizeInBytes 
   * @returns 
   */
  formatFileSize(sizeInBytes: number): string {
    if (sizeInBytes === 0) {
      return '0 B';
    }  
    const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const base = 1024;
    const exponent = Math.min(Math.floor(Math.log(sizeInBytes) / Math.log(base)), units.length - 1);
    const formattedSize = (sizeInBytes / Math.pow(base, exponent)).toFixed(2);  
    return `${formattedSize} ${units[exponent]}`;
  }
  /**
   * 
   * @param event 
   */
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.openCropForm();
  }
  /**
   * 
   * @param event 
   */
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.croppedImageSize = this.formatFileSize(this.getImageSizeInBytes(this.croppedImage));  
  }
  /**
   * 
   * @param base64Image 
   * @returns 
   */
  private getImageSizeInBytes(base64Image: string): number {
    // Calculate the size of the base64 image in bytes
    const padding = base64Image.charAt(base64Image.length - 2) === '=' ? 2 : base64Image.charAt(base64Image.length - 1) === '=' ? 1 : 0;
    return Math.ceil((base64Image.length / 4) * 3 - padding) / 10;
  }
  /**
   * 
   */
  uploadCroppedImage() {
    //this.modalService.
    this.modalRef.close();
    // update the image 
    this.finalImage = this.croppedImage;
    // 
    this.shareUpdatedData();
    // Implement your image upload logic here using an HTTP service.
    // You can send the croppedImage base64 data to the server.
  }
  /**
   * 
   */
  rotateLeft() {
    this.canvasRotation--;
    this.flipAfterRotate();
  }
  /**
   * 
   */
  rotateRight() {
    this.canvasRotation++;
    this.flipAfterRotate();
  }
  /**
   * 
   */
  private flipAfterRotate() {
    const flippedH = this.transform.flipH;
    const flippedV = this.transform.flipV;
    this.transform = {
      ...this.transform,
      flipH: flippedV,
      flipV: flippedH
    };
  }
  /**
   * 
   */
  flipHorizontal() {
    this.transform = {
      ...this.transform,
      flipH: !this.transform.flipH,
    };
  }
  /**
   * 
   */
  flipVertical() {
    this.transform = {
      ...this.transform,
      flipV: !this.transform.flipV,
    };
  }
  /**
   * 
   */
  resetImage() {
    this.scale = 1;
    this.rotation = 0;
    this.canvasRotation = 0;
    this.transform = {};
  }
  /**
   * 
   */
  zoomOut() {
    this.scale -= 0.1;
    this.transform = {
      ...this.transform,
      scale: this.scale,
    };
  }
  /**
   * 
   */
  zoomIn() {
    this.scale += 0.1;
    this.transform = {
      ...this.transform,
      scale: this.scale,
    };
  }
  /**
   * 
   */
  toggleContainWithinAspectRatio() {
    this.containWithinAspectRatio = !this.containWithinAspectRatio;
  }
  /**
   * 
   */
  updateRotation() {
    this.transform = {
      ...this.transform,
      rotate: this.rotation,
    };
  }

  openCropForm(data: any = []) {
    // this.formData = data;
    this.modalRef = this.modalService.open(this.imageCropForm, { size: 'lg' });
  }
  /**
   * 
   */
  shareUpdatedData() {
    // updating the selected list
    this.selectedCheckedList.emit({name:this.item.name , value:this.croppedImage});
  }

}
