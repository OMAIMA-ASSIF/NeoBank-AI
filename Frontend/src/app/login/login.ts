import { Component } from '@angular/core';
import { ɵInternalFormsSharedModule, ReactiveFormsModule } from "@angular/forms";
import { FormBuilder, FormGroup } from "@angular/forms";
import { OnInit } from "@angular/core";
import { AuthService } from '../services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  formLogin! : FormGroup;

  constructor(private fb : FormBuilder, private authService : AuthService, private router : Router) { }

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      username : this.fb.control(""),
      password : this.fb.control("")
    });
  }

  handleLogin() {
    let username = this.formLogin.value.username;
    let pwd = this.formLogin.value.password;
    this.authService.login(username, pwd).subscribe({
      next : data => {
        this.authService.loadProfile(data);
        this.router.navigateByUrl("/admin/customers");
      },
      error : err => {
        console.log(err);
      }
    })
  }

}
