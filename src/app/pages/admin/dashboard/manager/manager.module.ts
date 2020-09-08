import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {AdminDashboardManagerPage} from './manager.page';
import {SharedModule} from '../../../../@shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{path: '', component: AdminDashboardManagerPage}])
  ],
  declarations: [AdminDashboardManagerPage]
})
export class AdminDashboardManagerPageModule {
}
