import { Component, OnInit } from '@angular/core';
import { SejarahService } from 'src/app/_services/sejarah/sejarah.service'
import { takeUntil, take } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenStorageService } from '../../../_services/token-storage.service';
import * as _ from "lodash";
import * as $ from "jquery";
declare var UIkit: any;
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-sejarah',
  templateUrl: './sejarah.component.html',
  styleUrls: ['./sejarah.component.css']
})
export class SejarahComponent implements OnInit {

  public products:any[] = []
  private ngUnsubscribe: Subject<boolean> = new Subject();
  public dataGridList:any[] = []
  public inputForm: FormGroup;
  public currentUser;
  public submitted = false;
  public oldImageData:any

  constructor(
    private sejarahService:SejarahService,
    private formBuilder: FormBuilder,
    private tokenStorage: TokenStorageService
  ) { }

  ngOnInit(): void {
    this.getAllSejarah();
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
    console.log('sejarahForm ===>',this.inputForm)
  }

  public initForm(){
    this.inputForm =  this.formBuilder.group({
      tahun        : ['', Validators.required],
      kejadianBaik : [null],
      kejadianBuruk: [null],
      id           : [null]
    })
  }

  getAllSejarah(){
    this.sejarahService.getAll().pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (result:any) => {
        console.log("success getAll ===>",result)
        this.dataGridList = result
      },
      (error: any) => {
        console.log("error getAll ===>",error)
      }
    );
  }


  onDeleteRow(data){
    console.log('onDeleteRow ===>',data)

    Swal.fire({
      title: "Konfirmasi Hapus Data",
      html: "Apakah kamu yakin menghapus sejarah <b>"+ data.title +"</b> ?",
      type: 'warning',
      cancelButtonText: 'Batal',
      confirmButtonText: 'OK',
      showCancelButton: true,     
      showConfirmButton: true,
    })
    .then((willDelete) => {
      if(willDelete.value){
        this.sejarahService.delete(data.id).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
          (result:any) => {
            console.log("success deleteSejarah ===>",result)
            this.dataGridList = result;
            this.getAllSejarah();
            Swal.fire( 'Yay Success!', 'Berhasil menghapus data', 'success' )
          },
          (error: any) => {
            console.log("error deleteSejarah ===>",error)
            Swal.fire( 'Whoops Gagal!', 'Tidak berhasil menghapus data', 'error' )

          }
        );
      }
    });


  }

  onSubmit() {
    this.submitted = true;
    this.inputForm.patchValue({ userId:this.currentUser.id })
    console.log('onSubmit ===>',this.inputForm.invalid,this.inputForm.value)
      if (this.inputForm.invalid) {
          return;
      }else{
        if(this.inputForm.value.id == null){ // do save
          console.log(" postSejarah ===>")
          this.sejarahService.create(this.inputForm.value).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
            (result:any) => {
              console.log("success postSejarah ===>",result)
              this.dataGridList = result;
              this.getAllSejarah();
              this.onBatalTambahClick();
              Swal.fire( 'Yay Success!', 'Berhasil menambahkan data', 'success' )
              UIkit.modal('#modal-form').hide();

            },
            (error: any) => {
              console.log("error postSejarah ===>",error)
            }
          );
        }else{ //do update
          console.log(" update ===>")
          this.sejarahService.update(this.inputForm.value.id,this.inputForm.value).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
            (result:any) => {
              console.log("success update ===>",result)
              this.dataGridList = result;
              this.getAllSejarah();
              this.onBatalTambahClick();
              Swal.fire( 'Yay Success!', 'Berhasil menyimpan data', 'success' )
              UIkit.modal('#modal-form').hide();

            },
            (error: any) => {
              console.log("error update ===>",error)
            }
          );
        }
      }
  }

  onReset() {
    this.submitted = false;
    this.inputForm.reset();
  }

  onTambahClick(){
    this.onReset();
  }

  onBatalTambahClick(){
    this.onReset();
  }
  
  onViewRow(data){
    this.onEditRow(data);
    UIkit.modal('#previewSejarah').toggle(); 
  }

  onEditRow(data){
    this.inputForm.patchValue({
      tahun        : data.tahun,
      kejadianBaik : data.kejadianBaik,
      kejadianBuruk: data.kejadianBuruk,
      id           : data.id,
    })
  }



}
