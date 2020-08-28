import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelperService } from 'src/app/services/helper.service';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {


  newPassword: string;
  newPasswordAgain: string;
  showAlert: boolean = false;

  constructor(private httpService: HttpService, private spinner: NgxSpinnerService, private helperService: HelperService) { }

  ngOnInit() { }
  // send update password request to api
  updatePassword() {
    try {
      if (this.newPassword != this.newPasswordAgain) {
        this.showAlert = true;
        return;
      } else {
        this.showAlert = false;
        this.spinner.show();
        this.newPassword = `"${this.newPassword}"`;
        this.httpService.post('SetUserPassword', this.newPassword).subscribe(res => {
          this.spinner.hide();
          res ? this.helperService.showNotification('Please login', 'success') : this.helperService.showNotification('Error', 'Error');
          this.helperService.navigateTo('login');
        }, error => {
          this.spinner.hide();
          this.helperService.handleError('Error');
        });
      }
    } catch (e) {
      this.spinner.hide();
      this.helperService.handleError('Error');
    }
  }

}
