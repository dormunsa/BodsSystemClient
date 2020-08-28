import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { process, aggregateBy, AggregateResult, AggregateDescriptor, State } from '@progress/kendo-data-query';
import { PageChangeEvent, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { StatisticReport } from 'src/app/interfaces/StatisticReport';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelperService } from 'src/app/services/helper.service';
import { GridSettings } from 'src/app/interfaces/GridSettings';
import { TooltipDirective } from '@progress/kendo-angular-tooltip';
import { ExcelExportData } from '@progress/kendo-angular-excel-export';
import { ModalsManagerComponent } from 'src/app/sections/modals-manager/modals-manager.component';
import { columnsOrder } from './columns';
import { StatisticReportComponent } from '../statistic-report.component';

@Component({
  selector: 'app-report-grid',
  templateUrl: './report-grid.component.html',
  styleUrls: ['./report-grid.component.css']
})
export class ReportGridComponent implements OnInit {


  @ViewChild(TooltipDirective, { static: true }) tooltipDir: TooltipDirective;
  @Input() currentForm;
  @Input() fromReport: boolean;
  @Input() data: StatisticReport[];

  roundingPercents: boolean = true;
  affiliates: any = [];
  type: string = 'numeric';
  pageSizes: number[] = [10, 20, 50, 100];
    // define grid settings
  gridSettings: GridSettings = {
    date: null,
    state: {
      skip: 0,
      take: 10,
      filter: {
        logic: 'and',
        filters: []
      },
      sort: []
    },
    gridData: {
      filter: {
        logic: 'and',
        filters: []
      }
    },
    columnsConfig: JSON.parse(JSON.stringify(columnsOrder))
  };


  constructor(private spinner: NgxSpinnerService, public helperService: HelperService, public modalsManager: ModalsManagerComponent, public mainComponent: StatisticReportComponent) {
    this.exportAllDataToCSV = this.exportAllDataToCSV.bind(this);
  }

  async ngOnInit() {
    this.pageSizes = this.helperService.checkDataLength(this.data);
    this.loadItems();
    this.spinner.hide();
  }


  // handle data changing
  dataStateChange(state: DataStateChangeEvent) {
    this.gridSettings.state = state;
    this.gridSettings.gridData = process(this.data, state);
  }
  // handle page  changing
  pageChange(event: PageChangeEvent) {
    this.gridSettings.state.skip = event.skip;
    this.loadItems();
  }
  // initialize grid data
  loadItems() {
    this.gridSettings.gridData = process(this.data, this.gridSettings.state);
    this.gridSettings.date = new Date();
  }
  // delete grid column saved order
  deleteOrder() {
    this.helperService.showNotification('Order Deleted!', 'success');
    this.gridSettings.state.sort = [];
    this.gridSettings.state.filter.filters = [];
    this.gridSettings.columnsConfig = JSON.parse(JSON.stringify(columnsOrder));
    this.loadItems();
  }

  exportAllDataToCSV() {
    const myState: State = this.gridSettings.state;
    myState.skip = 0;
    myState.take = this.gridSettings.gridData.total;
    const result: ExcelExportData = {
      data: process(this.data, myState).data
    };
    this.helperService.showNotification('Success', 'success');
    return result;
  }

}
