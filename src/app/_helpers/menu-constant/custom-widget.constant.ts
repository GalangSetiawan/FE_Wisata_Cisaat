export class menuConstant {

  public static readonly listMenu = [
    {
      fontAwesomeIcon : 'fa-home',
      menuName : 'Dashboard',
      url :'../admin/home',
      urlPrefix: 'home',
    },
    {
      fontAwesomeIcon : 'fa-home',
      menuName : 'Admin',
      url : '../admin/admin',
      urlPrefix: 'admin',
    },
    {
      fontAwesomeIcon : 'fa-newspaper-o',
      menuName : 'Berita',
      url : '../admin/berita',
      urlPrefix: 'berita',
    },
    {
      fontAwesomeIcon : 'fa-file-text-o',
      menuName : 'Post Exclusive',
      url : '../admin/post-excl',
      urlPrefix: 'post-excl',
    },
    {
      fontAwesomeIcon : 'fa-cogs',
      menuName : 'Website Preferences',
      url : '../admin/web-preferences',
      urlPrefix: 'web-preferences',
    },
    {
      fontAwesomeIcon : 'fa-history',
      menuName : 'Sejarah Cisaat',
      url : '../admin/sejarah',
      urlPrefix: 'sejarah',
    },
    {
      fontAwesomeIcon : 'fa-ticket',
      menuName : 'Paket Wisata',
      url : '../admin/paket-wisata',
      urlPrefix: 'paket-wisata',
    },
    {
      fontAwesomeIcon : 'fa-cubes',
      menuName : 'Fasilitas',
      url : '../admin/fasilitas',
      urlPrefix: 'fasilitas',
    },
  ]
  public static getValues(): any[] {
    return menuConstant.listMenu
  }
}