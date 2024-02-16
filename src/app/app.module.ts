import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewModule } from './view/view.module';
import { NgbModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './api-services/core/interceptor.service';
import { SmartapiService } from './api-services/smartapi.service';
import { ApiEndpointsService } from './api-services/core/api-endpoints.service';
import { SpinnerInterceptorService } from './api-services/core/spinner.interceptor.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { InitialstartComponent } from './shared/initialstart/initialstart.component';
import { MatTabsModule } from '@angular/material/tabs';
import { SmartServerTableComponent } from './shared/core/components/smart-server-table/smart-server-table.component';
import { LoginComponent } from './shared/base/login/login.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import {MatMenuModule} from '@angular/material/menu';
import { SignupComponent } from './shared/base/signup/signup.component';
import { ForgetPasswordComponent } from './shared/base/forget-password/forget-password.component';
import { APP_BASE_HREF } from '@angular/common';
import { ChangePasswordComponent } from './shared/base/change-password/change-password.component';
import { SmartFormNewComponent } from './shared/core/components/smart-form-new/smart-form-new.component';
import { SmartModelComponent } from './shared/core/components/smart-model/smart-model.component';
import { SmartmodelService } from './shared/services/smartmodel.service';
import { MatDialogModule } from '@angular/material/dialog';
import { SmartNewDashCardComponent } from './shared/core/components/smart-new-dash-card/smart-new-dash-card.component';
//import { SmartAllowDirective } from './shared/core/directives/smart-allow.directive';
import { NgSelectModule } from '@ng-select/ng-select';





@NgModule({
  declarations: [
    AppComponent,   
    InitialstartComponent,
    LoginComponent,
    SignupComponent,
    ForgetPasswordComponent,
    ChangePasswordComponent,
    SmartModelComponent,
    SmartNewDashCardComponent,
    
   
  //  SmartAllowDirective   
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ViewModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    MatTabsModule,
    NgbTooltipModule,
    PdfViewerModule,
    MatMenuModule,
    MatDialogModule,
    
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptorService, multi: true },
    SmartapiService, ApiEndpointsService,
    { provide: APP_BASE_HREF, useValue: '/' },
    SmartmodelService  
  ],
    
  bootstrap: [AppComponent],
})
export class AppModule { }
