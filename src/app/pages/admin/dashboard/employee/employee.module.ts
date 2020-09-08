import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {AdminDashboardEmployeePage} from './employee.page';
import {SharedModule} from '../../../../@shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{path: '', component: AdminDashboardEmployeePage}])
  ],
  declarations: [AdminDashboardEmployeePage]
})
export class AdminDashboardEmployeePageModule {
}
