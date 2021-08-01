import { Component, OnInit } from '@angular/core';
declare var Swiper:any 
declare var ScrollReveal:any 

import { PaketWisataService } from 'src/app/_services/paket-wisata/paket-wisata.service'
import { takeUntil, take } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenStorageService } from '../../../_services/token-storage.service';
import * as _ from "lodash";
import * as $ from "jquery";
declare var UIkit: any;
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-paket-wisata',
  templateUrl: './paket-wisata.component.html',
  styleUrls: ['./paket-wisata.component.css']
})
export class PaketWisataComponent implements OnInit {

  public products:any[] = []
  private ngUnsubscribe: Subject<boolean> = new Subject();
  public dataGridList:any[] = []
  public inputForm: FormGroup;
  public currentUser;
  public submitted = false;
  public oldImageData:any
  public popupVisible: boolean;

  public toolbarButtonOptions :any = {
      text: 'Show markup',
      stylingMode: 'text',
      onClick: () => this.popupVisible = true
  };

  constructor(
    private paketWisataService:PaketWisataService,
    private formBuilder: FormBuilder,
    private tokenStorage: TokenStorageService,
    private domSanitizer:DomSanitizer
  ) { }

  ngOnInit(): void {
    this.getAllPaketWisata();
    this.getUser();
    this.initForm();
  }


  get f() { return this.inputForm.controls; }


  public getUser(){
    if (this.tokenStorage.getToken()) {
      this.currentUser = this.tokenStorage.getUser();
      console.log('this.currentUser ===>',this.currentUser)
    }else{
      console.log('kamu tidak memiliki akses',this.currentUser)
    }
  }

  public getFormValue(){
    console.log('inputForm ===>',this.inputForm)
  }

  public initForm(){
    this.inputForm =  this.formBuilder.group({
      id                : [null],
      title             : ['', Validators.required],
      description       : ['', Validators.required],
      time              : ['', Validators.required],
      price             : ['', Validators.required],
      priceMask         : null,
      userId            : [this.currentUser.id, Validators.required],
      paketWisataImg    : [null],
      paketWisataImgName: [null],
      imageUrl          : [null],
    })
  }

