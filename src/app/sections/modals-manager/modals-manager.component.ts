import { Component } from '@angular/core';
import { WindowService } from '@progress/kendo-angular-dialog';
import { HelperService } from 'src/app/services/helper.service';
import { AddEditCameraComponent } from 'src/app/components/camera-grid/modals/add-edit-camera/add-edit-camera.component';
import { AddEditUserComponent } from 'src/app/components/user-grid/modals/add-edit-user/add-edit-user.component';
import { RunVideoComponent } from 'src/app/components/home/modals/run-video/run-video.component';
@Component({
  selector: 'app-modals-manager',
  templateUrl: './modals-manager.component.html',
  styleUrls: ['./modals-manager.component.css']
})
export class ModalsManagerComponent  {

  constructor(private windowService: WindowService, private helperService: HelperService) { }
  // open add or edit camera modal if there is data - the edit modals will show, else the add modals is show
  openAddEditCamera(data?, cameraId?: number, initFunc?) {
    let title = 'Add New Camera';
    if (data) title = 'Edit Camera';
    const windowRef = this.windowService.open({
      title,
      content: AddEditCameraComponent,
      width: 400,
      top: window.pageYOffset + 200
    });
    const modal = windowRef.content.instance;
    if (data) modal.data = data;
    if (cameraId) modal.cameraIdN = cameraId;
    if (initFunc) modal.initFunc = initFunc;
  }
  // open add or edit user modal if there is data - the edit modals will show, else the add modals is show
  openAddEdiUser(data?, userId?: number, initFunc?) {
    let title = 'Add New User';
    if (data) title = 'Edit User';
    const windowRef = this.windowService.open({
      title,
      content: AddEditUserComponent,
      width: 400,
      top: window.pageYOffset + 200
    });
    const modal = windowRef.content.instance;
    if (data) modal.data = data;
    if (userId) modal.cameraIdN = userId;
    if (initFunc) modal.initFunc = initFunc;
  }

  // open the run from video file will show
  openSendUser(initFunc?) {
    let title = 'Send Video';
    const windowRef = this.windowService.open({
      title,
      content: RunVideoComponent,
      width: 400,
      top: window.pageYOffset + 200
    });
    const modal = windowRef.content.instance;
    if (initFunc) modal.initFunc = initFunc;
  }

}
