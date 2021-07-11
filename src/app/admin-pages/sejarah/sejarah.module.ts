import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipesModule } from 'src/app/_helpers/html-pipe/html-pipe.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SejarahRoutingModule } from './sejarah-routing.module';
import { SejarahComponent } from './sejarah/sejarah.component';


//dev extreme module
import { DxHtmlEditorModule, DxCheckBoxModule } from 'devextreme-angular';
//dev extreme module
import { TableModule } from 'primeng/table';



@NgModule({
  imports: [
    CommonModule,
    SejarahRoutingModule,
    FormsModule,
    ReactiveFormsModule,

    //dev extreme module
    DxHtmlEditorModule,
    DxCheckBoxModule,
    PipesModule,

    TableModule,
    //dev extreme module

  ],
  declarations: [SejarahComponent]
})
export class SejarahModule { }
