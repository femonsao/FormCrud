import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './../../service/user.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { IUser } from '../../interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  private userData: IUser | undefined;
  public form!: FormGroup;
  public isCreate: boolean = false;
  public isEdit: boolean = false;
  private fotoData: any;


  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.checkUrl();
  }

  public initForm() {
    this.form = this.formBuilder.group({
      id: null,
      userName: [null, Validators.required],
      gitHubUrl: null,
      country: null,
      state: null,
      city: null,
      phone: null,
      userEmail: [null, Validators.email],
      userPhoto: null
    });
  }

  public async getPhoto(photoEvent: any) {
    const file = photoEvent.target.files[0]
    this.fotoData = await this.convertToBase64(file);
    console.log(this.fotoData)
  }

  private convertToBase64(photoFile: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(photoFile)
      reader.onload = () => resolve(reader.result)
      reader.onerror = error => reject(error)
    });
  }

  public goToList() {
    this.router.navigateByUrl('')
  }

  public save() {
    const data = {
      userName: this.form?.get('userName')?.value,
      gitHubUrl: this.form.get('gitHubUrl')?.value,
      country: this.form.get('')?.value,
      state: this.form.get('')?.value,
      city: this.form.get('')?.value,
      phone: this.form.get('phone')?.value,
      userEmail: this.form.get('userEmail')?.value,
      userPhoto:  this.fotoData

    }
    this.isCreate ? this.create(data) :  this.edit(data);
    this.goToList();
  }

  private create(data: any) {
    this.userService.createUser(data)
      .pipe(
        catchError(() => {
          this.snackBar
            .open('Erro ao atualizar usuário!', 'x', {
              panelClass: ['error-snack'],
              horizontalPosition: 'right'
            })
          return of();
        }))
      .subscribe(() => {
        this.snackBar.open('Usuário criado com sucesso!', 'x', {
          panelClass: ['sucess-snack'],
          horizontalPosition: 'right'
        });
      });
  }

  private edit(data: any) {
    console.log(data);
    this.userService.
      updateUser(this.form.value.id, data)
      .pipe(
        catchError(() => {
          this.snackBar
            .open('Erro ao atualizar usuário!', 'x', {
              panelClass: ['error-snack'],
              horizontalPosition: 'right'
            })
          return of();
        }))
      .subscribe(() => {
        this.snackBar.open('Usuário atualizado com sucesso!', 'x', {
          panelClass: ['sucess-snack'],
          horizontalPosition: 'right'
        });
      });
  }

  private checkUrl() {
    if (this.router.url.includes('user-create')) {
      this.isCreate = true;
    } else if (this.router.url.includes('user-edit')) {
      const userId = this.route.snapshot.paramMap.get('id');
      this.userService.getUser(userId).subscribe(data => {
        this.userData = data;
        this.populateForm(this.userData);
        this.isEdit = true;
      });
    }
  }

  private populateForm(userData: any) {
    this.form.patchValue({
      id: userData?.id,
      userName: userData.userName,
      userEmail: userData.userEmail,
      gitHubUrl: userData?.gitHubUrl,
      phone: userData?.phone,
      country: userData?.country,
      city: userData?.photo,
      state: userData?.state,
      userPhoto: userData?.userPhoto,
    });
  }
}
