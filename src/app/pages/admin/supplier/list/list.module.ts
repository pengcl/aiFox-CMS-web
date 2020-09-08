import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {SharedModule} from '../../../../@shared/shared.module';
import {AdminSupplierListPage} from './list.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{path: '', component: AdminSupplierListPage}])
  ],
  declarations: [AdminSupplierListPage]
})
export class AdminSupplierListPageModule {
}
