import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

import { MenuModule } from '@progress/kendo-angular-menu';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { NotificationModule } from '@progress/kendo-angular-notification';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { GridModule, ExcelModule } from '@progress/kendo-angular-grid';
import { TooltipModule } from '@progress/kendo-angular-tooltip';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { PopupModule } from '@progress/kendo-angular-popup';
import { SliderModule } from '@progress/kendo-angular-inputs';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { ChartsModule } from '@progress/kendo-angular-charts';
import { LoginPageComponent } from './components/login-page/login-page/login-page.component';
import { HomeComponent } from './components/home/home.component';
import { CameraGridComponent } from './components/camera-grid/camera-grid.component';
import { ModalsManagerComponent } from './sections/modals-manager/modals-manager.component';
import { AddEditCameraComponent } from './components/camera-grid/modals/add-edit-camera/add-edit-camera.component';
import { DetectionGridComponent } from './components/detection-grid/detection-grid.component';
import { UserGridComponent } from './components/user-grid/user-grid.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { AddEditUserComponent } from './components/user-grid/modals/add-edit-user/add-edit-user.component';
import { RunVideoComponent } from './components/home/modals/run-video/run-video.component';
import { StatisticReportComponent } from './components/statistics/statistic-report/statistic-report.component';
import { DatesInputsComponent } from './sections/dates-inputs/dates-inputs.component';
import { ReportGridComponent } from './components/statistics/statistic-report/report-grid/report-grid.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { DetectionChartComponent } from './components/statistics/detection-chart/detection-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LoginPageComponent,
    HomeComponent,
    CameraGridComponent,
    ModalsManagerComponent,
    AddEditCameraComponent,
    DetectionGridComponent,
    UserGridComponent,
    AdminPanelComponent,
    AddEditUserComponent,
    RunVideoComponent,
    StatisticReportComponent,
    DatesInputsComponent,
    ReportGridComponent,
    ResetPasswordComponent,
    DetectionChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MenuModule,
    InputsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    NotificationModule,
    GridModule,
    SliderModule,
    PopupModule,
    LayoutModule,
    DropDownsModule,
    DialogsModule,
    TooltipModule,
    ExcelModule,
    DateInputsModule,
    ChartsModule,
    ButtonsModule
  ],
  providers: [ModalsManagerComponent , HttpClientModule],
  bootstrap: [AppComponent],
  entryComponents:[AddEditCameraComponent,AddEditUserComponent , RunVideoComponent]
})
export class AppModule { }
