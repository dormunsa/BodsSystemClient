import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HelperService } from '../../../services/helper.service';
import { AuthService } from '../../../services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpService } from '../../../services/http.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;
  loginFailed: boolean;
  loggedUser: any;
  constructor(private spinner: NgxSpinnerService, private authService: AuthService, private helperService: HelperService , private httpService: HttpService) { }

  ngOnInit() {
    // get user guid from url param or sessionStorage or localStorage
    const userGuid = this.httpService.checkForUserGuid('getParams');
    const sessionStorageUserGuid = this.httpService.checkForUserGuid('sessionStorage');
    const localStorageUserGuid = this.httpService.checkForUserGuid('localStorage');
    if (userGuid) {
      this.authService.loginByGuid(userGuid, true);
    } else if (sessionStorageUserGuid) {
      this.authService.loginByGuid(sessionStorageUserGuid, true);
    } else if (localStorageUserGuid) {
      this.authService.loginByGuid(localStorageUserGuid, false)
    }
     this.loginForm = new FormGroup({
       // initialize form and define form input settings
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }
  // login request
  login() {
    try {
      this.spinner.show();
      const user = this.loginForm.value;
      this.authService.login(user);
      this.spinner.hide();
    } catch (e) {
      this.helperService.handleError('Login Failed , Please try again', this.spinner);
    }
  }

}
