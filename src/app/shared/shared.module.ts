import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/_helpers/html-pipe/html-pipe.module'

import { SidenavComponent } from './components/sidenav/sidenav.component';
import { RouterModule } from '@angular/router';
import { NotAuthComponent } from './components/not-auth/not-auth.component';
import { ShellComponent } from './components/shell/shell.component';
import { LoginComponent } from './components/login/login.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { BeritaComponent } from './components/berita/berita.component';
import { NavbarUserComponent } from './components/navbar-user/navbar-user.component';
import { StoriesComponent } from './components/stories/stories.component';

const materialModules = [
  FlexLayoutModule
];

@NgModule({
  imports: [
    CommonModule, 
    RouterModule, 
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
    ...materialModules],

  declarations: [
    SidenavComponent, 
    NotAuthComponent, 
    ShellComponent, 
    LoginComponent, 
    LandingPageComponent,
    BeritaComponent,
    NavbarUserComponent,
    StoriesComponent
  ],

  exports: [
    SidenavComponent, 
    PipesModule,
    ...materialModules
  ]
})
export class SharedModule {}
