import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  secretKey = environment.ENCRYPT_KEY
  constructor() { }

  encrypt(value : any) :  any {
    try {
         return CryptoJS.AES.encrypt(JSON.stringify(value), this.secretKey.trim()).toString();
    } catch (e) {
      console.log(e);
    }
  }

  decrypt(textToDecrypt : string) :  any {
    try {
      return CryptoJS.AES.decrypt(textToDecrypt, this.secretKey.trim()).toString(CryptoJS.enc.Utf8);
    } catch (e) {
      console.log(e);
    }
  }
}
