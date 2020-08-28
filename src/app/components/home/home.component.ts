import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { HelperService } from 'src/app/services/helper.service';
import { ModalsManagerComponent } from 'src/app/sections/modals-manager/modals-manager.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public authService: AuthService , public helperService: HelperService , public modalsManager: ModalsManagerComponent) { }

  ngOnInit() {
    if(!this.authService.loggedUserData){
      // if there is no data navigate to login
      this.helperService.navigateTo('login');
    }

  }

}
