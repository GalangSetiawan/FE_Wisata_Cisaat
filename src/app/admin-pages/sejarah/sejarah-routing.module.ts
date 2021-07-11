import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SejarahComponent } from './sejarah/sejarah.component';

const routes: Routes = [
  {
    path: '',
    component: SejarahComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SejarahRoutingModule {}
