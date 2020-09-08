import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {SharedModule} from '../../../../@shared/shared.module';
import {AdminProjectItemPage} from './item.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{path: '', component: AdminProjectItemPage}])
  ],
  declarations: [AdminProjectItemPage]
})
export class AdminProjectItemPageModule {
}
