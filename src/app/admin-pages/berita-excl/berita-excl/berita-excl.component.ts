import { Component, OnInit } from '@angular/core';
import { BeritaExclService } from 'src/app/_services/berita-excl/berita-excl.service'
import { takeUntil, take } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenStorageService } from '../../../_services/token-storage.service';
import * as _ from "lodash";
import * as $ from "jquery";
declare var UIkit: any;
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-berita-excl',
  templateUrl: './berita-excl.component.html',
  styleUrls: ['./berita-excl.component.css']
})
export class BeritaExclComponent implements OnInit {

  public products:any[] = []
  private ngUnsubscribe: Subject<boolean> = new Subject();
  public dataGridList:any[] = []
  public beritaForm: FormGroup;
  public currentUser;
  public submitted = false;
  public oldImageData:any
  public kategoriPost:any[] = [];

  constructor(
    private beritaExclService:BeritaExclService,
    private formBuilder: FormBuilder,
    private tokenStorage: TokenStorageService
  ) {
    this.kategoriPost = [
      {name: 'Sejarah', value:'sejarah'},
      {name: 'Umum', value:'umum'},
      {name: 'Kalender Event', value:'kalender-event'},
      {name: 'Potensi Desa Wisata', value:'potensi-desa-wisata'},
      {name: 'Daya Tarik', value:'daya-tarik'},
      {name: 'Bentang Alam', value:'bentang-alam'},
      {name: 'Budaya', value:'budaya'},
      {name: 'Papais', value:'papais'},
      {name: 'Cisaat', value:'cisaat'},
    ]

   }

  ngOnInit(): void {
    this.getAllBerita();
    this.getUser();
    this.initForm();
  }

  get f() { return this.beritaForm.controls; }

  public getUser(){
    if (this.tokenStorage.getToken()) {
      this.currentUser = this.tokenStorage.getUser();
      console.log('this.currentUser ===>',this.currentUser)
    }else{
      console.log('kamu tidak memiliki akses',this.currentUser)
    }
  }

  public getFormValue(){
    console.log('beritaForm ===>',this.beritaForm)
  }

  public initForm(){
    this.beritaForm =  this.formBuilder.group({
      title    : ['', Validators.required],
      likes    : [null],
      news     : ['', Validators.required],
      groups   : [null],
      userId   : [this.currentUser.id, Validators.required],
      imageNews: [null],
      imageName: [null],
      imageUrl : [null],
      id       : [null]
    })
  }

  getAllBerita(){
    this.beritaExclService.getAll().pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (result:any) => {
        console.log("success getAllBerita ===>",result)
        this.dataGridList = result
      },
      (error: any) => {
        console.log("error getAllBerita ===>",error)
      }
    );
  }

  btnCancelUpload(){
    this.beritaForm.patchValue({
      imageNews : this.oldImageData.value.imageNews,
      imageName : this.oldImageData.value.imageName,
      imageUrl : this.oldImageData.value.imageUrl
    });
  }


  btnOpenModalUploadImage(){
    this.oldImageData = _.cloneDeep(this.beritaForm)
  }

  handleFileInput(files :FileList){
    console.log('handleFileInput ===>',files)
    this.beritaForm.patchValue({
      imageNews : files,
      imageName : files[0].name
    });
    
    console.log('handleFileInput |  this.beritaForm ===>',this.beritaForm)

    var fileToUpload = files.item(0)
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.beritaForm.patchValue({
        imageUrl : event.target.result
      })
    }
    reader.readAsDataURL(fileToUpload);
    console.log('handleFileInput |  this.imageUrl ===>',this.beritaForm.value.imageUrl)

  }

  onDeleteRow(data){
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
        this.beritaExclService.delete(data.id).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
          (result:any) => {
            console.log("success deleteBerita ===>",result)
            this.dataGridList = result;
            this.getAllBerita();
            Swal.fire( 'Yay Success!', 'Berhasil menghapus data', 'success' )
          },
          (error: any) => {
            console.log("error deleteBerita ===>",error)
            Swal.fire( 'Whoops Gagal!', 'Tidak berhasil menghapus data', 'error' )

          }
        );
      }
    });


  }

  onSubmit() {
    this.submitted = true;
    this.beritaForm.patchValue({ userId:this.currentUser.id })
    console.log('onSubmit ===>',this.beritaForm.invalid,this.beritaForm.value)
      if (this.beritaForm.invalid) {
          return;
      }else{
        if(this.beritaForm.value.id == null){ // do save
          console.log(" postBerita ===>")
          this.beritaExclService.create(this.beritaForm.value).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
            (result:any) => {
              console.log("success postBerita ===>",result)
              this.dataGridList = result;
              this.getAllBerita();
              this.onBatalTambahClick();
              Swal.fire( 'Yay Success!', 'Berhasil menambahkan data', 'success' )
              UIkit.modal('#modal-form').hide();

            },
            (error: any) => {
              console.log("error postBerita ===>",error)
            }
          );
        }else{ //do update
          console.log(" updateBerita ===>")
          this.beritaExclService.update(this.beritaForm.value).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
            (result:any) => {
              console.log("success updateBerita ===>",result)
              this.dataGridList = result;
              this.getAllBerita();
              this.onBatalTambahClick();
              Swal.fire( 'Yay Success!', 'Berhasil menyimpan data', 'success' )
              UIkit.modal('#modal-form').hide();

            },
            (error: any) => {
              console.log("error updateBerita ===>",error)
            }
          );
        }
      }
  }

  onReset() {
    this.submitted = false;
    this.beritaForm.reset();
  }

  onTambahClick(){
    this.onReset();
  }

  onBatalTambahClick(){
    this.onReset();
  }
  
  onViewRow(data){
    this.onEditRow(data);
    UIkit.modal('#previewBerita').toggle(); 

  }

  onEditRow(data){
    this.beritaForm.patchValue({
      title : data.title,
      news  : data.news,
      id    : data.id,
      groups  : data.groups,
      userId: this.currentUser.id,
      updatedAt: this.currentUser.updatedAt,
      createdAt: this.currentUser.createdAt,
    })

    this.downloadImage(data.id);
  }

  public downloadImage(imgId){
    this.beritaExclService.getImgById(imgId).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (r) =>{
        console.log('success | downloadImage ==>',r)
        this.beritaForm.patchValue({imageUrl : r})
        },
      error =>{
        console.log('error | downloadImage ==>',error)
      }
    );
  }


}
