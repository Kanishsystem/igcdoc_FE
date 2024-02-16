import { Component, ElementRef, Input } from '@angular/core';

import 'pdfjs-dist/build/pdf';

declare var pdfjsLib: any;

@Component({
  selector: 'app-smart-pdf-view',
  templateUrl: './smart-pdf-view.component.html',
  styleUrls: ['./smart-pdf-view.component.css']
})
export class SmartPdfViewComponent {

  @Input('data') data: any;

  private pdf: any;
  private container: HTMLElement;

  constructor(private elementRef: ElementRef) {}
  // get unit array from base 64 binary
  getUnitArray(){
    const base64Data = this.data; 
    console.log("base64Data " , base64Data);
    const binaryData = atob(base64Data);
    const uint8Array = new Uint8Array(binaryData.length);

    for (let i = 0; i < binaryData.length; i++) {
      uint8Array[i] = binaryData.charCodeAt(i);
    }
    return uint8Array;
  }

  renderPage(pageNumber: number): void {
    const canvas = document.createElement('canvas');
    canvas.classList.add('pdf-canvas'); 
    this.container.appendChild(canvas);
    this.pdf.getPage(pageNumber).then((page: any) => {
      const viewport = page.getViewport({ scale: 1 });
      //const canvas = document.createElement('canvas');
      //canvas.classList.add('pdf-canvas'); 
      //canvas.attributes.
      
      const context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      page.render({ canvasContext: context, viewport });
    });
  }

  renderAllPages(){
   const numPages = this.pdf.numPages;
   //console.log("number of pages " , numPages);
   for(let i=1; i<=numPages;i++){
      //console.log("render pahe " , i);
       this.renderPage(i);
   }

  }


  ngAfterViewInit() {
    this.container = this.elementRef.nativeElement.querySelector('#pdfViewer');    
    //const pdfPath = 'http://localhost:4200/assets/test.pdf';    
    pdfjsLib.getDocument({ data: this.getUnitArray() }).promise.then((pdf: any) => {
      this.pdf = pdf;
      this.renderAllPages();
    });
  }

}
