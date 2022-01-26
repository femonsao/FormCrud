import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './../service/user.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { User } from '../interface';

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
  ) {
  }

  ngOnInit(): void {
    this.initForm();
    this.checkUrl();
  }

  public initForm(){
   this.form = this.formBuilder.group({
     userName: [null, Validators.required],
     userEmail: [null, Validators.email]
   });
   console.log('control init', this.form.controls)
  }


  public backPage() {
    window.history.back();
  }
  public Salvar() {

    this.userService.createUser(this.form.value).pipe().subscribe(data => {
      console.log(data)
    })

    window.history.back();
  }
  public Cancelar() {
    window.history.back();
  }

  private checkUrl() {
    if (this.router.url.includes('user-create')) {
      console.log('create');
      this.isCreate = true;
    } else if (this.router.url.includes('user-edit')) {
      console.log('edit')
      const userId = this.route.snapshot.paramMap.get('id');
      this.userService.getUser(userId).subscribe(data => {
        console.log('data' , data)
        this.userData =  data;
        this.populateForm(this.userData);
        this.isEdit = true;
      });
    }
  }

  private populateForm(userData: any) {
    console.log('controls', this.form.controls);
    console.log('populate', userData);
    this.form.patchValue({
      userName: userData.userName,
      userEmail: userData.userEmail
    });
  }
}
