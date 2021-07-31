import { Component, OnInit } from '@angular/core';
import { AuthServiceFake } from '../../../core/auth.service';
import { TokenStorageService } from '../../../_services/token-storage.service';
import { Router, NavigationEnd, RouterEvent } from '@angular/router';
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

    }

  ngOnInit() {
    this.currentUser = this.tokenStorage.getUser();
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