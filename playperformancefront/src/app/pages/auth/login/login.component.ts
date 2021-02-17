import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authSvc:AuthService) { }

  ngOnInit(): void {
    const loginData = {
      email:"admin@admin.com.br",
      senha:"admin123"
    };
    this.authSvc.login(loginData).subscribe((res) => console.log('Login'));
  }

}
