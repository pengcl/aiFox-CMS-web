import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {SharedModule} from "../../../../@shared/shared.module";
import {AdminSupplierItemPage} from './item.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{path: '', component: AdminSupplierItemPage}])
  ],
  declarations: [AdminSupplierItemPage]
})
export class AdminSupplierItemPageModule {
}
