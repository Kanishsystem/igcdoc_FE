import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SmartFormComponent } from '../shared/core/components/smart-form/smart-form.component';
import { SmartValidationComponent } from '../shared/core/components/smart-validation/smart-validation.component';
import { SmartTableComponent } from '../shared/core/components/smart-table/smart-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SmarterrormessageDirective } from '../shared/core/directives/smarterrormessage.directive';
import { SmartmandatoryDirective } from '../shared/core/directives/smartmandatory.directive';
import { SmartuppercaseDirective } from '../shared/core/directives/smartuppercase.directive';
import { SmartallowonlyDirective } from '../shared/core/directives/smartallowonly.directive';
import { SmartinputborderDirective } from '../shared/core/directives/smartinputborder.directive';
import { SmartChartComponent } from '../shared/core/components/smart-chart/smart-chart.component';
import { SmartDashboardCardsComponent } from '../shared/core/components/smart-dashboard-cards/smart-dashboard-cards.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SmarttableshortDirective } from '../shared/core/directives/smarttableshort.directive';
import { NgbDateParserFormatter, NgbDropdownModule, NgbModalConfig, NgbModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { SmartautoheightDirective } from '../shared/core/directives/smartautoheight.directive';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CustomdateformatService } from '../api-services/common/customdateformat.service';
import { ImageCropperModule } from 'ngx-image-cropper';
import { WebcamModule } from 'ngx-webcam';
import { UploadComponent } from '../shared/upload/upload.component';
import { CameraComponent } from '../shared/upload/camera/camera.component';
import { ImageCropperComponent } from '../shared/upload/image-cropper/image-cropper.component';
import { AlertComponent } from '../shared/alert/alert.component';
import { ViewComponent } from './view.component';
import { RouterModule } from '@angular/router';
import { TopheaderComponent } from '../shared/base/topheader/topheader.component';
import { NotfoundComponent } from '../shared/base/notfound/notfound.component';
import { FooterComponent } from '../shared/base/footer/footer.component';
import { SidenavComponent } from '../shared/base/sidenav/sidenav.component';
import { SmartServerTableComponent } from '../shared/core/components/smart-server-table/smart-server-table.component';
import {MatMenuModule} from '@angular/material/menu';
import { SmartButtonComponent } from '../shared/core/components/smart-button/smart-button.component';
import { SmartTablenewComponent } from '../shared/core/components/smart-tablenew/smart-tablenew.component';
import { SmartPaginationComponent } from '../shared/core/components/smart-pagination/smart-pagination.component';
import { SmartThemeNavComponent } from '../shared/base/smart-theme-nav/smart-theme-nav.component';
import { SmartTextComponent } from '../shared/core/components/smart-form-new/smart-text/smart-text.component';
import { SmartFormNewComponent } from '../shared/core/components/smart-form-new/smart-form-new.component';
import { SmartLoginComponent } from './smart-login/smart-login.component';
import { SmartSelectComponent } from '../shared/core/components/smart-form-new/smart-select/smart-select.component';
import { SmartImageComponent } from '../shared/core/components/smart-form-new/smart-image/smart-image.component';
import { SmartDashCardsComponent } from '../shared/core/components/smart-dash-cards/smart-dash-cards.component';
import { SmartLoginSignupComponent } from './smart-login-signup/smart-login-signup.component';

