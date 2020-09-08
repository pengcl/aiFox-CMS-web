import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {SharedModule} from '../../../../@shared/shared.module';
import {AdminProjectListPage} from './list.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{path: '', component: AdminProjectListPage}])
  ],
  declarations: [AdminProjectListPage]
})
export class AdminProjectListPageModule {
}
