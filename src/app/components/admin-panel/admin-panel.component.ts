import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { HelperService } from 'src/app/services/helper.service';


@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  constructor(public authService: AuthService , public helperService: HelperService) { }

  ngOnInit() {
    // if there is no user data route to login
    if(!this.authService.loggedUserData){
      this.helperService.navigateTo('login');
    }
  }

}
