import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpService } from './http.service';
import { HelperService } from './helper.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedUserData: any;
  loggedUserData$ = new BehaviorSubject<any>(this.loggedUserData);
  currentUserGuid: string;
  userLoggedIn: boolean = false;
  constructor(private httpService: HttpService, private helperService: HelperService) { }
  // make login request
  login(user) {
    this.httpService.login('Login', user).subscribe(res => {
      debugger
      this.loggedUserData = res;
      if (this.loggedUserData) {
        this.initUserData(this.loggedUserData, null, true);
      }
    }, error => {
      this.helperService.handleError(`Login Failed ,${error.error.errorMessage}`);
    });
  }
  // make login request by guid
  async loginByGuid(guid, ckLogin) {
    try {
      if (ckLogin) {
        const loggedUser = await this.loginWithUserGuid(guid).toPromise();
        this.initUserData(loggedUser, true);
      } else {
        const loggedUser = await this.loginWithUserGuid(guid).toPromise();
        this.initUserData(loggedUser, false);
      }
    } catch (e) {
      this.loginFalied(e);
    }
  }

  loginWithUserGuid(UserGuid) {
    debugger;
    this.currentUserGuid = UserGuid;
    this.httpService.setHeaders(UserGuid);
    return this.httpService.get('Login');
  }
  // log out - remove guid from storage
  logout() {
    this.loggedUserData = null;
    this.loggedUserData$.next(this.loggedUserData);
    localStorage.removeItem('UserGuid');
    sessionStorage.removeItem('UserGuid');
    this.helperService.navigateTo('login');
  }

  // remove guid and navigate to login if login failed
  loginFalied(e) {
    localStorage.removeItem('UserGuid');
    sessionStorage.removeItem('UserGuid');
    this.helperService.navigateTo('login');
    this.helperService.handleError(`Please try again , ${e.error.errorMessage}`);
  }

  // save user data after login.
  initUserData(userData, ckLogin?: boolean,  fromLoginPage = false) {
    debugger;
    this.loggedUserData = userData;
    if (this.loggedUserData.isSetPasswordAllowed) {
      this.checkUserResetPassword(this.loggedUserData);
      return;
    }
    this.httpService.userGuid = this.loggedUserData.userGuid;
    this.httpService.setHeaders(this.loggedUserData.userGuid);
    !ckLogin ? this.httpService.setUserGuid('localStorage') : this.httpService.setUserGuid('sessionStorage');
    this.loggedUserData$.next(this.loggedUserData);
    this.navigateAfterLogin();
  }

  // go to home page after login.
  navigateAfterLogin() {
    this.helperService.navigateTo('Home');
  }
  // navigate to reset password page.
  checkUserResetPassword(loggedUser) {
    this.httpService.setHeaders(loggedUser.userGuid);
    this.helperService.navigateTo('resetpassword');
    localStorage.removeItem('UserGuid');
  }
}
