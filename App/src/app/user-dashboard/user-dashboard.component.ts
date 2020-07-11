import { Component, OnInit } from '@angular/core';
import { MyserviceService } from '../myservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {

  username= '';
  constructor(private _myservice: MyserviceService, private _router: Router) {
    if(localStorage.getItem('token')==null){
      this._router.navigate(['/main/login'])
    }

    this._myservice.getUserName().subscribe(
      data => this.username = data.toString(),
      error => this._router.navigate(['/main/login'])
    )
  }

  ngOnInit(): void {
  }

  logout(){
    localStorage.removeItem('token')

  }

}
