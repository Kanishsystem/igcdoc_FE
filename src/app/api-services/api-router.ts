/**
 * API ROUTING
 * @author parthiban
 * @param
 * Module name : object
 * url : string
 * method : string
 *
 */

import { environment } from 'src/environments/environment';

export const API_ROUTER = {
  // login routes
  LOG_IN: 'auth/login',
  LOG_OUT: 'auth/logout',
  AUTH_REGISTER: 'auth/register',
  AUTH_OTP: 'auth/sendOtp',
  AUTH_PASS_RESET: 'auth/resetPasswordOtp',
  AUTH_USER_FIRST_PASS_RESET: 'auth/user_reset',
  AUTH_LOG: 'auth/get_log',
  AUTH_SITE_SETTINGS: 'auth/get_settings',
  // user master
  USER_INSERT: 'user/insert',
  USER_GET_ALL: 'user/get_all',
  USER_UPDATE: 'user/update',
  USER_GET_ONE: 'user/get_one',
  USER_DELETE_ONE: 'user/delete_one',
  USER_ADMIN_RESET: 'user/admin_reset',
  USER_GET_ALL_SELECT: 'user/get_all_select',
  USER_RESET_PASS: 'user/user_reset',
  USER_RESET_PROFILE: 'user/update_profile_details',
  USER_PROFILE: 'user/get_one_user',
  RECENTUSERS: 'user/get_logged_users',
  USER_GET_ONE_IMAGE: 'user/get_one_image',
  USER_UPDATE_PROFILE: 'user/update_profile_img',
  USER_GET_ALL_ORG: 'user/get_by_org_id',

  //DocumentController
  SITE_DOCUMENT_GET_ALL_ADMIN: 'document/get_all/admin',
  SITE_DOCUMENT_GET_ALL_USER: 'document/get_all/user',
  SITE_DOCUMENT_GET_ALL_APP: 'document/get_all/app',
  SITE_DOCUMENT_ONE: 'document/get_one',
  SITE_DOCUMENT_INSERT: 'document/insert',
  SITE_DOCUMENT_UPDATE: 'document/update',
  SITE_DOCUMENT_DELETE_ONE: 'document/delete_one',
  SITE_DOCUMENT_GET_DOC: 'document/get_doc',
  SITE_DOCUMENT_GET_ALL_DOC: 'document/get_doc_type',
  SITE_DOCUMENT_GET_ALL_CAT: 'document/get_doc_category',
  SITE_DOCUMENT_UPDATE_APP: 'document/update_app',
  //TelephoneController
  SITE_TELEPHONE_GET_ALL: 'telephone/get_all/admin',
  SITE_TELEPHONE_GET_ALL_USER: 'telephone/get_all/user',
  SITE_TELEPHONE_GET_ALL_APP: 'telephone/get_all/app',
  SITE_TELEPHONE_ONE: 'telephone/get_one',
  SITE_TELEPHONE_INSERT: 'telephone/insert',
  SITE_TELEPHONE_UPDATE: 'telephone/update',
  SITE_TELEPHONE_DELETE_ONE: 'telephone/delete_one',
  SITE_TELEPHONE_UPDATE_APP: 'telephone/update_app',

  //ElectricalController
  SITE_ELECTRICAL_GET_ALL: 'electrical/get_all/admin',
  SITE_ELECTRICAL_GET_ALL_USER: 'electrical/get_all/user',
  SITE_ELECTRICAL_GET_ALL_APP: 'electrical/get_all/app',
  SITE_ELECTRICAL_ONE: 'electrical/get_one',
  SITE_ELECTRICAL_INSERT: 'electrical/insert',
  SITE_ELECTRICAL_UPDATE: 'electrical/update',
  SITE_ELECTRICAL_DELETE_ONE: 'electrical/delete_one',
  SITE_ELECTRICAL_UPDATE_APP: 'electrical/update_app',

  //NetworkController
  SITE_NETWORK_GET_ALL: 'network/get_all/admin',
  SITE_NETWORK_GET_ALL_USER: 'network/get_all/user',
  SITE_NETWORK_GET_ALL_APP: 'network/get_all/app',
  SITE_NETWORK_ONE: 'network/get_one',
  SITE_NETWORK_INSERT: 'network/insert',
  SITE_NETWORK_UPDATE: 'network/update',
  SITE_NETWORK_DELETE_ONE: 'network/delete_one',
  SITE_NETWORK_APP: 'network/update_app',

  //MECHANICAL Controller
  SITE_MECHANICAL_GET_ALL: 'mechanical/get_all/admin',
  SITE_MECHANICAL_GET_ALL_USER: 'mechanical/get_all/user',
  SITE_MECHANICAL_GET_ALL_APP: 'mechanical/get_all/app',
  SITE_MECHANICAL_ONE: 'mechanical/get_one',
  SITE_MECHANICAL_INSERT: 'mechanical/insert',
  SITE_MECHANICAL_UPDATE: 'mechanical/update',
  SITE_MECHANICAL_DELETE_ONE: 'mechanical/delete_one',
  SITE_MECHANICAL_APP: 'mechanical/update_app',

  //WorkshopController
  SITE_WORKSHOP_GET_ALL: 'workshop/get_all/admin',
  SITE_WORKSHOP_GET_ALL_USER: 'workshop/get_all/user',
  SITE_WORKSHOP_GET_ALL_APP: 'workshop/get_all/app',
  SITE_WORKSHOP_ONE: 'workshop/get_one',
  SITE_WORKSHOP_INSERT: 'workshop/insert',
  SITE_WORKSHOP_UPDATE: 'workshop/update',
  SITE_WORKSHOP_DELETE_ONE: 'workshop/delete_one',
  SITE_WORKSHOP_UPDATE_APP: 'workshop/update_app',
  SITE_WORKSHOP_GET_PDF: 'workshop/get_one_pdf',

  //ShutdownController
  SITE_SHUTDOWN_GET_ALL: 'shutdown/get_all/admin',
  SITE_SHUTDOWN_GET_ALL_USER: 'shutdown/get_all/user',
  SITE_SHUTDOWN_GET_ALL_APP: 'shutdown/get_all/app',
  SITE_SHUTDOWN_ONE: 'shutdown/get_one',
  SITE_SHUTDOWN_INSERT: 'shutdown/insert',
  SITE_SHUTDOWN_UPDATE: 'shutdown/update',
  SITE_SHUTDOWN_DELETE_ONE: 'shutdown/delete_one',
  SITE_SHUTDOWN_UPDATE_APP: 'shutdown/update_app',
  SITE_SHUTDOWN_GET_PDF: 'shutdown/get_one_pdf',


  //ACV ShutdownController
  SITE_ACV_SHUTDOWN_GET_ALL: 'acv_shutdown/get_all/admin',
  SITE_ACV_SHUTDOWN_GET_ALL_USER: 'acv_shutdown/get_all/user',
  SITE_ACV_SHUTDOWN_GET_ALL_APP: 'acv_shutdown/get_all/app',
  SITE_ACV_SHUTDOWN_ONE: 'acv_shutdown/get_one',
  SITE_ACV_SHUTDOWN_INSERT: 'acv_shutdown/insert',
  SITE_ACV_SHUTDOWN_UPDATE: 'acv_shutdown/update',
  SITE_ACV_SHUTDOWN_DELETE_ONE: 'acv_shutdown/delete_one',
  SITE_ACV_SHUTDOWN_UPDATE_APP: 'acv_shutdown/update_app',
  SITE_ACV_SHUTDOWN_GET_PDF: 'acv_shutdown/get_one_pdf',

  //ELECTRICAL ShutdownController
  SITE_ELECTRICAL_SHUTDOWN_GET_ALL: 'elec_shutdown/get_all/admin',
  SITE_ELECTRICAL_SHUTDOWN_GET_ALL_USER: 'elec_shutdown/get_all/user',
  SITE_ELECTRICAL_SHUTDOWN_GET_ALL_APP: 'elec_shutdown/get_all/app',
  SITE_ELECTRICAL_SHUTDOWN_ONE: 'elec_shutdown/get_one',
  SITE_ELECTRICAL_SHUTDOWN_INSERT: 'elec_shutdown/insert',
  SITE_ELECTRICAL_SHUTDOWN_UPDATE: 'elec_shutdown/update',
  SITE_ELECTRICAL_SHUTDOWN_DELETE_ONE: 'elec_shutdown/delete_one',
  SITE_ELECTRICAL_SHUTDOWN_UPDATE_APP: 'elec_shutdown/update_app',
  SITE_ELECTRICAL_SHUTDOWN_GET_PDF: 'elec_shutdown/get_one_pdf',

  //ROOMS
  SITE_MEETROOM_GET_ALL: 'meetroom/get_all',
  SITE_MEETROOM_GET_ALL_USER: 'meetroom/get_all/user',
  SITE_MEETROOM_ONE: 'meetroom/get_one',
  SITE_MEETROOM_INSERT: 'meetroom/insert',
  SITE_MEETROOM_UPDATE: 'meetroom/update',
  SITE_MEETROOM_CANCEL_ONE: 'meetroom/cancel_meet',
  SITE_MEETROOM_DELETE_ONE: 'meetroom/delete_one',
  SITE_MEETTOOM_CALANDER: 'meetroom/get_all_calender',

  // meet types
  SITE_MOM_GET_ALL: 'meetroom/get_by_mom_type',
  SITE_MOM_INSERT: 'meetroom/insert_mom',
  SITE_MOM_UPDATE: 'meetroom/update_mom',
  SITE_MOM_GET_ONE: 'meetroom/get_one_mom',
  SITE_MOM_DELETE_ONE: 'meetroom/delete_one_mom',
  SITE_MOM_GET_PDF: 'meetroom/get_one_pdf',

  // meet type
  SITE_MOMTYPE_GET_ALL: 'meetroom/get_all_mom_types',
  SITE_MOMTYPE_INSERT: 'meetroom/insert_mom_types',
  SITE_MOMTYPE_UPDATE: 'meetroom/update_mom_types',
  SITE_MOMTYPE_GET_ONE: 'meetroom/get_one_mom_types',
  SITE_MOMTYPE_DELETE_ONE: 'meetroom/delete_one_mom_types',
  SITE_MOMTYPE_GET_ALL_SELECT: 'meetroom/get_all_select_mom_types',
  SITE_MOMTYPE_GET_PDF: 'meetroom/get_mom_type',
  SITE_MOMTYPE_GET_TYPE_PDF: 'meetroom/get_mom_type_pdf',

  //TYPE

  SITE_TYPE_GET_ALL: 'type/get_all',
  SITE_TYPE_ONE: 'type/get_one',
  SITE_TYPE_INSERT: 'type/insert',
  SITE_TYPE_UPDATE: 'type/update',
  SITE_TYPE_DELETE_ONE: 'type/delete_one',
  SITE_TYPE_GET_ALL_SELECT: 'type/get_all_select/',
  SITE_TYPE_GET_ALL_DOC_TYPES: 'type/get_all_select/DocumentTypes',
  SITE_TYPE_GET_ALL_TYPES: 'type/get_all_select_types',

  //UseroleController

  SITE_USERROLE_GET_ALL: 'userrole/get_all',
  SITE_USERROLE_ONE: 'userrole/get_one',
  SITE_USERROLE_INSERT: 'userrole/insert',
  SITE_USERROLE_UPDATE: 'userrole/update',
  SITE_USERROLE_DELETE_ONE: 'userrole/delete_one',

  //User OTP

  SITE_USEROTP_GET_ALL: 'userotp/get_all',
  SITE_USEROTP_ONE: 'userotp/get_one/',
  SITE_USEROTP_INSERT: 'userotp/insert',
  SITE_USEROTP_UPDATE: 'userotp/update/',
  SITE_USEROTP_DELETE_ONE: 'userotp/delete_one/',

  //Role
  SITE_ROLE_GET_ALL: 'role/get_all',
  SITE_ROLE_ONE: 'role/get_one',
  SITE_ROLE_INSERT: 'role/insert',
  SITE_ROLE_UPDATE: 'role/update',
  SITE_ROLE_DELETE_ONE: 'role/delete_one',
  SITE_ROLE_GET_ALL_SELECT: 'role/get_all_select',

  // custom complaints 
  //SITE_COMPLAINT_GET_ALL :""
  SITE_COMPLAINT_GET_ALL: 'complaint/get_all/admin',
  SITE_COMPLAINT_GET_ALL_USER: 'complaint/get_all/user',
  SITE_COMPLAINT_ONE: 'complaint/get_one',
  SITE_COMPLAINT_INSERT: 'complaint/insert',
  SITE_COMPLAINT_UPDATE: 'complaint/update',
  SITE_COMPLAINT_DELETE_ONE: 'complaint/delete_one',
  SITE_COMPLAINT_APP: 'complaint/update_app',

  //Complaint Types
  SITE_COMPLAINT_TYPE_GET_ALL: "complaintTypes/get_all_comp_types",
  SITE_COMPLAINT_TYPE_INSERT: "complaintTypes/insert_comp_types",
  SITE_COMPLAINT_TYPE_UPDATE: "complaintTypes/update_comp_types",
  SITE_COMPLAINT_TYPE_GET_ONE: "complaintTypes/get_one_comp_types",
  SITE_COMPLAINT_TYPE_DELETE_ONE: "complaintTypes/delete_one_comp_types",


  //TYPE

  //Site circular
  SITE_GET_ALL: 'site/get_all',
  SITE_ONE: 'site/get_one',
  SITE_INSERT: 'site/insert',
  SITE_INSERT_ORG: 'site/insert_org',
  SITE_UPDATE: 'site/update',
  SITE_DELETE_ONE: 'site/delete_one',
  SITE_GET_ALL_SELECT: 'site/get_all_select',
  SITE_GET_ORG_ONE_PDF: 'site/get_org_one_pdf',
  SITE_GET_ORG_TWO_PDF: 'site/get_org_two_pdf',

  //forms circular
  FORMS_GET_ALL: 'form/get_all',
  FORMS_ONE: 'form/get_one',
  FORMS_INSERT: 'form/insert',
  FORMS_UPDATE: 'form/update',
  FORMS_DELETE_ONE: 'form/delete_one',
  FORMS_PDF: 'form/get_pdf',

  // dashboard counts
  DASH_GET_COUNT: 'dashboard/getcount',
  SITE_TRANSACTION_CHART: 'dashboard/getcountbyyear',
  SITE_DASH_SHUTDOWN: "dashboard/getshtdown",

  //Dashboard chart

  //ActivityController

  ACTIVITY_INSERT: 'activity/insert',
  ACTIVITY_UPDATE: 'activity/update',
  ACTIVITY_GET_ALL: 'activity/get_all',
  ACTIVITY_GET_ONE: 'activity/get_one',
  ACTIVITY_DELETE_ONE: 'activity/delete_one',
  ACTIVITY_GET_ONE_IMAGE: 'activity/get_one_image',

  // home images
  HOME_IMAGES_INSERT: 'homeimages/insert',
  HOME_IMAGES_UPDATE: 'homeimages/update',
  HOME_IMAGES_GET_ALL: 'homeimages/get_all',
  HOME_IMAGES_GET_ONE: 'homeimages/get_one',
  HOME_IMAGES_DELETE_ONE: 'homeimages/delete_one',
  HOME_IMAGES_GET_ONE_IMAGE: 'homeimages/get_one_image',


  // ORG
  ORG_INSERT: 'org/insert',
  ORG_UPDATE: 'org/update',
  ORG_GET_ALL: 'org/get_all_tree',
  ORG_GET_ONE: 'org/get_one',
  ORG_DELETE_ONE: 'org/delete_one',
  ORG_GET_ALL_USER: 'org/get_all_user',
  ORG_GET_ALL_TYPE: 'type/get_all_select/orgTypes',
  ORG_GET_ALL_PARENT: 'org/get_all_parent',
  ORG_GET_APPROVERS: 'org/get_approving_authority',

  //DOCUMENT TYPE

  DOC_INSERT: 'docType/insert',
  DOC_UPDATE: 'docType/update',
  DOC_GET_ALL: 'docType/get_all',
  DOC_GET_ONE: 'docType/get_one',
  DOC_DELETE_ONE: 'docType/delete_one',
  DOC_GET_ALL_SELECT: 'docType/get_all_select',

  //License Document Type

  SITE_LICENSE_DOCUMENT_GET_ALL: 'license/get_all',
  SITE_LICENSE_DOCUMENT_ONE: 'license/get_one',
  SITE_LICENSE_DOCUMENT_INSERT: 'license/insert',
  SITE_LICENSE_DOCUMENT_DELETE_ONE: 'license/delete_one',
  SITE_LICENSE_DOCUMENT_GET_DOCUMENT: 'license/get_doc',

   //Home Forms
  SITE_HOME_FORM_DOCUMENT_GET_ALL: 'homeforms/get_all',
  SITE_HOME_FORM_DOCUMENT_ONE: 'homeforms/get_one',
  SITE_HOME_FORM_DOCUMENT_INSERT: 'homeforms/insert',
  SITE_HOME_FORM_DOCUMENT_DELETE_ONE: 'homeforms/delete_one',
  SITE_HOME_FORM_DOCUMENT_GET_DOCUMENT: 'homeforms/get_doc',

  //AWARDS Type

  SITE_AWARDS_GET_ALL: 'awards/get_all',
  SITE_AWARDS_ONE: 'awards/get_one',
  SITE_AWARDS_INSERT: 'awards/insert',
  SITE_AWARDS_DELETE_ONE: 'awards/delete_one',
  SITE_AWARDS_GET_IMAGE: 'awards/get_one_image',

  //GALLERY Type

  SITE_GALLERY_GET_ALL: 'gallery/get_all',
  SITE_GALLERY_ONE: 'gallery/get_one',
  SITE_GALLERY_INSERT: 'gallery/insert',
  SITE_GALLERY_DELETE_ONE: 'gallery/delete_one',
  SITE_GALLERY_GET_ALL_EVENT: 'gallery/get_all_by_event',
  SITE_GALLERY_GET_IMAGE: 'gallery/get_one_image',

  //History Type

  SITE_HISTORY_GET_ALL: 'history/get_all',
  SITE_HISTORY_ONE: 'history/get_one',
  SITE_HISTORY_INSERT: 'history/insert',
  SITE_HISTORY_DELETE_ONE: 'history/delete_one',
  SITE_HISTORY_GET_IMAGE: 'history/get_one_image',


  //MEET_PROPOSAL TYPE

  SITE_MEET_PROPOSAL_INSERT: 'meet_proposal/insert',
  SITE_MEET_PROPOSAL_UPDATE: 'meet_proposal/update',
  SITE_MEET_PROPOSAL_GET_ALL: 'meet_proposal/get_all/admin',
  SITE_MEET_PROPOSAL_GET_ALL_USER: 'meet_proposal/get_all/user',
  SITE_MEET_PROPOSAL_GET_ONE: 'meet_proposal/get_one',
  SITE_MEET_PROPOSAL_DELETE_ONE: 'meet_proposal/delete_one',
  SITE_MEET_PROPOSAL_GET_ONE_DOC: 'meet_proposal/get_doc',




};

export const get_api_route = (route_index: string) => {
  return API_ROUTER[route_index] !== undefined
    ? API_ROUTER[route_index]
    : route_index;
};

export const get_api_full_route = (route_index: string) => {
  let url = API_ROUTER[route_index] !== undefined
    ? API_ROUTER[route_index]
    : route_index;
  return environment.BASE_API_URL[0] + url
}

export const SPINNER_BLOCK_API = [
  // environment.BASE_API_URL[0] + 'users'
];
