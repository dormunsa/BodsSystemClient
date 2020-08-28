import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpService } from 'src/app/services/http.service';
import { HelperService } from 'src/app/services/helper.service';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { Camera } from 'src/app/interfaces/Camera';



@Component({
  selector: 'app-add-edit-camera',
  templateUrl: './add-edit-camera.component.html',
  styleUrls: ['./add-edit-camera.component.css']
})
export class AddEditCameraComponent implements OnInit {

  @Input() data: Camera[];
  @Input() cameraIdN: number;
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
    // initialize form and define form input settings
    this.form = new FormGroup({
      cameraId: new FormControl(0),
      locationName: new FormControl('', Validators.required),
      longitude: new FormControl('', Validators.required),
      latitude: new FormControl('', Validators.required),
      isWorking: new FormControl(true),
    });
    if (this.data) this.form.patchValue(Object.assign({}, this.data));
    if (this.cameraIdN) this.cameraId.setValue(this.cameraIdN);
    this.spinner.hide();
  }
  // validate form and send appropriate request to api
  addEditCamera(addMode: boolean = false) {
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
        if (addMode) {
          this.httpService.post('Camera', formData).subscribe(res => {
            this.afterRequestDone.res = res;
            !this.cameraIdN ? this.afterRequestDone.navigateTo = 'Home' : this.afterRequestDone.initData = this.initFunc.bind(this);
            this.helperService.requestDoneSuccessfully(this.afterRequestDone);
          }, error => this.helperService.handleError('Error', this.spinner));
        } else {
          this.httpService.put('Camera', formData).subscribe(res => {
            this.afterRequestDone.res = res;
            !this.cameraIdN ? this.afterRequestDone.navigateTo = 'Home' : this.afterRequestDone.initData = this.initFunc.bind(this);
            this.helperService.requestDoneSuccessfully(this.afterRequestDone);
          }, error => this.helperService.handleError('Error', this.spinner));
        }
      }
    } catch (e) {
      this.window.close();
      this.helperService.handleError('Error', this.spinner);
    }
  }


  // get longitude value
  get longitude() {
    return this.form.get('longitude');
  }
  // get latitude value
  get latitude() {
    return this.form.get('latitude');
  }
  // get locationName value
  get locationName() {
    return this.form.get('locationName');
  }
  // get cameraId value
  get cameraId() {
    return this.form.get('cameraId');
  }
}
