import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

import { SidenavComponent } from './components/sidenav/sidenav.component';
import { RouterModule } from '@angular/router';
import { NotAuthComponent } from './components/not-auth/not-auth.component';
import { ShellComponent } from './components/shell/shell.component';
import { LoginComponent } from './components/login/login.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { BeritaComponent } from './components/berita/berita.component';

const materialModules = [
  FlexLayoutModule
];

@NgModule({
  imports: [
    CommonModule, 
    RouterModule, 
    FormsModule,
    ...materialModules],

  declarations: [
    SidenavComponent, 
    NotAuthComponent, 
    ShellComponent, 
    LoginComponent, 
    LandingPageComponent,
    BeritaComponent
  ],

  exports: [
    SidenavComponent, 
    ...materialModules
  ]
})
export class SharedModule {}
