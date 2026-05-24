import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated : boolean = false;
  roles : any;
  username : any;
  accessToken! : string ;

  constructor(private http:HttpClient) { }

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

  }

  public logout(){
    this.isAuthenticated = false;
    this.roles = undefined;
    this.username = undefined;
    this.accessToken = "";
  }
}
