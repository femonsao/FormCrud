import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IUser } from 'src/app/interface';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {

  public profilePicture = "https://avatars.githubusercontent.com/u/46978878?s=400&u=45f70463a23c18b1cc705b7f3499249793f017ad&v=4";
  private userId: any;
  public userData!: any;


  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(data => {
      return this.userId = data.id
    });
    this.getUser();
    console.log(this.userData);
  }

  public getUser() {
    this.userService.getUser(this.userId)
      .pipe(
        catchError((e: any) =>
          of(console.log(e)
          )))
      .subscribe((data: any) => {
        return this.userData = data;
      });
  }

}
