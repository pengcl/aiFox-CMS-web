import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {SharedModule} from '../../../../@shared/shared.module';
import {AdminEmployeeListPage} from './list.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{path: '', component: AdminEmployeeListPage}])
  ],
  declarations: [AdminEmployeeListPage]
})
export class AdminEmployeeListPageModule {
}
