import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WebPreferencesComponent } from './web-preferences/web-preferences.component';

const routes: Routes = [
  {
    path: '',
    component: WebPreferencesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebPreferencesRoutingModule {}
