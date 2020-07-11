import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MyserviceService } from '../myservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _myservice: MyserviceService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }

  ngOnInit() {}

  isValid(controlName) {
    return (
      this.loginForm.get(controlName).invalid &&
      this.loginForm.get(controlName).touched
    );
  }

  moveToRegister() {
    this._router.navigate(['../register'], {
      relativeTo: this._activatedRoute,
    });
  }

  login() {
    console.log(this.loginForm.value);
    if (this.loginForm.valid) {
      this._myservice.login(this.loginForm.value).subscribe(
        (data) => {
          console.log(data);
          localStorage.setItem('token', data.toString());
          this._router.navigate(['../dash'])
        },
        (error) => 'invalid Login'
      );
    }
  }
}
