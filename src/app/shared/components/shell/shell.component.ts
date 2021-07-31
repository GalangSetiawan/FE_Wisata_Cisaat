import { Component, OnInit } from '@angular/core';
import { AuthServiceFake } from '../../../core/auth.service';
import { TokenStorageService } from '../../../_services/token-storage.service';
import {
  Router,
  // import as RouterEvent to avoid confusion with the DOM Event
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router'
import { takeUntil, filter } from 'rxjs/operators';
import { menuConstant } from 'src/app/_helpers/menu-constant/custom-widget.constant'
import * as $ from 'jquery'

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.css']
})
export class ShellComponent implements OnInit {
  currentUser: any;
  public loading = true
  public openedMenu:any;
  constructor(
    public authServiceFake: AuthServiceFake,
    private tokenStorage: TokenStorageService,
    public router: Router,

    ) {
      const events =  this.router.events. pipe(filter(event=>event instanceof NavigationEnd));
        events.subscribe((e:NavigationEnd)=>{        
        menuConstant.listMenu.forEach(menu => {
          if(menu.url.includes(e.urlAfterRedirects)){
            this.openedMenu = menu
          }
        });
      })

      router.events.subscribe((event: RouterEvent) => {
        this.navigationInterceptor(event)
      })

    }

  ngOnInit() {
    this.currentUser = this.tokenStorage.getUser();
  }

  
  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.loading = true
    }
    if (event instanceof NavigationEnd) {
      this.loading = false
    }
    if (event instanceof NavigationCancel) {
      this.loading = false
    }
    if (event instanceof NavigationError) {
      this.loading = false
    }
  }



  logout(): void {
    console.log('logout')
    this.tokenStorage.signOut();
    this.router.navigate(['/home']);
    window.location.reload();

  }


  isShowToggle = true
  toggleSidebar(){
    this.isShowToggle =! this.isShowToggle
    if(this.isShowToggle) {
      $('#sidebar').hide();
      $('#main').attr('style','margin-left: 0');
    } else {
      $('#sidebar').show();
      $('#main').attr('style','margin-left: 300px');
    }
  }

}