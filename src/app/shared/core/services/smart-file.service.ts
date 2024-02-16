import { Injectable } from '@angular/core';
import { SmartapiService } from 'src/app/api-services/smartapi.service';

@Injectable({
  providedIn: 'root'
})
export class SmartFileService {

  constructor(
    private api: SmartapiService,
  ) { }
  /**
   * 
   * @param base64Content 
   * @returns 
   */
  public base64ToUnitArray(base64Content: string): Uint8Array {
    const byteCharacters = atob(base64Content);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return byteArray;
  }
  /**
   * 
   * @param byteArray 
   */
  public createBlobUrl(byteArray: Uint8Array, fileName: string): void {
    const blob = new Blob([byteArray], { type: 'application/octet-stream' });
    // Create a download link and trigger the download
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.style.display = 'none';
    a.href = url;
    a.download = fileName; // Replace with the actual file name and extension
    a.click();
    window.URL.revokeObjectURL(url);
  }
  /**
   * 
   * @param base64Content 
   */
  public downLoadFile(base64Content: string, fileName: string) {
    let byteArray: Uint8Array = this.base64ToUnitArray(base64Content);
    this.createBlobUrl(byteArray, fileName);
  }

  public getRandomFileName(){
     return "file" + Date.now();
  }

  public uploadFile(file: any,progress_call_back:Function,call_back:Function) {   
    const chunkSize = 10 * 1024 * 1024; 
    const totalChunks = Math.ceil(file.size / chunkSize);
    let uploadedChunks = 0;
    let offset = 0;
    const reader = new FileReader();
    const file_name = this.getRandomFileName();
    reader.onloadend = () => {
      if (reader.result) {
        const base64Chunk = reader.result.toString().split(',')[1];
        // Extract base64 data
        let data_in = { chunk: base64Chunk, offset,file_name:file_name};
        this.api.smartPost("AUTH_CHUNK_UPLOAD", data_in).subscribe((res) => {
          uploadedChunks++;        
          if (uploadedChunks === totalChunks) {            
             //this.sendLastChunk(offset,file_name);
             call_back(offset,file_name);
          }else{
            progress_call_back(file["name"],totalChunks,uploadedChunks);
          }          
        });
       // this.sendChunkToServer(base64Chunk, offset);
        offset += chunkSize;
        if (offset < file.size) {
          readNextChunk();
        } else {         
          //console.log('File upload complete');
        }
      }
    };
    const readNextChunk = () => {
      const blob = file.slice(offset, offset + chunkSize);
      reader.readAsDataURL(blob);
    };
    readNextChunk();
  }

  /**
   * 
   * @param base64Chunk 
   * @param offset 
   */
  public sendLastChunk(offset: number,file_name:string) {   
    let data_in = { last_offset:offset,file_name:file_name};
    this.api.smartPost("AUTH_CHUNK_FINAL", data_in).subscribe((res) => {
        console.log("Res ", res);
    });
  }



}
