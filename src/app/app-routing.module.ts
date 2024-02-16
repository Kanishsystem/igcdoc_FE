import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './shared/base/notfound/notfound.component';
import { UndermaintenanceComponent } from './shared/base/undermaintenance/undermaintenance.component';
import { InitialstartComponent } from './shared/initialstart/initialstart.component';
import { ViewComponent } from './view/view.component';
import { LoginComponent } from './shared/base/login/login.component';
import { SignupComponent } from './shared/base/signup/signup.component';
import { ForgetPasswordComponent } from './shared/base/forget-password/forget-password.component';
import { ChangePasswordComponent } from './shared/base/change-password/change-password.component';
import { SmartLoginComponent } from './view/smart-login/smart-login.component';
import { RoleGuard } from './api-services/role-gaurd';
import { SmartLoginSignupComponent } from './view/smart-login-signup/smart-login-signup.component';
import { UserManagementComponent } from './view/site/admin/user-management/user-management.component';
import { RoleManagentComponent } from './view/site/admin/role-managent/role-managent.component';
import { DocumentsComponent } from './view/site/admin/documents/documents.component';
import { MeetingRoomComponent } from './view/site/admin/meeting-room/meeting-room.component';
import { ElectricalComplaintsAdminComponent } from './view/site/admin/electrical-complaints-admin/electrical-complaints-admin.component';
import { TelephoneComplaintAdminComponent } from './view/site/admin/telephone-complaint-admin/telephone-complaint-admin.component';
import { TypesManagementSystemComponent } from './view/site/admin/types-management-system/types-management-system.component';
import { SiteSettingsComponent } from './view/site/admin/site-settings/site-settings.component';
import { SiteLogComponent } from './view/site/admin/site-log/site-log.component';
import { SiteCircularComponent } from './view/site/admin/site-circular/site-circular.component';
import { DashboardComponent } from './view/site/dashboard/dashboard.component';
import { SmartNewDashCardComponent } from './shared/core/components/smart-new-dash-card/smart-new-dash-card.component';
import { UserProfileComponent } from './view/site/admin/user-profile/user-profile.component';
import { SiteActivitiesComponent } from './view/site/admin/site-activities/site-activities.component';
import { AllDocumentComponent } from './view/site/admin/all-document/all-document.component';
import { OrgComponent } from './view/site/org/org.component';
import { StatusbarComponent } from './view/site/admin/statusbar/statusbar.component';
import { NetworkComplaintsComponent } from './view/site/admin/network-complaints/network-complaints.component';
import { SubViewComponent } from './view/site/sub-view/sub-view.component';
import { MinutesOfMeetingComponent } from './view/site/admin/minutes-of-meeting/minutes-of-meeting.component';
import { MeetTypesComponent } from './view/site/admin/meet-types/meet-types.component';
import { SmartCardComponent } from './view/site/smart-card/smart-card.component';
import { NewLoginComponent } from './view/site/new-login/new-login.component';
import { MechanicalComplaintsComponent } from './view/site/admin/mechanical-complaints/mechanical-complaints.component';
import { LandingScreenComponent } from './view/site/landing-screen/landing-screen.component';
import { SmartLandingComponent } from './view/site/smart-landing/smart-landing.component';
import { LoginPageComponent } from './view/site/login-page/login-page.component';
import { DocTypeComponent } from './view/site/doc-type/doc-type.component';
import { ComplaintTypeComponent } from './view/site/complaint-type/complaint-type.component';
import { CustomComplaintsComponent } from './view/site/custom-complaints/custom-complaints.component';
import { RequisitionTypesComponent } from './view/site/admin/requisition-types/requisition-types.component';
import { CustomRequisitionComponent } from './view/site/admin/custom-requisition/custom-requisition.component';
import { WorkshopComponent } from './view/site/admin/workshop/workshop.component';
import { ShoutdownComponent } from './view/site/admin/shoutdown/shoutdown.component';
import { ElectricalShutdownComponent } from './view/site/admin/electrical-shutdown/electrical-shutdown.component';
import { HistoryAboutRclComponent } from './view/site/admin/history-about-rcl/history-about-rcl.component';
import { GallerySectionComponent } from './view/site/admin/gallery-section/gallery-section.component';
import { LicenseDocumentsComponent } from './view/site/admin/license-documents/license-documents.component';
import { AwardsComponent } from './view/site/admin/awards/awards.component';
import { BackupComponent } from './view/site/backup/backup.component';
import { HomeFormsComponent } from './view/site/admin/home-forms/home-forms.component';

