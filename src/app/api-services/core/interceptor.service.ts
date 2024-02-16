import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NotifyService } from '../common/notify.service';
import { ERRORS } from '../../helpers/errors';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

  constructor(
    private router: Router,
    private notify: NotifyService,
  ) { }

  showErrorMsg(err){
    console.log("error " ,err);
    let errors = err.error!=undefined && err.error.errors!==undefined ? err.error.errors : [];
    if(errors.length > 0){
       // this is joi validations
       let msg = errors[0].messages[0];
       this.notify.error(msg);
    }
    // check if error error messgae is set
    let message = err.error!==undefined && err.error.message!==undefined ? err.error.message : "";
    if(message.length >0){
      this.notify.error(message);
    }
  }

  showInternalMsg(err){  
    // check if error error messgae is set
    let message = err.error!==undefined && err.error.message!==undefined && err.error.message.sqlMessage!==undefined ? err.error.message.sqlMessage : "";
    if(message.length >0){
      this.notify.error(message);
    }
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      //     headers: request.headers.set('Content-Type', 'text/plain')..set('Content-Type', 'text/plain'),
    })

    return next.handle(request).pipe(tap(() => {
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
       // console.log("error ", err);
        if (err.status === 503) {
          this.router.navigate(['undermaintenance']);
          this.notify.error(ERRORS.COMMON)
        }else if (err.status === 400) {         
          this.showErrorMsg(err);          
        }else if (err.status === 401) {   
          this.showErrorMsg(err); 
        }else if (err.status === 500) {   
          this.showInternalMsg(err); 
        }else if (err.status === 0) {
        //  this.router.navigate(['undermaintenance']);
          this.notify.error(ERRORS.SERVER_NOT_AVAILABLE)
        } else {
          if (err?.error?.msg) {
            this.notify.error(err?.error?.msg)
          } else {
            this.notify.error(err?.message)
          }
        }
      }
    }
    ));
  }
}
