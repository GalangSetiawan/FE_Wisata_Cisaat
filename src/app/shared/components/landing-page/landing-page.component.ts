import { Component, OnInit } from '@angular/core';
declare var Swiper:any 
declare var ScrollReveal:any 
import { Router } from '@angular/router';



@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor(
    public router: Router,

  ) {}

  ngOnInit(): void {
    this.swiper()
  }

  public login(){
    this.router.navigate(['/login']);

  }
  public videoButton(){
    console.log('videbutton click')
    /*==================== VIDEO ====================*/
    var videoFile:any = document.getElementById('video-file'),
    videoButton:any = document.getElementById('video-button'),
    videoIcon:any = document.getElementById('video-icon')

    function playPause(){ 
    if (videoFile.paused){
      // Play video
      videoFile.play()
      // We change the icon
      videoIcon.classList.add('ri-pause-line')
      videoIcon.classList.remove('ri-play-line')
    }
    else {
      // Pause video
      videoFile.pause(); 
      // We change the icon
      videoIcon.classList.remove('ri-pause-line')
      videoIcon.classList.add('ri-play-line')

    }
    }
    videoButton.addEventListener('click', playPause)

    function finalVideo(){
    // Video ends, icon change
    videoIcon.classList.remove('ri-pause-line')
    videoIcon.classList.add('ri-play-line')
    }
    // ended, when the video ends
    videoFile.addEventListener('ended', finalVideo)
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

  public swiper(){
    
    /*==================== SWIPER DISCOVER ====================*/
    let swiper = new Swiper(".discover__container", {
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      loop: true,
      spaceBetween: 32,
      coverflowEffect: {
          rotate: 0,
      },
    })

    var sr = ScrollReveal({
        distance: '60px',
        duration: 2800,
        // reset: true,
    })
    
    
    sr.reveal(`.home__data, .home__social-link, .home__info,
              .discover__container,
              .experience__data, .experience__overlay,
              .place__card,
              .sponsor__content,
              .footer__data, .footer__rights`,{
        origin: 'top',
        interval: 100,
    })
    
    sr.reveal(`.about__data, 
              .video__description,
              .subscribe__description`,{
        origin: 'left',
    })
    
    sr.reveal(`.about__img-overlay, 
              .video__content,
              .subscribe__form`,{
        origin: 'right',
        interval: 100,
    })
    
  }
  

}
