import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoaderService } from './loader.service';
import { Observable, finalize } from 'rxjs';
import { SPINNER_BLOCK_API } from '../api-router';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SpinnerInterceptorService implements HttpInterceptor  {

  private count = 0;

  constructor(
    private loaderService  :  LoaderService,
    private router: Router,
    ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(!SPINNER_BLOCK_API.includes(req.url) && !(req.url.indexOf("get_one_image_new") != -1)){
      if (this.count === 0) {
        this.loaderService.setHttpProgressStatus(true);
      }
      this.count++;
      return next.handle(req).pipe(
        finalize(() => {
          this.count--;
          if (this.count === 0) {
            this.loaderService.setHttpProgressStatus(false);
          }
        }));
    }else{
      return next.handle(req)
    }
  }
}
