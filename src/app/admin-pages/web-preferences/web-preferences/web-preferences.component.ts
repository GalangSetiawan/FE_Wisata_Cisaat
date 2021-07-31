import { Component, OnInit } from '@angular/core';
import { takeUntil, take, find } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenStorageService } from '../../../_services/token-storage.service';
import * as _ from "lodash";
import * as $ from "jquery";
declare var UIkit: any;
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { WebPreferencesService } from 'src/app/_services/web-preferences/web-preferences.service'
import { ContactService } from 'src/app/_services/contact/contact.service'
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-web-preferences',
  templateUrl: './web-preferences.component.html',
  providers: [MessageService],
  styleUrls: ['./web-preferences.component.css']
})
export class WebPreferencesComponent implements OnInit {
  private ngUnsubscribe: Subject<boolean> = new Subject();
  public inputForm: FormGroup;
  public submitted = false;
  public oldImageData:any
  public viewMode = 'general'
  public contactList:any[] = [];
  public modeEdit = false;
  constructor(
    private formBuilder: FormBuilder,
    private tokenStorage: TokenStorageService,
    private contactService : ContactService,
    private messageService: MessageService,
    private webPreferencesService : WebPreferencesService,
    
  ) {
    this.initForm();
   }

  ngOnInit(): void {
    this.patchValue();
  }

  get f() { return this.inputForm.controls; }

  public initForm(){
    this.inputForm =  this.formBuilder.group({
      websiteName     : ['', Validators.required],
      mapLocation     : ['', Validators.required],
      address         : ['', Validators.required],
      websiteImage    : [null],
      websiteImageName: [null],
      imageUrl        : [null],
      id              : [0]
    })
  }

  public onMapChange(data){
    console.log('onMapChange ===>',data);
  }

  public toggleMode(value){
    this.modeEdit = value;
  }

  public getAllContact(){
    this.contactService.getAllContact().pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (r:any) =>{
        console.log('success | getAllContact ==>',r)
        this.contactList = r
        },
      error =>{
        console.log('error | getAllContact ==>',error)
      }
    );
  }
  public generateMap(googleMapCode){
    console.log('generate map ===>',googleMapCode);
    $( "#myid" ).remove();
    var e = $(googleMapCode);
    $('#box').append(e);    
    e.attr('id', 'myid');
    $("#myid").removeAttr("width");
    $("#myid").css("width","100%");
    $("#myid").addClass("mt-5 mb-5");
  }
  
  public downloadImage(){
    this.webPreferencesService.getWebsiteImage().pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (r) =>{
        console.log('success | downloadImage ==>',r)
        this.inputForm.patchValue({imageUrl : r})
        },
      error =>{
        console.log('error | downloadImage ==>',error)
      }
    );
  }

  public patchValue(){
    this.webPreferencesService.getWebsiteInfo().pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (result:any) => {
        console.log("success getWebsiteInfo ===>",result)
        this.inputForm.patchValue({
          websiteName : result.websiteName,
          address : result.address,
          mapLocation : result.mapLocation,
          id : result.id
        })
        this.generateMap(this.inputForm.value.mapLocation)
        this.downloadImage();
      },
      (error: any) => {
        console.log("error getWebsiteInfo ===>",error)
      }
    );
  }


  
  public btnOpenModalUploadImage(){
    this.oldImageData = _.cloneDeep(this.inputForm)
  }

  public btnCancelUpload(){
    this.inputForm.patchValue({
      websiteImage    : this.oldImageData.value.websiteImage,
      websiteImageName: this.oldImageData.value.websiteImageName,
      imageUrl        : this.oldImageData.value.imageUrl
    });
  }

  public onSubmit() {
    this.submitted = true;
    console.log('onSubmit ===>',this.inputForm.invalid,this.inputForm.value)
      if (this.inputForm.invalid) {
          return;
      }else{
        console.log(" updateBerita ===>")
        this.webPreferencesService.updateWebsitePreferences(this.inputForm.value).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
          (result:any) => {
            console.log("success updateBerita ===>",result)
            Swal.fire( 'Yay Success!', 'Berhasil menyimpan data', 'success' )
            this.toggleMode(false);
          },
          (error: any) => {
            console.log("error updateBerita ===>",error)
          }
        );
      }
  }



  clonedProducts:{}= {};

  onRowAddData(){
    var dummyId = 'dummy_' + (new Date()).getTime()
    var addData = {
      id : dummyId,
      nama : '',
      link : '',
      sosialMedia : ''
    }

    this.contactList.push(addData);

    this.onRowEditInit(addData)

  }

  onRowEditInit(data) {
    console.log('onRowEditInit ===>',data)
    this.clonedProducts = _.cloneDeep(data)
  }

  onRowEditSave(data) {
    if(typeof data.id == 'number'){
      this.contactService.updateContact(data.id, data).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
        (result:any) => {
          console.log("success updateBerita ===>",result)
          this.messageService.add({severity:'success', summary: 'Success', detail:'berhasil meyimpan data'});
        },
        (error: any) => {
          console.log("error updateBerita ===>",error)
          this.messageService.add({severity:'error', summary: 'Error', detail:'gagal menyimpan data'});
        }
      );
    }else{
      this.contactService.createContact(data).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
        (result:any) => {
          console.log("success createContact ===>",result)
          this.messageService.add({severity:'success', summary: 'Success', detail:'berhasil menambahkan data'});
          this.getAllContact();
        },
        (error: any) => {
          console.log("error createContact ===>",error)
          this.messageService.add({severity:'error', summary: 'Error', detail:'gagal menambahkan data'});
        }
      );
    }

      



  }

  onRowEditCancel(data, index: number) {
    this.contactList[index] = this.clonedProducts;
  }

  onRowEditDelete(data, index: number) {
    console.log('onRowEditDelete ===>',data)
    if(typeof data.id == 'number'){
      Swal.fire({
        title: "Konfirmasi Hapus Data",
        html: "Apakah kamu yakin menghapus data <b>"+ data.nama +"</b> ?",
        type: 'warning',
        cancelButtonText: 'Batal',
        confirmButtonText: 'OK',
        showCancelButton: true,     
        showConfirmButton: true,
      })
      .then((willDelete) => {
        if(willDelete.value){
          this.contactService.deleteContact(data.id).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
            (result:any) => {
              console.log("success deleteContact ===>",result)
              this.getAllContact();
              this.messageService.add({severity:'success', summary: 'Success', detail:'berhasil menghapus data'});
            },
            (error: any) => {
              console.log("error deleteContact ===>",error)
              this.messageService.add({severity:'error', summary: 'Error', detail:'gagal menghapus data'});
  
            }
          );
        }
      });
    }else{
      // delete this.contactList[index]
      this.contactList = this.contactList.filter(list => list.id != data.id)
    }
  }
  
  



  public handleFileInput(files :FileList){
    console.log('handleFileInput ===>',files)
    this.inputForm.patchValue({
      websiteImage : files,
      websiteImageName : files[0].name
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

}
