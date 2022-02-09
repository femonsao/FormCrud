import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public isCreate: boolean = false;
  public isEdit: boolean = false;

  constructor(
    private route: Router,
  ) { }

  ngOnInit(): void {
   this.checkActualRoute()
  }

  public backPage(){
    this.route.navigateByUrl('');
  }

  public checkActualRoute(){
    if (this.route.url.includes('create')){
      this.isCreate = true;
      this.isEdit = false;
    }else if (this.route.url.includes('edit')){
      this.isCreate = false;
      this.isEdit = true;
    }else{
      this.isCreate = false;
      this.isEdit = false;
    }
  }

}
