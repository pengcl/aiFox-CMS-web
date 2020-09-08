import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {AdminDashboardSupplierPage} from './supplier.page';
import {SharedModule} from '../../../../@shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{path: '', component: AdminDashboardSupplierPage}])
  ],
  declarations: [AdminDashboardSupplierPage]
})
export class AdminDashboardSupplierPageModule {
}
