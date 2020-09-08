import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {CdkTableModule} from '@angular/cdk/table';
import {IonicModule} from '@ionic/angular';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';

const MATERIAL_PART = [
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatCheckboxModule,
  MatChipsModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatBadgeModule,
  MatCardModule,
  MatGridListModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatMenuModule,
  MatTableModule,
  MatPaginatorModule,
  CdkTableModule,
  MatProgressBarModule,
  MatTabsModule,
  MatSelectModule,
  MatButtonToggleModule,
  MatAutocompleteModule,
  MatDatepickerModule,
  MatNativeDateModule
];

import {COMPONENTS, ENTRY_COMPONENTS, PIPES} from './index';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    IonicModule,
    MATERIAL_PART
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    IonicModule,
    MATERIAL_PART,
    ...COMPONENTS,
    ...PIPES
  ],
  declarations: [...COMPONENTS, ...ENTRY_COMPONENTS, ...PIPES],
  entryComponents: [ENTRY_COMPONENTS]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: []
    } as ModuleWithProviders;
  }
}
