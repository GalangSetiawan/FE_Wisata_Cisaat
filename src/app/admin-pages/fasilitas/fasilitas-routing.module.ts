import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FasilitasComponent } from './fasilitas/fasilitas.component';

const routes: Routes = [
  {
    path: '',
    component: FasilitasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FasilitasRoutingModule {}
