import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, Router, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { authInterceptorProviders } from './_helpers/auth.interceptor.service';
// import { HTMLPipe } from 'src/app/_helpers/html-pipe/html-pipe.module'
import { AuthGuard } from './_helpers/auth.guard';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './shared/components/login/login.component';
import { NotAuthComponent } from './shared/components/not-auth/not-auth.component';
import { ShellComponent } from './shared/components/shell/shell.component';
import { LandingPageComponent } from './shared/components/landing-page/landing-page.component';


import { HomeModule } from 'src/app/admin-pages/home/home.module';
import { AdminModule } from 'src/app/admin-pages/admin/admin.module';
import { BeritaModule } from 'src/app/admin-pages/berita/berita.module';
import { BeritaExclModule } from 'src/app/admin-pages/berita-excl/berita-excl.module';
import { ContactModule } from 'src/app/admin-pages/contact/contact.module';
import { WebPreferencesModule } from 'src/app/admin-pages/web-preferences/web-preferences.module';

// import { SidenavComponent } from './shared/components/sidenav/sidenav.component';


// import { BeritaComponent } from 'src/app/admin-pages/berita/berita/berita.component';
// import { AdminComponent } from 'src/app/admin-pages/admin/admin/admin.component';
// import { HomeComponent } from 'src/app/admin-pages/home/home/home.component';
// import { WebPreferencesComponent } from 'src/app/admin-pages/web-preferences/web-preferences/web-preferences.component';



const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: LandingPageComponent },
  { path: 'notauth', component: NotAuthComponent },
  // {
  //   path: 'hehe',
  //   component: ShellComponent,
  //   canActivate: [AuthGuard],
  //   runGuardsAndResolvers: 'always',
  //   children: [
  //     { path: 'web-preferences', component: WebPreferencesComponent },
  //     { path: 'home', component: HomeComponent },
  //     { path: 'admin', component: AdminComponent },
  //     { path: 'berita', component: BeritaComponent },
  //     { path: '', redirectTo: 'home', pathMatch: 'full' }
  //   ]
  // },
  

  {
    path: '',
    component: ShellComponent,
    canActivate: [AuthGuard],
    // canActivateChildren: [AuthGuard],
    runGuardsAndResolvers: 'always',
    children: [
      {
        path: 'admin/home',
        loadChildren: './admin-pages/home/home.module#HomeModule'
      },
      {
        path: 'admin/contact',
        loadChildren: './admin-pages/contact/contact.module#ContactModule'
      },
      {
        path: 'admin/web-preferences',
        loadChildren: './admin-pages/web-preferences/web-preferences.module#WebPreferencesModule'
      },

      {
        path: 'admin/admin',
        loadChildren: './admin-pages/admin/admin.module#AdminModule'
      },

      {
        path: 'admin/berita',
        loadChildren: './admin-pages/berita/berita.module#BeritaModule'
      },
      {
        path: 'admin/berita-excl',
        loadChildren: './admin-pages/berita-excl/berita-excl.module#BeritaExclModule'
      },
      {
        path: '',
        redirectTo: 'admin/home',
        pathMatch: 'full'
      }
    ]
  },
  
  
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    RouterModule.forRoot(routes, { useHash: true }),


    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,

  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {}
