import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './../../service/user.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { User } from '../../interface';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  private userData: User = { name: '', email: '' };
  public form!: FormGroup;
  public isCreate: boolean = false;
  public isEdit: boolean = false;


  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.checkUrl();
  }

  public initForm() {
    this.form = this.formBuilder.group({
      id: null,
      userName: [null, Validators.required],
      userEmail: [null, Validators.email]
    });
  }

  public backPage() {
    window.history.back();
  }

  public Salvar() {

    if (this.isCreate) {
      this.userService.createUser(this.form.value).pipe().subscribe(data => {
        console.log(data)
      })
    } else if (this.isEdit) {
      this.userService.
        updateUser(this.form.value.id, this.form.value)
          .pipe()
            .subscribe(data => {
      });
    }
    window.history.back();
  }

  public Cancelar() {
    window.history.back();
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
      userEmail: userData.userEmail
    });
  }
}
