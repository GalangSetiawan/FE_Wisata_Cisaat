import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebPreferencesRoutingModule } from './web-preferences-routing.module';
import { WebPreferencesComponent } from './web-preferences/web-preferences.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/_helpers/html-pipe/html-pipe.module'


//dev extreme module
import { DxHtmlEditorModule, DxCheckBoxModule } from 'devextreme-angular';


//primeng
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {CalendarModule} from 'primeng/calendar';
import {SliderModule} from 'primeng/slider';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {ProgressBarModule} from 'primeng/progressbar';
import {InputTextModule} from 'primeng/inputtext';

@NgModule({
  imports: [
    CommonModule,
    WebPreferencesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,

    // dev extreme module
    DxHtmlEditorModule,
    DxCheckBoxModule,

    // primeng
    TableModule,
    CalendarModule,
		SliderModule,
		DialogModule,
		MultiSelectModule,
		ContextMenuModule,
		DropdownModule,
		ButtonModule,
		ToastModule,
    InputTextModule,
    
    
    
  ],
  declarations: [
    WebPreferencesComponent,
    
  ],
  exports: [
    // PipesModule
  ]
  
})
export class WebPreferencesModule { }
