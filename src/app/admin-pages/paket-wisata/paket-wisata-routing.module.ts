import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaketWisataComponent } from './paket-wisata/paket-wisata.component';

const routes: Routes = [
  {
    path: '',
    component: PaketWisataComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaketWisataRoutingModule {}