  public getAllPaketWisata(){
    this.paketWisataService.getAll().pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (result:any) => {
        console.log("success getAllPaketWisata ===>",result)
        this.dataGridList = result
        
        this.dataGridList.forEach(data => {
          data.imageUrl = [];
          var base64 = this.convertToBase64(data.paketWisataImg.data)
          this.compressImage(base64, 400, 600).then(compressed400x600 => {
            data.imageUrl = compressed400x600
            data.imageUrlAsli = base64
          });


          data.priceMask = this.currencyFormat(data.price,0)


        })
        this.swiper();
        console.log("success dataGridList ===>",this.dataGridList)

      },
      (error: any) => {
        console.log("error getAllPaketWisata ===>",error)
      }
    );
  }

  public currencyFormat(num,digits){
      const lookup = [
        { value: 1, symbol: "" },
        { value: 1e3, symbol: "k" },
        { value: 1e6, symbol: "M" },
        { value: 1e9, symbol: "G" },
        { value: 1e12, symbol: "T" },
        { value: 1e15, symbol: "P" },
        { value: 1e18, symbol: "E" }
      ];
      const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
      var item = lookup.slice().reverse().find(function(item) {
        return num >= item.value;
      });
      return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
  }

  public btnCancelUpload(){
    this.inputForm.patchValue({
      paketWisataImg : this.oldImageData.value.paketWisataImg,
      paketWisataImgName : this.oldImageData.value.paketWisataImgName,
      imageUrl : this.oldImageData.value.imageUrl
    });
  }


  public btnOpenModalUploadImage(){
    this.oldImageData = _.cloneDeep(this.inputForm)
  }

  public handleFileInput(files :FileList){
    console.log('handleFileInput ===>',files)
    this.inputForm.patchValue({
      paketWisataImg : files,
      paketWisataImgName : files[0].name
    });
    
    console.log('handleFileInput |  this.inputForm ===>',this.inputForm)

    var fileToUpload = files.item(0)
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.inputForm.patchValue({
        imageUrl : event.target.result
      })
    }
    reader.readAsDataURL(fileToUpload);
    console.log('handleFileInput |  this.imageUrl ===>',this.inputForm.value.imageUrl)

  }

  public onDeleteRow(data){
    console.log('onDeleteRow ===>',data)

    Swal.fire({
      title: "Konfirmasi Hapus Data",
      html: "Apakah kamu yakin menghapus berita <b>"+ data.title +"</b> ?",
      type: 'warning',
      cancelButtonText: 'Batal',
      confirmButtonText: 'OK',
      showCancelButton: true,     
      showConfirmButton: true,
    })
    .then((willDelete) => {
      if(willDelete.value){
        this.paketWisataService.delete(data.id).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
          (result:any) => {
            console.log("success deletePaketWisata ===>",result)
            this.dataGridList = result;
            this.getAllPaketWisata();
            Swal.fire( 'Yay Success!', 'Berhasil menghapus data', 'success' )
          },
          (error: any) => {
            console.log("error deletePaketWisata ===>",error)
            Swal.fire( 'Whoops Gagal!', 'Tidak berhasil menghapus data', 'error' )

          }
        );
      }
    });


  }

  public onSubmit() {
    this.submitted = true;
    this.inputForm.patchValue({ userId:this.currentUser.id })
    console.log('onSubmit ===>',this.inputForm.invalid,this.inputForm.value)
      if (this.inputForm.invalid) {
          return;
      }else{
        if(this.inputForm.value.id == null){ // do save
          console.log(" postPaketWisata ===>")
          this.paketWisataService.create(this.inputForm.value).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
            (result:any) => {
              console.log("success postPaketWisata ===>",result)
              this.dataGridList = result;
              this.getAllPaketWisata();
              this.onBatalTambahClick();
              Swal.fire( 'Yay Success!', 'Berhasil menambahkan data', 'success' )
              UIkit.modal('#modal-form-paketwisata').hide();
              this.swiper();

            },
            (error: any) => {
              console.log("error postPaketWisata ===>",error)
            }
          );
        }else{ //do update
          console.log(" updatePaketWisata ===>")
          this.paketWisataService.update(this.inputForm.value).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
            (result:any) => {
              console.log("success updatePaketWisata ===>",result)
              this.dataGridList = result;
              this.getAllPaketWisata();
              this.onBatalTambahClick();
              Swal.fire( 'Yay Success!', 'Berhasil menyimpan data', 'success' )
              UIkit.modal('#modal-form-paketwisata').hide();
              this.swiper();
            },
            (error: any) => {
              console.log("error updatePaketWisata ===>",error)
            }
          );
        }
      }
  }

  public onReset() {
    this.submitted = false;
    this.inputForm.reset();
  }

  public onTambahClick(){
    this.onReset();
  }

  public onBatalTambahClick(){
    this.onReset();
  }
  
  public onViewRow(data){
    this.onEditRow(data);
    UIkit.modal('#previewPaketWisata').toggle(); 

  }

  public onEditRow(data){
    console.log('onEditRow ===>',data)
    this.inputForm.patchValue({
      title      : data.title,
      description: data.description,
      id         : data.id,
      price      : data.price,
      time       : data.time,
      userId     : data.userId,
      updatedAt  : data.updatedAt,
      createdAt  : data.createdAt,
      imageUrl   : this.convertToBase64(data.paketWisataImg.data)
    })
    console.log('onEditRow inputForm ===>',this.inputForm.value)

    // this.downloadImage(data.id);
  }


  private convertToBase64(data) {
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

  public downloadImage(imgId){
    this.paketWisataService.getImgById(imgId).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (r) =>{
        console.log('success | downloadImage ==>',r)
        this.inputForm.patchValue({imageUrl : r})
        },
      error =>{
        console.log('error | downloadImage ==>',error)
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