import { UserManagementComponent } from './site/admin/user-management/user-management.component';
import { RoleManagentComponent } from './site/admin/role-managent/role-managent.component';
import { DocumentsComponent } from './site/admin/documents/documents.component';
import { MeetingRoomComponent } from './site/admin/meeting-room/meeting-room.component';
import { ElectricalComplaintsAdminComponent } from './site/admin/electrical-complaints-admin/electrical-complaints-admin.component';
import { TelephoneComplaintAdminComponent } from './site/admin/telephone-complaint-admin/telephone-complaint-admin.component';
import { TypesManagementSystemComponent } from './site/admin/types-management-system/types-management-system.component';
import { SiteSettingsComponent } from './site/admin/site-settings/site-settings.component';
import { SiteLogComponent } from './site/admin/site-log/site-log.component';
import { SmartMeetComponent } from '../shared/core/components/smart-meet/smart-meet.component';
import { SmartFileComponent } from '../shared/core/components/smart-form-new/smart-file/smart-file.component';
import { SmartCustomDialogComponent } from '../shared/core/components/smart-custom-dialog/smart-custom-dialog.component';
import { SiteCircularComponent } from './site/admin/site-circular/site-circular.component';
import { DashboardComponent } from './site/dashboard/dashboard.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { UserProfileComponent } from './site/admin/user-profile/user-profile.component';
import { SmartListComponent } from '../shared/core/components/smart-list/smart-list.component';
import { SmartCarouselComponent } from '../shared/core/components/smart-carousel/smart-carousel.component';
import { SmartDateComponent } from '../shared/core/components/smart-form-new/smart-date/smart-date.component';
import { SmartAllowDirective } from '../shared/core/directives/smart-allow.directive';
import { SiteActivitiesComponent } from './site/admin/site-activities/site-activities.component';
import { AllDocumentComponent } from './site/admin/all-document/all-document.component';
import { OrgComponent } from './site/org/org.component';
import { StatusbarComponent } from './site/admin/statusbar/statusbar.component';
import { SmartOrgComponent } from '../shared/core/components/smart-org/smart-org.component';
import { NetworkComplaintsComponent } from './site/admin/network-complaints/network-complaints.component';
import { SubViewComponent } from './site/sub-view/sub-view.component';
import { MinutesOfMeetingComponent } from './site/admin/minutes-of-meeting/minutes-of-meeting.component';
import { SmartPdfViewComponent } from '../shared/core/components/smart-pdf-view/smart-pdf-view.component';
import { MeetTypesComponent } from './site/admin/meet-types/meet-types.component';
import { SmartCardComponent } from './site/smart-card/smart-card.component';
import { NewLoginComponent } from './site/new-login/new-login.component';
import { MechanicalComplaintsComponent } from './site/admin/mechanical-complaints/mechanical-complaints.component';
import { LandingScreenComponent } from './site/landing-screen/landing-screen.component';
import { SmartLandingComponent } from './site/smart-landing/smart-landing.component';
import { LoginPageComponent } from './site/login-page/login-page.component';
import { ImageSliderComponent } from './site/image-slider/image-slider.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { CustomComplaintsComponent } from './site/custom-complaints/custom-complaints.component';
import { DocTypeComponent } from './site/doc-type/doc-type.component';
import { ComplaintTypeComponent } from './site/complaint-type/complaint-type.component';
import { RequisitionTypesComponent } from './site/admin/requisition-types/requisition-types.component';
import { CustomRequisitionComponent } from './site/admin/custom-requisition/custom-requisition.component';
import { WorkshopComponent } from './site/admin/workshop/workshop.component';
import { ShoutdownComponent } from './site/admin/shoutdown/shoutdown.component';
import { ElectricalShutdownComponent } from './site/admin/electrical-shutdown/electrical-shutdown.component';
import { HomeImagesComponent } from './site/admin/home-images/home-images.component';
import { HistoryAboutRclComponent } from './site/admin/history-about-rcl/history-about-rcl.component';
import { GallerySectionComponent } from './site/admin/gallery-section/gallery-section.component';
import { LicenseDocumentsComponent } from './site/admin/license-documents/license-documents.component';
import { AwardsComponent } from './site/admin/awards/awards.component';
import { MeetProposalsComponent } from './site/admin/meet-proposals/meet-proposals.component';
import { BackupComponent } from './site/backup/backup.component';
import { HomeFormsComponent } from './site/admin/home-forms/home-forms.component';



@NgModule({
  declarations: [
    ViewComponent,
    SmartFormComponent,
    SmartValidationComponent,
    SmartButtonComponent,
    SmartTableComponent,
    SmartTablenewComponent,
    SmartChartComponent,
    SmartDashboardCardsComponent,
    UploadComponent,
    CameraComponent,
    ImageCropperComponent,
    SmarterrormessageDirective,
    SmartmandatoryDirective,
    SmartuppercaseDirective,
    SmartallowonlyDirective,
    SmartinputborderDirective,
    SmarttableshortDirective,
    SmartautoheightDirective,
    AlertComponent,
    FooterComponent,
    NotfoundComponent,
    TopheaderComponent,
    SidenavComponent,
    SmartServerTableComponent,
    SmartPaginationComponent,
    SmartThemeNavComponent,
    SmartTextComponent,
    SmartFormNewComponent,
    SmartLoginComponent,
    SmartSelectComponent,
    SmartImageComponent,
    SmartDashCardsComponent,
    SmartLoginSignupComponent,
    UserManagementComponent,
    RoleManagentComponent,
    DocumentsComponent,
    MeetingRoomComponent,
    ElectricalComplaintsAdminComponent,
    TelephoneComplaintAdminComponent,
    TypesManagementSystemComponent,
    SiteSettingsComponent,
    SiteLogComponent,
    SmartMeetComponent,
    SmartFileComponent,
    SmartCustomDialogComponent,
    SiteCircularComponent,
    DashboardComponent,
    UserProfileComponent,
    SmartListComponent,
    SmartCarouselComponent,
    SmartDateComponent,
    SmartAllowDirective,
    SiteActivitiesComponent,
    AllDocumentComponent,
    OrgComponent,
    StatusbarComponent,
    SmartOrgComponent,
    NetworkComplaintsComponent,
    SubViewComponent,
    MinutesOfMeetingComponent,
    SmartPdfViewComponent,
    MeetTypesComponent,
    SmartCardComponent,
    NewLoginComponent,
    MechanicalComplaintsComponent,
    LandingScreenComponent,
    SmartLandingComponent,
    LoginPageComponent,
    ImageSliderComponent,
    CustomComplaintsComponent,
    DocTypeComponent,
    ComplaintTypeComponent,
    RequisitionTypesComponent,
    CustomRequisitionComponent,
    WorkshopComponent,
    ShoutdownComponent,
    ElectricalShutdownComponent,
    HomeImagesComponent,
    HistoryAboutRclComponent,
    GallerySectionComponent,
    LicenseDocumentsComponent,
    AwardsComponent,
    MeetProposalsComponent,
    BackupComponent,
    HomeFormsComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgbModule,
    RouterModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    ImageCropperModule,
    WebcamModule,
    NgbDropdownModule,
    ToastrModule.forRoot(),
    NgbTooltipModule,
    DatePipe,
    MatMenuModule,
    PdfViewerModule,
    NgSelectModule
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [DatePipe, NgbModalConfig, { provide: NgbDateParserFormatter, useClass: CustomdateformatService }],
  exports: [SmartFormComponent, SmartValidationComponent, SmartTableComponent, SmarterrormessageDirective, SmartmandatoryDirective]
})
export class ViewModule { }
