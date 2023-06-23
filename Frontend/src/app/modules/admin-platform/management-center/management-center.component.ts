import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-management-center',
  templateUrl: './management-center.component.html',
  styleUrls: ['./management-center.component.scss']
})
export class ManagementCenterComponent {
  constructor(
    public router:Router){}
 
  scrollTop(){
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
});
  }

  logout(){
    localStorage.setItem('Role','Anonim');
    this.router.navigate(['admin']);
   }

}
