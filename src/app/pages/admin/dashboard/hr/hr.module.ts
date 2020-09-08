import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {AdminDashboardHrPage} from './hr.page';
import {SharedModule} from '../../../../@shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{path: '', component: AdminDashboardHrPage}])
  ],
  declarations: [AdminDashboardHrPage]
})
export class AdminDashboardHrPageModule {
}
