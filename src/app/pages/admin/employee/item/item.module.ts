import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {SharedModule} from '../../../../@shared/shared.module';
import {AdminEmployeeItemPage} from './item.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{path: '', component: AdminEmployeeItemPage}])
  ],
  declarations: [AdminEmployeeItemPage]
})
export class AdminEmployeeItemPageModule {
}
