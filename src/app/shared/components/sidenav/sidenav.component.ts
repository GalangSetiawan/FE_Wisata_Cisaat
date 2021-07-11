import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  listMenu = [
    {
      fontAwesomeIcon : 'fa-home',
      ukIcon : 'thumbnails',
      menuName : 'Dashboard',
      url :'../admin/home'
    },
    {
      fontAwesomeIcon : 'fa-home',
      ukIcon : 'cog',
      menuName : 'Admin',
      url : '../admin/admin'
    },
    {
      fontAwesomeIcon : 'fa-home',
      ukIcon : 'file-edit',
      menuName : 'Berita',
      url : '../admin/berita'
    },
    {
      fontAwesomeIcon : 'fa-home',
      ukIcon : 'file-edit',
      menuName : 'Berita Exclusive',
      url : '../admin/berita-excl'
    },
    {
      fontAwesomeIcon : 'fa-home',
      ukIcon : 'check',
      menuName : 'Website Preferences',
      url : '../admin/web-preferences'
    },
    {
      fontAwesomeIcon : 'fa-home',
      ukIcon : 'check',
      menuName : 'Sejarah Cisaat',
      url : '../admin/sejarah'
    },
    {
      fontAwesomeIcon : 'fa-home',
      ukIcon : 'check',
      menuName : 'Paket Wisata',
      url : '../admin/paket-wisata'
    },
    {
      fontAwesomeIcon : 'fa-home',
      ukIcon : 'check',
      menuName : 'Fasilitas',
      url : '../admin/fasilitas'
    },
    
  ]


}
