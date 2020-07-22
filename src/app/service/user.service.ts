import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  base64: string = '';
  email: string = '';
  facilityName: string;
  facilityId: number;
  
  constructor() {
   
  }
}