import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from '../app/components/login-page/login-page/login-page.component';
import { HomeComponent } from '../app/components/home/home.component';
import { AdminPanelComponent } from '../app/components/admin-panel/admin-panel.component';
import { StatisticReportComponent } from '../app/components/statistics/statistic-report/statistic-report.component';
import { ResetPasswordComponent } from '../app/components/reset-password/reset-password.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginPageComponent },
  { path: 'Home', component: HomeComponent },
  { path: 'admin', component: AdminPanelComponent },
  { path: 'statistic', component: StatisticReportComponent },
  { path: 'resetpassword', component: ResetPasswordComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
