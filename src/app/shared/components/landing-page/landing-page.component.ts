import { Component, OnInit } from '@angular/core';
declare var Swiper:any 
declare var ScrollReveal:any 
import { Router } from '@angular/router';
import * as $ from 'jquery'
import * as _ from 'lodash'
import { element } from 'protractor';
import { takeUntil, take, find } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WebPreferencesService } from 'src/app/_services/web-preferences/web-preferences.service'
import { ContactService } from 'src/app/_services/contact/contact.service'
import { FasilitasService } from 'src/app/_services/fasilitas/fasilitas.service'
import { PaketWisataService } from 'src/app/_services/paket-wisata/paket-wisata.service'
import { BeritaExclService } from 'src/app/_services/berita-excl/berita-excl.service'
import { SejarahService } from 'src/app/_services/sejarah/sejarah.service'

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  private ngUnsubscribe: Subject<boolean> = new Subject();
  public contactList:any[] = [];
  public fasilitasList:any[] = [];
  public paketWisataList:any[] = [];
  public potensiDesaWisataList:any[] = [];
  public sejarahList:any[] = [];
  public dayaTarikDesaList:any[] = [];
  public webInfo: FormGroup;
  public contactModel : FormGroup;
  public selectedWA:any = null

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private fasilitasService:FasilitasService,
    private paketWisataService:PaketWisataService,
    private domSanitizer:DomSanitizer,
    private beritaExclService:BeritaExclService,
    private sejarahService:SejarahService,

    private webPreferencesService : WebPreferencesService,
    private contactService : ContactService,

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

    this.contactModel =  this.formBuilder.group({
      nama     : ['', Validators.required],
      email    : null,
      telp     : ['', Validators.required],
      pesan    : ['', Validators.required],
     
    })
  }

  ngOnInit(): void {
    // this.swiper();
    this.getWebsiteInfo();
    this.getContact();
    this.getFasilitas();
    this.getPaketWisata();
    this.getPotensiDesaWisata();
    this.getSejarah();
    this.getDayaTarikDesa();
  }

  public async getSelectedWA(){
    await this.contactList.forEach(contact => {
      if(contact.sosialMedia.includes('Whatsapp')) this.selectedWA = contact
      else if (contact.sosialMedia.includes('whatsapp')) this.selectedWA = contact
      else null
    });

    console.log('getSelectedWA ===>',this.selectedWA)
  }

  public onTawaranClick(data,event){
    console.log('onTawaranClick data ===>',data );
    // console.log('onTawaranClick event ==>',event );

    var urlTemplate = 'https://wa.me/'+ this.contactModel.value.telp +'?text='
    var urlBreakLine = '%0A'
    var urlHeader = 'Halo admin *Desa Wisata Cisaat*' + urlBreakLine + 'Saya tertarik dengan paket wisata *' +data.title+ '* yang ditawarkan, apakah ada info lebih lanjut yang bisa saya dapatkan?' 
    var URLresult = urlTemplate  + urlHeader
    document.location.href = URLresult, "_blank";
  }

  public async onSendMessage(){
    console.log('onSendMessage ==>',this.contactModel.value)

    var selectedWA:any
    await this.contactList.forEach(contact => {
      if(contact.sosialMedia.includes('Whatsapp')) selectedWA = contact
      else if (contact.sosialMedia.includes('whatsapp')) selectedWA = contact
      else null
    });

    var urlTemplate = 'https://wa.me/'+ selectedWA.link +'?text='
    var urlBreakLine = '%0A'
    var urlHeader = 'Halo, saya ' +this.contactModel.value.nama + ' [ '+ this.contactModel.value.email +' ] '+ urlBreakLine + ' saya ingin bertanya '+ urlBreakLine
    var urlPesan = this.contactModel.value.pesan

    var URLresult = urlTemplate + urlHeader + urlPesan
    console.log('URLresult ===>',URLresult)
    // document.location.href = URLresult, "_blank";

    return URLresult
  }
  public getContact(){
    this.contactService.getAllContact().pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (r:any) =>{
        console.log('success | getContact ==>',r)
        this.contactList = r

        this.getSelectedWA()

        },
      error =>{
        // console.log('error | getContact ==>',error)
      }
    );
  }

  public getSejarah(){
    this.sejarahService.getAll().pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (result:any) => {
        console.log("success getSejarah ===>",result)
        this.sejarahList = result
      },
      (error: any) => {
        console.log("error getSejarah ===>",error)
      }
    );
  }
  public convertToBase64(data) {
    let TYPED_ARRAY = new Uint8Array(data);
    // const STRING_CHAR = String.fromCharCode.apply(null, TYPED_ARRAY);
    const STRING_CHAR = TYPED_ARRAY.reduce((data, byte)=> {
      return data + String.fromCharCode(byte);
      }, ''
    )

    let base64String = btoa(STRING_CHAR);
    var result:any = this.domSanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,' + base64String);
    return result.changingThisBreaksApplicationSecurity
    
  }

  public compressImage(src: string, maxWidth: number, maxHeight: number) {
    return new Promise((res, rej) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        let scale: number, newWidth: number, newHeight: number;
        if(img.width < maxWidth){
          scale = maxWidth / img.width;
        }else{
          scale = maxHeight / img.height;
        }
        newWidth = img.width * scale;
        newHeight = img.height * scale;
        const elem = document.createElement('canvas');
        elem.width = newWidth;
        elem.height = newHeight;
        const ctx = elem.getContext('2d');
        ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, newWidth, newHeight)
        const data = ctx.canvas.toDataURL();
        res(data);
      }
      img.onerror = error => rej(error);
    })
  }

  public currencyFormat(num,digits){
    const lookup = [
      { value: 1, symbol: "" },
      { value: 1e3, symbol: "Rb" },
      { value: 1e6, symbol: "Jt" },
      { value: 1e9, symbol: "M" },
      { value: 1e12, symbol: "T" },
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var item = lookup.slice().reverse().find(function(item) {
      return num >= item.value;
    });
    return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
  }

  public getDayaTarikDesa(){
    this.beritaExclService.getByGroupName('daya-tarik').pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (result:any) => {
        console.log("success getDayaTarikDesa ===>",result)
        this.dayaTarikDesaList = result;
        this.dayaTarikDesaList.forEach(data => {
         if(!_.isEmpty(data.imageNews)){
          data.imageUrl = [];
          var base64 = this.convertToBase64(data.imageNews.data)
          this.compressImage(base64, 400, 600).then(compressed400x600 => {
            data.imageUrl = compressed400x600
            data.imageUrlAsli = base64
          });
         }
        })
      },
      (error: any) => {
        console.log("error getDayaTarikDesa ===>",error)
      }
    );
  }

  public getPotensiDesaWisata(){
    this.beritaExclService.getByGroupName('potensi-desa-wisata').pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (result:any) => {
        // console.log("success getAllPaketWisata ===>",result)
        this.potensiDesaWisataList = result
        
        this.potensiDesaWisataList.forEach(data => {
          if(!_.isEmpty(data.imageNews)){
            data.imageUrl = [];
            var base64 = this.convertToBase64(data.imageNews.data)
            this.compressImage(base64, 400, 600).then(compressed400x600 => {
              data.imageUrl = compressed400x600
              // data.imageUrlAsli = base64
            });
          }
         
        })
        console.log("success potensiDesaWisataList ===>",this.potensiDesaWisataList)

      },
      (error: any) => {
        // console.log("error getAllPaketWisata ===>",error)
      }
    );
  }


  public getPaketWisata(){
    this.paketWisataService.getAll().pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (result:any) => {
        // console.log("success getAllPaketWisata ===>",result)
        this.paketWisataList = result
        
        this.paketWisataList.forEach(data => {
          if(!_.isEmpty(data.paketWisataImg)){
            data.imageUrl = [];
            var base64 = this.convertToBase64(data.paketWisataImg.data)
            this.compressImage(base64, 400, 600).then(compressed400x600 => {
              data.imageUrl = compressed400x600
              // data.imageUrlAsli = base64
            });
          }
          data.priceMask = this.currencyFormat(data.price,0)
        })
        this.swiper();
        // console.log("success paketWisataList ===>",this.paketWisataList)
      },
      (error: any) => {
        // console.log("error getAllPaketWisata ===>",error)
      }
    );
  }


  public getFasilitas(){
    this.fasilitasService.getAll().pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (result:any) => {
        // console.log("success getFasilitas ===>",result)
        this.fasilitasList = result
      },
      (error: any) => {
        // console.log("error getFasilitas ===>",error)
      }
    );
  }

  
  public generateMap(googleMapCode){
    // console.log('generate map ===>',googleMapCode);
    $( "#myid" ).remove();
    var e = $(googleMapCode);
    $('#box').append(e);    
    e.attr('id', 'myid');
    $("#myid").removeAttr("width");
    $("#myid").attr("height","350");
    $("#myid").css("width","100%");
    $("#myid").addClass("mt- mb-5");
  }
  
  public downloadImage(){
    this.webPreferencesService.getWebsiteImage().pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (r) =>{
        // console.log('success | downloadImage ==>',r)
        this.webInfo.patchValue({imageUrl : r})
        },
      error =>{
        // console.log('error | downloadImage ==>',error)
      }
    );
  }

  public getWebsiteInfo(){
    this.webPreferencesService.getWebsiteInfo().pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (result:any) => {
        // console.log("success getWebsiteInfo ===>",result)
        this.webInfo.patchValue({
          websiteName : result.websiteName,
          address : result.address,
          mapLocation : result.mapLocation,
          id : result.id,
          imageUrl:null
        })
        this.generateMap(this.webInfo.value.mapLocation)
        this.downloadImage();
      },
      (error: any) => {
        // console.log("error getWebsiteInfo ===>",error)
      }
    );
  }

  public login(){
    this.router.navigate(['/login']);
  }
  public videoButton(){
    // console.log('videbutton click')
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
    // console.log('tehemebuton click')
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


  public navActive(event){


    // console.log('navActive ==>',event);
    
    //scroll to id
    var selectedId = event.target.name
    var el = document.getElementById(selectedId);
    el.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
    
    //highlight selected id
    var elements = []; 
    $("main").find("section").each(function(){ elements.push(this.id); });
    // console.log('elements ===>',elements);
    


    // if(selectedId == 'blog'){
    //   elements.forEach(sectionId => {
    //     var menu = document.getElementById(sectionId)
    //     if(sectionId == 'blog') menu.classList.remove('hidden-element');
    //     else  menu.classList.add('hidden-element');
    //   });
    // }else{
    //   elements.forEach(sectionId => {
    //     var menu = document.getElementById(sectionId)
    //     if(sectionId == 'blog') menu.classList.add('hidden-element');
    //     else menu.classList.remove('hidden-element');
    //   });    
    // }


    

    elements.forEach(sectionId => {
      if(selectedId == sectionId){
        // document.querySelector('.nav__menu a[href*=#' + sectionId + ']').classList.add('active-link');
        $('.nav__menu a[name=' + sectionId + ']').addClass('active-link')
      }else{
        // document.querySelector('.nav__menu a[href*=#' + sectionId + ']').classList.remove('active-link')
        $('.nav__menu a[name=' + sectionId + ']').removeClass('active-link')

      }
    });






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
