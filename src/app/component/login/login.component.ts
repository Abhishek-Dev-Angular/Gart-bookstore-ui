import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ILoginDTO } from '../../dto/login.dto';
import { UserAPIService } from '../../service/user-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userForm: FormGroup;
  constructor(private _userAPIService: UserAPIService) {
  }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      userEmail: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  userSubmit() {
    if (this.userForm.valid) {
      let userObj: ILoginDTO = this.userForm.getRawValue();
      this._userAPIService.login(userObj);
    }
  }

}
