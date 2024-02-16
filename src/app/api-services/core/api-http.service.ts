import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SessionStorageServiceService } from './session-storage-service.service';
const headers = new HttpHeaders();
headers.append('Content-Type', 'application/json');
headers.append('Content-Type', 'text/plain')


@Injectable({
  providedIn: 'root'
})

export class ApiHttpService implements OnDestroy {
   
   headers:HttpHeaders = null;
   private ngUnsubscribe = new Subject();

  constructor(
    private http: HttpClient,
    private userSession:SessionStorageServiceService
  ) { 
   

  }

  ngOnDestroy(): void {
    //this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public update_token_header(options:any=''){
    const token = this.userSession.getToken();
    if(options){
      this.headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,      
      });
    }else{
      this.headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type' :'application/json'
      });
    }
   
  }

  public get(url: string, urlIndex = 0, options?: any): Observable<any> {   
    this.update_token_header(options);
    return this.http.get(environment.BASE_API_URL[urlIndex ? urlIndex : 0] + url, {headers: this.headers }).pipe(takeUntil(this.ngUnsubscribe));;
  }

  public post(url: string, data: any, urlIndex = 0, options?: any): Observable<any> {
    this.update_token_header(options);    
   //  return this.http.post(environment.BASE_API_URL[urlIndex ? urlIndex : 0] + url, data, options ? options : headers);
    return this.http.post(environment.BASE_API_URL[urlIndex ? urlIndex : 0] + url, data,  {headers: this.headers });
  }

  public put(url: string, data: any, urlIndex = 0, options?: any): Observable<any> {
   // headers.append('authorization',this.usersession.getToken());
    return this.http.put(environment.BASE_API_URL[urlIndex ? urlIndex : 0] + url, data,  {headers: this.headers });
  }

  public delete(url: string, urlIndex = 0, options?: any): Observable<any> {
   // headers.append('authorization',this.usersession.getToken());
     this.update_token_header();
    return this.http.delete(environment.BASE_API_URL[urlIndex ? urlIndex : 0] + url,  {headers: this.headers });
  }
  
  public getFullUrl(url:string,urlIndex=0){
   return  environment.BASE_API_URL[urlIndex ? urlIndex : 0] + url
  }

  public postPdf(url: string, data: any, urlIndex = 0, options?: any): Observable<any> {
    const token = this.userSession.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/pdf',
      'Accept': 'application/pdf',
      'Authorization': `Bearer ${token}`,
    });  
   //  return this.http.post(environment.BASE_API_URL[urlIndex ? urlIndex : 0] + url, data, options ? options : headers);
    return this.http.post(environment.BASE_API_URL[urlIndex ? urlIndex : 0] + url, data,  {headers: headers,
      responseType: 'arraybuffer'});
  }

}
