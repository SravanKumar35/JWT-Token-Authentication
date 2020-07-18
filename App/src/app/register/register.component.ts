import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { MyserviceService } from '../myservice.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  myForm: FormGroup;
  successMessage: String = '';
  constructor(
    private _myservice: MyserviceService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {
    this.myForm = new FormGroup({
      email: new FormControl(null, Validators.email),
      name: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      cnfpass: new FormControl(null, this.passValidator),
    });

    this.myForm.controls.password.valueChanges.subscribe((x) =>
      this.myForm.controls.cnfpass.updateValueAndValidity()
    );
  }

  ngOnInit(): void {}

  isValid(controlName) {
    return (
      this.myForm.get(controlName).invalid &&
      this.myForm.get(controlName).touched
    );
  }

  passValidator(control: AbstractControl) {
    if (control && (control.value !== null || control.value !== undefined)) {
      const cnfpassValue = control.value;

      const passControl = control.root.get('password');
      if (passControl) {
        const passValue = passControl.value;
        if (passValue !== cnfpassValue || passValue === '') {
          return {
            isError: true,
          };
        }
      }
    }

    return null;
  }

  register() {
    console.log(this.myForm.value);

    if (this.myForm.valid) {
      this._myservice.submitRegister(this.myForm.value).subscribe(
        (data) => (this.successMessage = 'Registration Success'),
        (error) => (this.successMessage = 'Some Error')
      );
    }
  }

  moveToLogin() {
    this._router.navigate(['../login'], { relativeTo: this._activatedRoute });
  }
}
