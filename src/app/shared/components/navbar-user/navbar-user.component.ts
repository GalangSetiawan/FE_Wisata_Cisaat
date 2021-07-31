import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil, take, find } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WebPreferencesService } from 'src/app/_services/web-preferences/web-preferences.service'
import * as $ from 'jquery'

@Component({
  selector: 'app-navbar-user',
  templateUrl: './navbar-user.component.html',
  styleUrls: ['./navbar-user.component.css']
})
export class NavbarUserComponent implements OnInit {
  public webInfo: FormGroup;
  private ngUnsubscribe: Subject<boolean> = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private webPreferencesService : WebPreferencesService,

  ) { 
    this.webInfo =  this.formBuilder.group({
      websiteName     : null,
      mapLocation     : null,
      address         : null,
      websiteImage    : [null],
      websiteImageName: [null],
      imageUrl        : [null],
      id              : [0]
    })
  }

  ngOnInit(): void {
    this.getWebsiteInfo();

  }

  
  public getWebsiteInfo(){
    this.webPreferencesService.getWebsiteInfo().pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (result:any) => {
        console.log("success getWebsiteInfo ===>",result)
        this.webInfo.patchValue({
          websiteName : result.websiteName,
          address : result.address,
          mapLocation : result.mapLocation,
          id : result.id
        })
        // this.generateMap(this.webInfo.value.mapLocation)
        // this.downloadImage();
      },
      (error: any) => {
        console.log("error getWebsiteInfo ===>",error)
      }
    );
  }

  public toggleMenu(){
    /*==================== SHOW MENU ====================*/
    var navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close')

    /*===== MENU SHOW =====*/
    /* Validate if constant exists */
    if(navToggle){
    navToggle.addEventListener('click', () =>{
      navMenu.classList.add('show-menu')
    })
    }

    /*===== MENU HIDDEN =====*/
    /* Validate if constant exists */
    if(navClose){
    navClose.addEventListener('click', () =>{
      navMenu.classList.remove('show-menu')
    })
    }
  }

  public themeButton(){
    console.log('tehemebuton click')
    /*==================== DARK LIGHT THEME ====================*/ 
    var themeButton = document.getElementById('theme-button')
    var darkTheme = 'dark-theme'
    var iconTheme = 'ri-sun-line'

    // Previously selected topic (if user selected)
    var selectedTheme = localStorage.getItem('selected-theme')
    var selectedIcon = localStorage.getItem('selected-icon')

    // We obtain the current theme that the interface has by validating the dark-theme class
    var getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
    var getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line'

    // We validate if the user previously chose a topic
    if (selectedTheme) {
      // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
      document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
      themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme)
    }

    // Activate / deactivate the theme manually with the button
    themeButton.addEventListener('click', () => {
        // Add or remove the dark / icon theme
        document.body.classList.toggle(darkTheme)
        themeButton.classList.toggle(iconTheme)
        // We save the theme and the current icon that the user chose
        localStorage.setItem('selected-theme', getCurrentTheme())
        localStorage.setItem('selected-icon', getCurrentIcon())
    })
  }

  public login(){
    this.router.navigate(['/login']);
  }

  public navActive(event){
    console.log('navActive ==>',event);
  
    var selectedId = event.target.name
    console.log('selectedId ==>',selectedId);

    $('.nav__menu a[name=' + selectedId + ']').addClass('active-link')


    

    

    // elements.forEach(sectionId => {
    //   if(selectedId == sectionId){
    //     // document.querySelector('.nav__menu a[href*=#' + sectionId + ']').classList.add('active-link');
    //     $('.nav__menu a[name=' + sectionId + ']').addClass('active-link')
    //   }else{
    //     // document.querySelector('.nav__menu a[href*=#' + sectionId + ']').classList.remove('active-link')
    //     $('.nav__menu a[name=' + sectionId + ']').removeClass('active-link')

    //   }
    // });






  }

}
