import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public isCreate: boolean = false;
  public isEdit: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  public backPage(){
    window.history.back();
  }

}
