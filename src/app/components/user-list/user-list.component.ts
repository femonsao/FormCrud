import { catchError } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';

import { UserService } from '../../service/user.service';

import { of } from 'rxjs';
import { Router} from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

export class UserListComponent implements OnInit {
  displayedColumns: string[] = ['id','name', 'email' ,'options']
  userData: any;


  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  public getUser() {
    this.userService.getUsers()
    .pipe(
      catchError((e: any) =>
      of(console.log(e)
      )))
      .subscribe((data: any) => {
      return this.userData = data
    });
  }

  public goToNewUser() {
    return this.router.navigateByUrl('user-create');
  }

  public gotToEditUser(userId: number){
    return this.router.navigateByUrl('user-edit/' + userId)
  }

  public deleteUser(userId: number){
    this.userService.deleteUSer(userId).subscribe((data)=>{
      this.getUser();
    })
  }

}

