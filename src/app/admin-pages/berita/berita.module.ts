import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipesModule } from 'src/app/_helpers/html-pipe/html-pipe.module'

import { BeritaRoutingModule } from './berita-routing.module';
import { BeritaComponent } from './berita/berita.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


//dev extreme module
import { DxHtmlEditorModule, DxCheckBoxModule } from 'devextreme-angular';
//dev extreme module
import { TableModule } from 'primeng/table';


@NgModule({
  declarations: [
    BeritaComponent,

  ],
  imports: [
    CommonModule,
    BeritaRoutingModule,
    FormsModule,
    ReactiveFormsModule,

    //dev extreme module
    DxHtmlEditorModule,
    DxCheckBoxModule,
    PipesModule,

    TableModule,
    //dev extreme module


  ],
  exports: [
    // HtmlPipe
  ]
  
})
export class BeritaModule { }
