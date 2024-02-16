import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiEndpointsService } from './core/api-endpoints.service';
import { ApiHttpService } from './core/api-http.service';
import { SecurityService } from './common/security.service';
import { environment } from 'src/environments/environment';
import { API_ROUTER } from './api-router';

@Injectable({
  providedIn: 'root',
})
export class SmartapiService {
  constructor(
    private apiHttpServices: ApiHttpService,
    private apiEndPointServices: ApiEndpointsService,
    private securityService: SecurityService
  ) { }

  public smartPost(url, payload, customRoute = false, encrypt = false, options = '') {
   // const headers = new HttpHeaders();
    if (encrypt || environment.RES_REQ_SECURITY) {
      payload = this.securityService.encrypt(payload)
    }
    if (!customRoute) {
      url = API_ROUTER[url]!==undefined ? API_ROUTER[url] : url;
    }  
    return this.apiHttpServices.post(url, payload,0, options)
  }

  public smartPostPdf(url, payload, customRoute = false, encrypt = false, options = '') {
    // const headers = new HttpHeaders();
     if (encrypt || environment.RES_REQ_SECURITY) {
       payload = this.securityService.encrypt(payload)
     }
     if (!customRoute) {
       url = API_ROUTER[url]!==undefined ? API_ROUTER[url] : url;
     }  
     return this.apiHttpServices.postPdf(url, payload,0, options)
   }

  public smartGet(url, customRoute = false, decrypt = false, urlIndex = 0, options = {}) {
    if (decrypt || environment.RES_REQ_SECURITY) {
      url = this.securityService.decrypt(url)
    }
    if (!customRoute) {
      url = API_ROUTER[url]!==undefined ? API_ROUTER[url] : url;
    }
    return this.apiHttpServices.get(url, urlIndex = 0)
  }

  public smartPut(url, payload, customRoute = false, encrypt = false, urlIndex = 0, options = {}) {
    if (encrypt || environment.RES_REQ_SECURITY) {
      payload = this.securityService.encrypt(payload)
    }
    if (!customRoute) {
      url = API_ROUTER[url]
    }
    return this.apiHttpServices.put(url, payload, urlIndex, options)
  }

  public smartDelete(url, customRoute = false, urlIndex = 0, options = {}) {
    if (!customRoute) {
      url = API_ROUTER[url]!==undefined ? API_ROUTER[url] : url;
    }
    return this.apiHttpServices.delete(url, urlIndex = 0, options)
  }

  public getFullUrl(url:string){
    return this.apiHttpServices.getFullUrl(url,0);
  }
  /**
   * 
   * @param data 
   * @returns 
   */
  public preparePostData(data:any){
    const formData = new FormData();
    /*
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        formData.append(key, data[key]);
      }
    }*/
    function flattenObject(obj, parentKey) {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const currentKey = parentKey ? `${parentKey}[${key}]` : key;
  
          if (Array.isArray(obj[key])) {
            // Flatten the array of objects
            obj[key].forEach((item, index) => {
              flattenObject(item, `${currentKey}[${index}]`);
            });
          } else if (typeof obj[key] === 'object' && obj[key] !== null) {
            // Recursively handle nested objects
            flattenObject(obj[key], currentKey);
          } else {
            // Append key-value pairs to FormData
            formData.append(currentKey, obj[key]);
          }
        }
      }
    }
  
    flattenObject(data,null);
    return formData;
  }
}
