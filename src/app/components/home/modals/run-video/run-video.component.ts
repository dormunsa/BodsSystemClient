import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpService } from 'src/app/services/http.service';
import { HelperService } from 'src/app/services/helper.service';
import { WindowRef } from '@progress/kendo-angular-dialog';



@Component({
  selector: 'app-run-video',
  templateUrl: './run-video.component.html',
  styleUrls: ['./run-video.component.css']
})
export class RunVideoComponent implements OnInit {

  @Input() initFunc;
  showAlertMsg: boolean = false;
  form: FormGroup;
  afterRequestDone = {
    res: null,
    initData: null,
    navigateTo: null,
    spinner: this.spinner,
    window: this.window
  };

  constructor( private spinner: NgxSpinnerService, private httpService: HttpService, private helperService: HelperService, private window: WindowRef) { }

  ngOnInit() {
    setTimeout(() => { this.spinner.show(); });
    this.form = new FormGroup({
      // initialize form and define form input settings
      videoPath: new FormControl('', Validators.required),
    });
    this.spinner.hide();
  }

  // validate form and send appropriate request to api
  SendVideo(addMode: boolean = false) {
    try {
      if (this.form.invalid) {
        this.form.markAllAsTouched();
        this.showAlertMsg = true;
        return;
      } else {
        this.showAlertMsg = false;
        let formData = this.form.value;
        formData = this.helperService.checkForEmptyValuesNreplaceWithZero(formData);
        this.window.close();
        this.helperService.showNotification('Processing Video', 'success')

          this.httpService.startVideo('start?video='+ formData.videoPath).subscribe(res => {
            debugger
            this.afterRequestDone.res = res;
            this.afterRequestDone.navigateTo = 'Home' ;
            this.helperService.requestDoneSuccessfully(this.afterRequestDone);
          }, error => this.helperService.handleError('Error', this.spinner));
      }
    } catch (e) {
      this.window.close();
      this.helperService.handleError('Error', this.spinner);
    }
  }


  // get videoPath value from form
  get videoPath() {
    return this.form.get('videoPath');
  }

}
