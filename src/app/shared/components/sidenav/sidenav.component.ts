import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'
import { Router, NavigationEnd, RouterEvent } from '@angular/router';
import { takeUntil, filter } from 'rxjs/operators';
import { menuConstant } from 'src/app/_helpers/menu-constant/custom-widget.constant'


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  public openedMenu:any;
  constructor(
    public router: Router,

  ) {
    const events =  this.router.events. pipe(filter(event=>event instanceof NavigationEnd));
        events.subscribe((e:NavigationEnd)=>{
        console.log('apanih ====>',e.urlAfterRedirects)         
        menuConstant.listMenu.forEach(menu => {
          if(menu.url.includes(e.urlAfterRedirects)){
            console.log('opened menu ==>',menu);
            this.openedMenu = menu
          }
        });
      })

   }

  ngOnInit(): void {
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


  listMenu = menuConstant.listMenu
    


}
