import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpService } from 'src/app/services/http.service';
import { HelperService } from 'src/app/services/helper.service';
import { AuthService } from 'src/app/services/auth.service';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { User } from 'src/app/interfaces/User';


@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css']
})
export class AddEditUserComponent implements OnInit {

  @Input() data: User[];
  @Input() userIdN: number;
  @Input() initFunc;
  showTokensGrid: boolean = false;
  showAlertMsg: boolean = false;
  form: FormGroup;
  afterRequestDone = {
    res: null,
    initData: null,
    navigateTo: null,
    spinner: this.spinner,
    window: this.window
  };

  constructor( public auth : AuthService, private spinner: NgxSpinnerService, private httpService: HttpService, private helperService: HelperService, private window: WindowRef) { }

  ngOnInit() {
    setTimeout(() => { this.spinner.show(); });
    // initialize form and define form input settings
    this.form = new FormGroup({
      userId: new FormControl(0),
      userName: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      slackWebHook:new FormControl(''),
      isAdmin: new FormControl(false),
      adminId: new FormControl(this.auth.loggedUserData.userId),
    });
    if (this.data) this.form.patchValue(Object.assign({}, this.data));
    if (this.userIdN) this.userId.setValue(this.userIdN);
    this.spinner.hide();
  }

  // validate form and send appropriate request to api
  addEditUser(addMode: boolean = false) {
    try {
      if (this.form.invalid) {
        this.form.markAllAsTouched();
        this.showAlertMsg = true;
        return;
      } else {
        this.spinner.show();
        this.showAlertMsg = false;
        let formData = this.form.value;
        formData = this.helperService.checkForEmptyValuesNreplaceWithZero(formData);
        debugger
        if (addMode) {
          this.httpService.post('User', formData).subscribe(res => {
            debugger
            this.afterRequestDone.res = res;
            !this.userIdN ? this.afterRequestDone.navigateTo = 'admin' : this.afterRequestDone.initData = this.initFunc.bind(this);
            this.helperService.requestDoneSuccessfully(this.afterRequestDone);
          }, error => this.helperService.handleError('Error', this.spinner));
        } else {
          this.httpService.put('User', formData).subscribe(res => {
            debugger
            this.afterRequestDone.res = res;
            !this.userIdN ? this.afterRequestDone.navigateTo = 'admin' : this.afterRequestDone.initData = this.initFunc.bind(this);
            this.helperService.requestDoneSuccessfully(this.afterRequestDone);
          }, error => this.helperService.handleError('Error', this.spinner));
        }
      }
    } catch (e) {
      this.window.close();
      this.helperService.handleError('Error', this.spinner);
    }
  }


  // get lastName value
  get lastName() {
    return this.form.get('lastName');
  }
  // get slackWebHook value
  get slackWebHook() {
    return this.form.get('slackWebHook');
  }
  // get phone value
  get phone() {
    return this.form.get('phone');
  }
  // get firstName value
  get firstName() {
    return this.form.get('firstName');
  }
  // get userName value
  get userName() {
    return this.form.get('userName');
  }
  // get userId value
  get userId() {
    return this.form.get('userId');
  }

}
