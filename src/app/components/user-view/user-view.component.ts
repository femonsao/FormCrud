import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { IUser } from 'src/app/interface';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {
  public profilePicture: string = '';
  private userId: any;
  public userData: any = [];


  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    this.activatedRoute.params.subscribe(data => {
      return this.userId = data.id
    });
    this.userData = await this.getUser();
    !this.userData.userPhoto ? this.profilePicture =  './../../../assets/img/user.png' : this.profilePicture = this.userData.userPhoto;


  }

  public getUser(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.userService.getUser(this.userId)
        .pipe(
          catchError((e: any) =>
            of(console.log(e),
              reject(e)
            )))
        .subscribe((data: any) => {
          resolve(
            data
          )
        });
    })
  }

}
