import { Component, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { StatisticReport } from 'src/app/interfaces/StatisticReport';
import { HelperService } from 'src/app/services/helper.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-statistic-report',
  templateUrl: './statistic-report.component.html',
  styleUrls: ['./statistic-report.component.css']
})
export class StatisticReportComponent implements OnInit {
  currentForm;
  offerName: string;
  showChart: boolean = false;
  showReport: boolean = false;
  form: FormGroup;
  @Output() data: StatisticReport[];
  constructor(public authService: AuthService,private spinner: NgxSpinnerService, private httpService: HttpService, private helperService: HelperService) { }

  async ngOnInit() {
    if(!this.authService.loggedUserData){
      this.helperService.navigateTo('login');
    }
    this.form = new FormGroup({
      // define form inputs and input settings
      fromDate: new FormControl(''),
      toDate: new FormControl('')
    });
  }
  // initialize table report
  async getData() {
    try {
      debugger
      this.spinner.show();
      this.showChart = false;
      this.currentForm = this.form.value;
      let formData = this.form.value;
      formData = this.helperService.checkForEmptyInputsNformatDates(formData);
      this.data = null;
      this.httpService.get('DetectionReport', formData).subscribe(res => {
        this.data = res;
        this.showReport = true;
        this.spinner.hide();
      }, error => this.helperService.handleError('Error', this.spinner));
    } catch (e) {
      this.helperService.handleError('Error', this.spinner);
    }
  }
 // initialize chart report
  async getChart(e) {
    debugger;
    e.stopPropagation();
    this.showChart = true;
    this.showReport = false;
    try {
      debugger
      this.spinner.show();
      this.showReport = false;
      this.currentForm = this.form.value;
      let formData = this.form.value;
      formData = this.helperService.checkForEmptyInputsNformatDates(formData);
      this.data = null;
      this.httpService.get('ChartReport', formData).subscribe(res => {
        debugger;
        this.data = res;
        this.showChart = true;
        this.spinner.hide();
      }, error => this.helperService.handleError('Error', this.spinner));
    } catch (e) {
      this.helperService.handleError('Error', this.spinner);
    }
  }

  // get fromDate value
  get fromDate() {
    return this.form.get('fromDate');
  }
  // get toDate value
  get toDate() {
    return this.form.get('toDate');
  }



}
