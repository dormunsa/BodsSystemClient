import { Component, OnInit, ViewChild, OnDestroy, Input } from '@angular/core';
import { TooltipDirective } from '@progress/kendo-angular-tooltip';
import { columnsOrder } from './columns';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelperService } from 'src/app/services/helper.service';
import { HttpService } from 'src/app/services/http.service';
import { Router, NavigationEnd } from '@angular/router';
import { ModalsManagerComponent } from 'src/app/sections/modals-manager/modals-manager.component';
import { filter } from 'rxjs/operators';
import { DataStateChangeEvent, PageChangeEvent } from '@progress/kendo-angular-grid';
import { process } from '@progress/kendo-data-query';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/interfaces/User';
import { GridSettings } from 'src/app/interfaces/GridSettings';

@Component({
  selector: 'app-user-grid',
  templateUrl: './user-grid.component.html',
  styleUrls: ['./user-grid.component.css']
})
export class UserGridComponent implements OnInit {


  @ViewChild(TooltipDirective, { static: true }) tooltipDir: TooltipDirective;
  @ViewChild('grid', { static: true }) Grid;


  data: User[];
  type: string = 'numeric';
  pageSizes: number[] = [10, 20, 50, 100];
  firstLoad: boolean = true;
  navigationSubscription: Subscription;
   // define grid settings
  gridSettings: GridSettings = {
    date: null,
    state: {
      skip: 0,
      take: 10,
      filter: {
        logic: 'and',
        filters: []
      }
    },
    gridData: {
      filter: {
        logic: 'and',
        filters: []
      }
    },
    columnsConfig: JSON.parse(JSON.stringify(columnsOrder))
  };

  afterRequestDone = {
    res: null,
    initData: this.ngOnInit.bind(this),
    navigateTo: 'admin',
    spinner: this.spinner,
    window: null
  };

  constructor(public authService: AuthService, private spinner: NgxSpinnerService, public helperService: HelperService,  private httpService: HttpService, private router: Router, public modalsManager: ModalsManagerComponent) {
    this.navigationSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        if (!this.firstLoad) this.ngOnInit();
      });
  }

  ngOnInit() {
    this.getData();
  }

  ngOnDestroy() {
    this.navigationSubscription.unsubscribe();
  }
  // get data from api and stored it, define grid settings in order to data length
  getData() {
    setTimeout(() => { this.spinner.show(); });
    this.httpService.get('User?userId='+ this.authService.loggedUserData.userId).subscribe(res => {
      debugger
      this.data = res;
      this.pageSizes = this.helperService.checkDataLength(this.data);
      this.loadItems();
      this.firstLoad = false;
      this.spinner.hide();
    }, error => this.helperService.handleError('Network problem', this.spinner));
  }
  // remove user operation
  async removeUser(dataItem) {
    const dialogResult = await this.helperService.openDialog(`Are you sure you want to delete user id ${dataItem.userId}?`);
    if (dialogResult) {
      try {
        this.spinner.show();
        this.httpService.delete('User', dataItem).subscribe(
          res => {
            debugger
            this.afterRequestDone.res = res;
            this.helperService.requestDoneSuccessfully(this.afterRequestDone);
          },
          error => this.helperService.handleError('Error', this.spinner)
        );
      } catch (e) {
        this.helperService.handleError('Error', this.spinner);
      }
    } else return;
  }
  // set user as operation
  async SetAsAdmin(dataItem) {
    const dialogResult = await this.helperService.openDialog(`Are you sure you want to became ${dataItem.userName} as Admin?`);
    if (dialogResult) {
      try {
        this.spinner.show();
        this.httpService.post('SetUserAsAdmin', dataItem.userId).subscribe(
          res => {
            debugger
            this.afterRequestDone.res = res;
            this.helperService.requestDoneSuccessfully(this.afterRequestDone);
          },
          error => this.helperService.handleError('Error', this.spinner)
        );
      } catch (e) {
        this.helperService.handleError('Error', this.spinner);
      }
    } else return;
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


}
