import { Component, OnInit } from '@angular/core';
import { UserAPIService } from './service/user-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'netleaf';
  isLogin = localStorage.getItem('token');
  constructor(private _userAPIService: UserAPIService) { }

  ngOnInit(): void {
    this._userAPIService.isLogin().subscribe((res) => {
      this.isLogin = res ? 'loggedIn' : '';
    })
  }
}
