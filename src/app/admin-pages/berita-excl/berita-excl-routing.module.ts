import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BeritaExclComponent } from './berita-excl/berita-excl.component';

const routes: Routes = [
  {
    path: '',
    component: BeritaExclComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BeritaRoutingModule {}
