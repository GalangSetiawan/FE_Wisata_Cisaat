import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaketWisataRoutingModule } from './paket-wisata-routing.module';
import { PaketWisataComponent } from './paket-wisata/paket-wisata.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/_helpers/html-pipe/html-pipe.module'
import { CurrencyInputDirective } from 'src/app/_helpers/currency-directive/currency-input.directive';


//dev extreme module
import { DxHtmlEditorModule, DxCheckBoxModule, DxButtonGroupModule, DxPopupModule } from 'devextreme-angular';


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
import { EditorModule } from 'primeng/editor';

@NgModule({
  imports: [
    CommonModule,
    PaketWisataRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,

    // dev extreme module
    DxHtmlEditorModule,
    DxCheckBoxModule,
    DxButtonGroupModule,
    DxPopupModule,

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
    EditorModule,
    
    
  ],
  declarations: [
    PaketWisataComponent,
    CurrencyInputDirective
    
  ],
  exports: [
    // PipesModule
  ]
  
})
export class PaketWisataModule { }
