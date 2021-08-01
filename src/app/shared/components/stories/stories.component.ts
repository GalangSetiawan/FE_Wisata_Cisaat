import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { BeritaExclService } from 'src/app/_services/berita-excl/berita-excl.service'
import { takeUntil, filter } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

import {
  Router,
  // import as RouterEvent to avoid confusion with the DOM Event
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router'

import * as _ from 'lodash'
import * as $ from 'jquery'
@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.css']
})
export class StoriesComponent implements OnInit {
  public loading = true
  public slug;
  public beritaTop5:any[] = [];
  public berita;
  private ngUnsubscribe: Subject<boolean> = new Subject();

  constructor(
    private activatedRoute: ActivatedRoute,
    private beritaExclService:BeritaExclService,
    private domSanitizer:DomSanitizer,

    private router: Router,

    ) {
      router.events.subscribe((event: RouterEvent) => {
        this.navigationInterceptor(event)
      })
    }

  ngOnInit(): void {
    $('.nav__menu a[name=history]').addClass('active-link')

    const events =  this.router.events. pipe(filter(event=>event instanceof NavigationEnd));
    events.subscribe((e:NavigationEnd)=>{
      console.log('apanih ====>',e.urlAfterRedirects)

      if(e.urlAfterRedirects == '/story/all'){
        this.slug = 'all'
      }
    })
  
    this.slug = this.activatedRoute.snapshot.paramMap.get('slug')
    console.log('slug ===>',this.slug)
    
    this.getBeritaTop5();

    if(this.slug != 'all'){
      this.getBeritaBySlug(this.slug);
    }
  }


  public navigationInterceptor(event: RouterEvent): void {
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


  public getBeritaBySlug(slug){
    this.loading = true
    this.beritaExclService.getBeritaBySlug(slug).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (result:any) => {
        console.log("success getBeritaBySlug ===>",result)
        this.berita = result;
        if(!_.isEmpty(this.berita.imageNews)){
          var base64 = this.convertToBase64(this.berita.imageNews.data)
          this.compressImage(base64, 400, 600).then(compressed400x600 => {
            this.berita.imageUrl = compressed400x600
            this.berita.imageUrlAsli = base64
          });
        }
        
        this.loading = false

      },
      (error: any) => {
        console.log("error getBeritaBySlug ===>",error)
      }
    );
  }

  public gotoSelectedBerita(event){
    console.log('gotoSelectedBerita ===>',event.target.name);
    this.slug = event.target.name;
    this.getBeritaBySlug(this.slug);
    
  }

  public getBeritaTop5(){
    this.loading = true
    this.beritaExclService.getTop5().pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (result:any) => {
        console.log("success getBeritaTop5 ===>",result)
        this.beritaTop5 = result;

        this.beritaTop5.forEach(data => {
         if(!_.isEmpty(data.imageNews)){
          data.imageUrl = [];
          var base64 = this.convertToBase64(data.imageNews.data)
          this.compressImage(base64, 400, 600).then(compressed400x600 => {
            data.imageUrl = compressed400x600
            data.imageUrlAsli = base64
          });
         }
        })
        this.loading = false

      },
      (error: any) => {
        console.log("error getBeritaTop5 ===>",error)
      }
    );
  }

  private compressImage(src: string, maxWidth: number, maxHeight: number) {
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

}
