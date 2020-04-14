import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ApiService } from '../service/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'user-upsert',
  templateUrl: './upsert.component.html',
  styles: [
    `
      input {
        width: 100%;
        padding: 10px 15px;
        margin: 5px auto;
      }
    `,
  ],
})
export class UserUpsertComponent implements OnInit {
  userForm: FormGroup;
  msg: String = '';
  userId: string;
  submitted = false;
  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.minLength(10),
        ],
      ],
    });
    this.route.params.subscribe((param) => {
      if (param && param.id) {
        this.userId = param.id;
        this.apiService.getUser(param.id).subscribe((res) => {
          let user: any = res.data;
          if (res.data) {
            this.userForm.setValue({
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              mobile: user.mobile,
            });
          } else {
            this.router.navigate(['/']);
          }
        });
      }
    });
  }
  get f() {
    return this.userForm.controls;
  }
  resetForm() {
    this.submitted = false;
    this.userForm.reset();
  }
  onSubmit() {
    this.submitted = true;
    if (this.userForm.valid) {
      let promise;
      if (this.userId === 'new') {
        promise = this.apiService.addUser(this.userForm.value);
      } else {
        promise = this.apiService.updateUser(
          {
            firstName: this.userForm.value.firstName,
            lastName: this.userForm.value.lastName,
            email: this.userForm.value.email,
            mobile: this.userForm.value.mobile,
          },
          this.userId
        );
      }
      promise.subscribe((res: any) => {
        if (res.status === 'S') {
          this.resetForm();
          this.router.navigate(['/']);
        } else {
          console.log(res);
        }
      });
    }
  }
}
