import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-detection-chart',
  templateUrl: './detection-chart.component.html',
  styleUrls: ['./detection-chart.component.css']
})
export class DetectionChartComponent implements OnInit {
  @Input() data: any;

  public series: any;
  public categories: any;
  constructor() { }

  ngOnInit() {
    // define chart data
    this.series = this.data.chartData;
    this.categories =this.data.dates;
  }

}
