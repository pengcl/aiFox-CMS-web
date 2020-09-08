import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {SharedModule} from '../../../../@shared/shared.module';
import {AdminAttendanceListPage} from './list.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{path: '', component: AdminAttendanceListPage}])
  ],
  declarations: [AdminAttendanceListPage]
})
export class AdminAttendanceListPageModule {
}
