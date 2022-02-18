import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  id: any;
  user: User = new User();

  constructor(private _httpClient: HttpClient, private _userService: UserService) { }

  ngOnInit(): void {

    this.id = localStorage.getItem('id');
    console.log(this.id);

    this._userService.getUserById(this.id).subscribe(result => {
      this.user = result;
      //console.log(this.user);
    }, error => {
      console.log(error);
    })

  }

}
