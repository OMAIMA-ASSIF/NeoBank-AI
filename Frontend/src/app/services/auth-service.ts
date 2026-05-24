import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated : boolean = false;
  roles : any;
  username : any;
  accessToken! : string;

  constructor(private http:HttpClient, private router : Router) { }

  public login(username : string, password : string){
    let options = {
      headers : new HttpHeaders().set("Content-Type","application/x-www-form-urlencoded")
    }
    let params=new HttpParams()
      .set("username",username).set("password",password);
    return this.http.post(environment.backendHost+"/auth/login", params, options)
  }

  loadProfile(data : any){
    this.isAuthenticated = true;
    this.accessToken = data['token'];
    let decodedJwt:any = jwtDecode(this.accessToken);
    this.roles = decodedJwt.scope;
    this.username = decodedJwt.sub;
    window.localStorage.setItem("jwt-token", this.accessToken);
  }

  public logout(){
    this.isAuthenticated = false;
    this.roles = undefined;
    this.username = undefined;
    this.accessToken = "";
    window.localStorage.removeItem("jwt-token");
    this.router.navigateByUrl("/login");
  }

  LoadJwtTokenFromLocalStorage(){
    let token = window.localStorage.getItem("jwt-token");
    if (token){
      this.loadProfile({"token": token});
      this.router.navigateByUrl("admin/customers");
    }
  }
}
