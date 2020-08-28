import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  loggedUser: any;
  subscription: Subscription;
  constructor(public authService: AuthService) { }


  ngOnInit() {
    this.subscription = this.authService.loggedUserData$.subscribe(data => {
      this.onLoginEnd(data);
    });
  }

  onLoginEnd(data) {
    this.loggedUser = data;
  }

}
