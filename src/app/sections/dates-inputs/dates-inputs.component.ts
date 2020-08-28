import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HelperService } from 'src/app/services/helper.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-dates-inputs',
  templateUrl: './dates-inputs.component.html',
  styleUrls: ['./dates-inputs.component.css']
})
export class DatesInputsComponent implements OnInit {


  @Input() form: FormGroup;
  @Input() usingFromModal: boolean = false;

  loading: boolean = false;
  datesList: Array<{ text: string, value: string }>;
  dateValue;

  constructor(private helperService: HelperService, private httpService: HttpService) { }

  ngOnInit() {
    // define dates range drop down values
    this.datesList = [
      { text: 'Today', value: 'today' },
      { text: 'Yesterday', value: 'yesterday' },
      { text: 'Week to Date', value: 'weekToDate' },
      { text: 'Month to Date', value: 'monthToDate' },
      { text: 'Year to Date', value: 'yearToDate' },
      { text: 'Last Week', value: 'lastWeek' },
      { text: 'Last Month', value: 'lastMonth' }
    ];
    if (!this.usingFromModal) {
      this.dateValue = { value: 'today' };
      this.getDateRange({ value: 'today' });
    }
  }
  // get range from api and reorder it by regex
  getDateRange(range) {
    try {
      this.loading = true;
      if (range === undefined) return;
      this.httpService.get('TimeRange', { timeRange: range.value }).subscribe(res => {
        const arr1 = res.fromDate.split(/[\-\+ :T]/);
        const fromDate = new Date(arr1[0], arr1[1] - 1, arr1[2], arr1[3], arr1[4], arr1[5]);
        const arr2 = res.toDate.split(/[\-\+ :T]/);
        const toDate = new Date(arr2[0], arr2[1] - 1, arr2[2], arr2[3], arr2[4], arr2[5]);
        this.form.get('fromDate').setValue(fromDate);
        this.form.get('toDate').setValue(toDate);
        this.loading = false;
      }, error => {
        this.loading = false;
        this.helperService.handleError('Error');
      });
    } catch (e) {
      this.loading = false;
      this.helperService.handleError('Please try again');
    }
  }

}
