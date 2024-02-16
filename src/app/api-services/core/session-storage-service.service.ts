import { Injectable } from '@angular/core';
import { SecurityService } from '../common/security.service';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageServiceService {

  constructor(
    private security:SecurityService
  ) { }

  private USERNAME_KEY="sd_igcdoc_usernames";

  saveUserNames(user_data) {    
   // let user_data = {username:username,name:name};
    let user_secure_data = this.security.encrypt(user_data);
    localStorage.setItem(this.USERNAME_KEY, user_secure_data);
  }

  getUserNames(): any {
    let get_user = localStorage.getItem(this.USERNAME_KEY);
    if(get_user){
      let user_data = this.security.decrypt(get_user);
      return JSON.parse(user_data);
    }
    return null;   
  }

  clearUserNames() {
    localStorage.removeItem(this.USERNAME_KEY);
  }

  setItem(key: string, value: string): void {
    sessionStorage.setItem(key, value);
  }

  getItem(key: string): string | null {
    return sessionStorage.getItem(key);
  }

  removeItem(key: string): void {
    sessionStorage.removeItem(key);
  }

  clear(): void {
    sessionStorage.clear();
  }

  setSettings(data:any){
    this.setItem("sd_site_settings", JSON.stringify(data));
  }
  /**
   * 
   * @param index 
   * @param default_value 
   * @returns 
   */
  getSettings(index:any,default_value:any){
    let settings = this.getItem("sd_site_settings");
   // console.log("settings ", settings, "index ", index,"..... ", settings[index]);
    if(settings){
      settings = JSON.parse(settings);
      return settings[index]!==undefined ? settings[index] : default_value;
    }
    return default_value;
  }

  setActivity(data:any){
    localStorage.setItem("sd_site_activity", JSON.stringify(data));
  }
  /**
   * 
   * @param index 
   * @param default_value 
   * @returns 
   */
  getActivity(){
    let settings = this.getItem("sd_site_activity");
    if(settings){
      return JSON.parse(settings);
    }
   // console.log("settings ", settings, "index ", index,"..... ", settings[index]);
   return settings;
  }
  
  setUser(data:any){
    this.setItem("udata", JSON.stringify(data));
  }
  getUser(){
    let data = this.getItem("udata");
    if(data!==null){
      return JSON.parse(data);
    }
  }
  
  getToken():string{
    let data = this.getUser();
  //  console.log("data " , data);
    let token = data!=null && data["accessToken"]!==undefined ? data["accessToken"] : "";
    //console.log("token " , token);
    return token;
  }
  getUserName(){
    let data = this.getUser();
    let ename = data!=null &&  data["ename"]!==undefined ? data["ename"] : "";
    return ename;
  }

  getUserId(){
    let data = this.getUser();   
    let ename = data!=null &&  data["id"]!==undefined ? data["id"] : "";
    return ename;
  }

  getRoleName(){
    let data = this.getUser();
    return data!=null &&  data["role"]!==undefined ? data["role"] : "";
  }

  checkRole(role:string){
    let get_role= this.getRoleName();
    return role==get_role ? true : false;
  }

  checkRoleExists(role:any){
    let get_role= this.getRoleName();
    let intersect = get_role.filter(value => role.includes(value));
    return intersect.length > 0 ? true : false;
  }

  getExpiryTime(){
    let data = this.getUser();
    let expiry_time = data!=null &&  data["expiresInTime"]!==undefined ? data["expiresInTime"] : 0;
    return expiry_time;
  }


}
