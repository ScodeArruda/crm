import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseAPI='http://localhost:3000/user';
  constructor(private http: HttpClient) { }

  /** Return os dados via Method GET  */
  getAll(){
    return this.http.get(this.baseAPI)
  };

  //Get All ROLE
  getAllRole(){
    return this.http.get('http://localhost:3000/role');
  }
  getById(id: any){
    return this.http.get(this.baseAPI +'/'+ id)
  };

  registerData(inputdata: any){
    return this.http.post(this.baseAPI, inputdata)
  };

  updateData(id: any, inputdata: any){
    return this.http.put(this.baseAPI +'/'+ id, inputdata)
  };

  //GET Usernamen
  isLoggedIn(){
    return sessionStorage.getItem('username')!= null;
  };

  //GET User Role
  getUserRole(){
    return sessionStorage.getItem('role') != null ? sessionStorage.getItem('role') ?.toString() : '';
  }

}
