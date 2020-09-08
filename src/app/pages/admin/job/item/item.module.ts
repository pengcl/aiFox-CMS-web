import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {SharedModule} from '../../../../@shared/shared.module';
import {AdminJobItemPage} from './item.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{path: '', component: AdminJobItemPage}])
  ],
  declarations: [AdminJobItemPage]
})
export class AdminJobItemPageModule {
}
