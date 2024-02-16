import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SmartFormField, SmartValidationConfig } from '../../../SmartInterfaces/SmartFormNewInterface';


@Component({
  selector: 'app-smart-file',
  templateUrl: './smart-file.component.html',
  styleUrls: ['./smart-file.component.css']
})
export class SmartFileComponent {

  @Input("item") item: SmartFormField;
  @Input("setValidationError") setValidationError = new EventEmitter();
  @Output("setUploadedFile") setUploadedFile = new EventEmitter();  
  selectedFiles: any[] =[];

  // file selected
  onFileSelected(event: any): void {
    const fileInput = event.target;
    if (fileInput.files && fileInput.files.length > 0) {
      if(this.item.fileType==="multiple"){
        this.selectedFiles.push(fileInput.files[0]);
        this.setFileUploaded(); 
      }else{
        this.selectedFiles=[fileInput.files[0]];
        this.setFileUploaded();   
      }
    }
  }
  /**
   * 
   * @param index 
   */
  removeFile(index:number){
    if(this.item.fileType=="multiple"){

    }else{
       this.selectedFiles =[];
    }
    this.setFileUploaded();   
  }
  /**
   * 
   */
  setFileUploaded() {
    // updating the selected File
    this.setUploadedFile.emit({name:this.item.name , value:this.selectedFiles[0]!==undefined ? this.selectedFiles[0] :""});
    // 
  }


  formatFileSize(size: number): string {
    if (size < 1024) {
      return size + ' B';
    } else if (size < 1048576) {
      return (size / 1024).toFixed(2) + ' KB';
    } else {
      return (size / 1048576).toFixed(2) + ' MB';
    }
  }
  
 

}