const routes: Routes = [
  // {
  //   path: 'login',
  //   component: SmartLoginSignupComponent,
  // },
  {
    path: 'login',
    component: NewLoginComponent,
  },
  // {
  //   path: 'history-about-rcl',
  //   component: HistoryAboutRclComponent,
  // },
  // {
  //   path: 'gallery-section',
  //   component: GallerySectionComponent,
  // },
  // {
  //   path: 'license-documents',
  //   component: LicenseDocumentsComponent,
  // },
  // {
  //   path: 'awards',
  //   component: AwardsComponent,
  // },
  {
    path: '',
    component: LandingScreenComponent,
  },
  {
    path: 'login-page',
    component: LoginPageComponent,
  },
  // {
  //   path: 'landing-screen',
  //   component: SmartLandingComponent,
  // },
  {
    path: '',
    component: ViewComponent,
    children: [
      // complaints
      {
        path: 'electrical-complaint-emp',
        component: ElectricalComplaintsAdminComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: ['USER', 'ADMIN'], mode: 'emp' },
      },
      {
        path: 'electrical-complaint-app',
        component: ElectricalComplaintsAdminComponent,
        // canActivate: [RoleGuard],
        data: { expectedRole: ['USER', 'ADMIN'], mode: 'app' },
      },
      {
        path: 'electrical-complaint-admin',
        component: ElectricalComplaintsAdminComponent,
        // canActivate: [RoleGuard],
        data: { expectedRole: ['USER', 'ADMIN'], mode: 'admin' },
      },

      {
        path: 'telephone-complaint-emp',
        component: TelephoneComplaintAdminComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: ['USER', 'ADMIN'], mode: 'emp' },
      },
      {
        path: 'telephone-complaint-app',
        component: TelephoneComplaintAdminComponent,
        // canActivate: [RoleGuard],
        data: { expectedRole: ['USER', 'ADMIN'], mode: 'app' },
      },
      {
        path: 'telephone-complaint-admin',
        component: TelephoneComplaintAdminComponent,
        // canActivate: [RoleGuard],
        data: { expectedRole: ['USER', 'ADMIN'], mode: 'admin' },
      },

      {
        path: 'network-complaint-emp',
        component: NetworkComplaintsComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: ['USER', 'ADMIN'], mode: 'emp' },
      },
      {
        path: 'network-complaint-app',
        component: NetworkComplaintsComponent,
        // canActivate: [RoleGuard],
        data: { expectedRole: ['USER', 'ADMIN'], mode: 'app' },
      },
      {
        path: 'network-complaint-admin',
        component: NetworkComplaintsComponent,
        // canActivate: [RoleGuard],
        data: { expectedRole: ['USER', 'ADMIN'], mode: 'admin' },
      },
      {
        path: 'mechanical-complaint-emp',
        component: MechanicalComplaintsComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: ['USER', 'ADMIN'], mode: 'emp' },
      },
      {
        path: 'mechanical-complaint-app',
        component: MechanicalComplaintsComponent,
        // canActivate: [RoleGuard],
        data: { expectedRole: ['USER', 'ADMIN'], mode: 'app' },
      },
      {
        path: 'mechanical-complaint-admin',
        component: MechanicalComplaintsComponent,
        // canActivate: [RoleGuard],
        data: { expectedRole: ['USER', 'ADMIN'], mode: 'admin' },
      },
      {
        path: 'workshop-requisition-emp',
        component: WorkshopComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: ['USER', 'ADMIN'], mode: 'emp' },
      },
      {
        path: 'workshop-requisition-app',
        component: WorkshopComponent,
        // canActivate: [RoleGuard],
        data: { expectedRole: ['USER', 'ADMIN'], mode: 'app' },
      },
      {
        path: 'workshop-requisition-admin',
        component: WorkshopComponent,
        // canActivate: [RoleGuard],
        data: { expectedRole: ['USER', 'ADMIN'], mode: 'admin' },
      },
      {
        path: 'shutdown-requisition-emp',
        component: ShoutdownComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: ['USER', 'ADMIN'], mode: 'emp' },
      },
      {
        path: 'shutdown-requisition-emp-app',
        component: ShoutdownComponent,
        // canActivate: [RoleGuard],
        data: { expectedRole: ['USER', 'ADMIN'], mode: 'app' },
      },
      {
        path: 'shutdown-requisition-admin',
        component: ShoutdownComponent,
        // canActivate: [RoleGuard],
        data: { expectedRole: ['USER', 'ADMIN'], mode: 'admin' },
      },
      {
        path: 'electrical_shutdown-requisition-emp',
        component:ElectricalShutdownComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: ['USER', 'ADMIN'], mode: 'emp' },
      },
      {
        path: 'electrical_shutdown-requisition-emp-app',
        component: ElectricalShutdownComponent,
        // canActivate: [RoleGuard],
        data: { expectedRole: ['USER', 'ADMIN'], mode: 'app' },
      },
      {
        path: 'electrical_shutdown-requisition-admin',
        component: ElectricalShutdownComponent,
        // canActivate: [RoleGuard],
        data: { expectedRole: ['USER', 'ADMIN'], mode: 'admin' },
      },

      {
        path: 'history-about-rcl',
        component: HistoryAboutRclComponent,
        data: { expectedRole: [ 'ADMIN'], mode: 'admin' },
      },
      {
        path: 'gallery-section',
        component: GallerySectionComponent,
        data: { expectedRole: [ 'ADMIN'], mode: 'admin' },
      },
      {
        path: 'backup',
        component: BackupComponent,
        data: { expectedRole: [ 'ADMIN'], mode: 'admin' },
      },
      {
        path: 'license-documents',
        component: LicenseDocumentsComponent,
        data: { expectedRole: [ 'ADMIN'], mode: 'admin' },
      },
      {
        path: 'home-forms',
        component: HomeFormsComponent,
        data: { expectedRole: [ 'ADMIN'], mode: 'admin' },
      },
      {
        path: 'awards',
        component: AwardsComponent,
        data: { expectedRole: [ 'ADMIN'], mode: 'admin' },
      },

      /**  */
      {
        path: 'document-management-user',
        component: DocumentsComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: ['USER', 'ADMIN'], mode: 'emp' },
      },
      {
        path: 'document-management-app',
        component: DocumentsComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: ['USER', 'ADMIN'], mode: 'app' },
      },
      {
        path: 'document-management-admin',
        component: DocumentsComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: ['USER', 'ADMIN'], mode: 'admin' },
      },
      /***  */
      {
        path: 'custom-complaints-emp/:type',
        component: CustomComplaintsComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: ['ADMIN', 'USER'],mode:'emp' },
      },
      {
        path: 'custom-complaints-admin/:type',
        component: CustomComplaintsComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: ['ADMIN', 'USER'],mode: 'admin' },
      },
      {
        path: 'custom-requisition-emp/:type',
        component: CustomRequisitionComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: ['ADMIN', 'USER'],mode:'emp' },
      },
      {
        path: 'custom-requisition-admin/:type',
        component: CustomRequisitionComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: ['ADMIN', 'USER'],mode: 'admin' },
      },



      /*** minutes of meeting */
      {
        path: 'meeting-minutes/:mom',
        component: MinutesOfMeetingComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: ['ADMIN', 'USER'] },
      },
      {
        path: 'meeting-rooms',
        component: MeetingRoomComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: ['USER', 'ADMIN'], mode: 'admin' },
      },
      /***  org admin and user  */
      {
        path: 'org',
        component: OrgComponent,
        canActivate: [RoleGuard],
        data: { mode: 'admin', expectedRole: ['ADMIN'] },
      },
      {
        path: 'org-user',
        component: OrgComponent,
        canActivate: [RoleGuard],
        data: { mode: 'user', expectedRole: ['USER', 'ADMIN'] },
      },

      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [RoleGuard],
        data: {
          expectedRole: [
            'ADMIN',
            'SD_ELE_ADMIN',
            'SD_TP_ADMIN',
            'SD_NW_ADMIN',
            'SD_MECH_ADMIN',
            'SD_DOC_ADMIN',
          ],
        },
      },
      {
        path: 'all-document',
        component: AllDocumentComponent,
      },
      {
        path: 'user-management',
        component: UserManagementComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: ['ADMIN'] },
      },
      {
        path: 'role-management',
        component: RoleManagentComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: ['ADMIN'] },
      },
      {
        path: 'documents',
        component: DocumentsComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: ['ADMIN'], mode: 'admin' },
      },

      {
        path: 'meet-types',
        component: MeetTypesComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: ['ADMIN'], mode: 'admin' },
      },
      {
        path: 'document-type',
        component: DocTypeComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: ['ADMIN'], mode: 'admin' },
      },
      {
        path: 'requisition-type',
        component: RequisitionTypesComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: ['ADMIN'], mode: 'admin' },
      },
      {
        path: 'complaint-type',
        component: ComplaintTypeComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: ['ADMIN'], mode: 'admin' },
      },
      {
        path: 'site-circular',
        component: SiteCircularComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: ['ADMIN'] },
      },

      {
        path: 'types-management',
        component: TypesManagementSystemComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: ['ADMIN'] },
      },
      {
        path: 'site-settings',
        component: SiteSettingsComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: ['ADMIN'] },
      },
      {
        path: 'statusbar',
        component: StatusbarComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: ['ADMIN'] },
      },

      {
        path: 'site-log',
        component: SiteLogComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: ['ADMIN'] },
      },
      {
        path: 'dash-card',
        component: SmartNewDashCardComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: ['ADMIN'] },
      },
      {
        path: 'site-activities',
        component: SiteActivitiesComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: ['ADMIN'] },
      },
      {
        path: 'user-profile',
        component: UserProfileComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: ['ADMIN', 'USER'] },
      },
      {
        path: 'meeting-room-booking',
        component: MeetingRoomComponent,
        canActivate: [RoleGuard],
        data: { mode: 'user', expectedRole: ['USER'] },
      },
      {
        path: 'smart-card',
        component: SmartCardComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: ['ADMIN', 'USER'] },
      },

      {
        path: 'statusbar',
        component: OrgComponent,
        canActivate: [RoleGuard],
        data: { mode: 'user', expectedRole: ['USER'] },
      },
      {
        path: 'sub-view',
        component: SubViewComponent,
      },
    ],
  },

  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'smart-card',
    component: SmartCardComponent,
  },
  {
    path: 'forget-password',
    component: ForgetPasswordComponent,
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
  },
  {
    path: '**',
    component: NotfoundComponent,
  },
  {
    path: 'notfound',
    component: NotfoundComponent,
  },
  {
    path: 'sub-view',
    component: SubViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
