import { Component, OnInit } from '@angular/core';
import { FasilitasService } from 'src/app/_services/fasilitas/fasilitas.service'
import { takeUntil, take } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenStorageService } from '../../../_services/token-storage.service';
import * as _ from "lodash";
import * as $ from "jquery";
declare var UIkit: any;
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-fasilitas',
  templateUrl: './fasilitas.component.html',
  styleUrls: ['./fasilitas.component.css']
})
export class FasilitasComponent implements OnInit {

  public products:any[] = []
  private ngUnsubscribe: Subject<boolean> = new Subject();
  public dataGridList:any[] = []
  public inputForm: FormGroup;
  public currentUser;
  public submitted = false;
  public oldImageData:any

  constructor(
    private fasilitasService:FasilitasService,
    private formBuilder: FormBuilder,
    private tokenStorage: TokenStorageService
  ) { }

  ngOnInit(): void {
    this.getAllFasilitas();
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
    console.log('fasilitasForm ===>',this.inputForm)
  }

  public initForm(){
    this.inputForm =  this.formBuilder.group({
      namaFasilitas: ['', Validators.required],
      icon         : ['', Validators.required],
      deskripsi    : ['', Validators.required],
      userId       : [this.currentUser.id, Validators.required],
      id           : [null]
    })
  }

  getAllFasilitas(){
    this.fasilitasService.getAll().pipe(takeUntil(this.ngUnsubscribe)).subscribe(
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
      html: "Apakah kamu yakin menghapus fasilitas <b>"+ data.namaFasilitas +"</b> ?",
      type: 'warning',
      cancelButtonText: 'Batal',
      confirmButtonText: 'OK',
      showCancelButton: true,     
      showConfirmButton: true,
    })
    .then((willDelete) => {
      if(willDelete.value){
        this.fasilitasService.delete(data.id).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
          (result:any) => {
            console.log("success deleteFasilitas ===>",result)
            this.dataGridList = result;
            this.getAllFasilitas();
            Swal.fire( 'Yay Success!', 'Berhasil menghapus data', 'success' )
          },
          (error: any) => {
            console.log("error deleteFasilitas ===>",error)
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
          console.log(" postFasilitas ===>")
          this.fasilitasService.create(this.inputForm.value).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
            (result:any) => {
              console.log("success postFasilitas ===>",result)
              this.dataGridList = result;
              this.getAllFasilitas();
              this.onBatalTambahClick();
              Swal.fire( 'Yay Success!', 'Berhasil menambahkan data', 'success' )
              UIkit.modal('#modal-form').hide();

            },
            (error: any) => {
              console.log("error postFasilitas ===>",error)
            }
          );
        }else{ //do update
          console.log(" update ===>")
          this.fasilitasService.update(this.inputForm.value.id,this.inputForm.value).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
            (result:any) => {
              console.log("success update ===>",result)
              this.dataGridList = result;
              this.getAllFasilitas();
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
    UIkit.modal('#previewFasilitas').toggle(); 
  }

  onEditRow(data){
    this.inputForm.patchValue({
      namaFasilitas: data.namaFasilitas,
      icon         : data.icon,
      deskripsi    : data.deskripsi,
      userId       : data.userId,
      id           : data.id,
    })
  }



}
