import { NotificationService } from '@progress/kendo-angular-notification';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpService } from './http.service';
declare const document;

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      cancelButton: 'btn btn-danger mr-2',
      confirmButton: 'btn btn-success'
    },
    buttonsStyling: false
  });

  constructor(private router: Router, private notificationService: NotificationService, private httpService: HttpService) { }

  // open new dialog box and show the custom message
  openDialog(text): Promise<boolean> {
    return this.swalWithBootstrapButtons.fire({
      title: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.swalWithBootstrapButtons.fire(
          'Success!',
          '',
          'success'
        );
        return true;
      } else return false;
    });
  }
  // check the inputs forms and adjustment dates
  checkForEmptyInputsNformatDates(objForCheck, trim = false) {
    let fromDate;
    let toDate;
    if (objForCheck.fromDate || objForCheck.toDate) {
      objForCheck.toDate.setSeconds(59);
      fromDate = new Date(objForCheck.fromDate.getTime() - (objForCheck.fromDate.getTimezoneOffset() * 60000)).toJSON();
      toDate = new Date(objForCheck.toDate.getTime() - (objForCheck.toDate.getTimezoneOffset() * 60000)).toJSON();
    }
    const res = JSON.parse(JSON.stringify(objForCheck));
    Object.keys(res).forEach((key) => {
      if (res[key] === '' || res[key] === null) {
        delete res[key];
      }
    });
    res.fromDate = fromDate;
    res.toDate = toDate;
    return res;
  }

  // replace empty integer inputs with zero value
  checkForEmptyValuesNreplaceWithZero(dataToCheck) {
    const res = JSON.parse(JSON.stringify(dataToCheck));
    Object.keys(res).forEach((key) => {
      if (res[key] === '' || res[key] === null) {
        res[key] = 0;
      }
    });
    return res;
  }
  // show message notification by 'text' variable
  showNotification(text, style) {
    this.notificationService.show({
      content: text,
      animation: { type: 'fade', duration: 150 },
      position: { horizontal: 'center', vertical: 'top' },
      type: { style, icon: true },
      // closable: true
      hideAfter: 5000
    });
  }
  // route to the path
  navigateTo(path) {
    this.router.navigate([`${path}`]);
  }

  showTooltip(e: MouseEvent, tooltipDir): void {
    const element = e.target as HTMLElement;
    if ((element.nodeName === 'TD' || element.nodeName === 'A' || element.nodeName === 'TH')
      && element.offsetWidth < element.scrollWidth) {
      tooltipDir.toggle(element);
    } else {
      tooltipDir.hide();
    }
  }


  // check number of data raws
  checkDataLength(data) {
    const res = [5, 10, 20, 50, 100];
    if (data.length > 100) {
      res.push(data.length);
      return res;
    } else return res;
  }
  // show error message
  handleError(errorMsg, spinner?) {
    if (spinner) spinner.hide();
    Swal.fire({
      icon: 'error',
      title: 'Error!',
      text: `you got error , ${errorMsg}`
    });
  }
  // check the response and show appropriate message
  requestDoneSuccessfully({ res, initData, navigateTo, spinner, window }, needMsg: boolean = true) {
    if (!navigateTo && !initData) {
      spinner.hide();
      if (window) window.close();
      if (needMsg) !res ? this.showNotification('Error', 'error') : this.showNotification('Success!', 'success');
    } else {
      if (needMsg) !res ? this.showNotification('Error', 'error') : this.showNotification('Success!', 'success');
      navigateTo ? this.navigateTo(navigateTo) : initData();
      if (window) window.close();
    }
  }

}
