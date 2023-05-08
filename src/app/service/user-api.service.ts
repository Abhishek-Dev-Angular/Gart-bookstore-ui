import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { ILoginDTO } from "../dto/login.dto";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable()
export class UserAPIService {
    private apiURL;
    jwtHelperService = new JwtHelperService();
    constructor(private _http: HttpClient, private _snackBar: MatSnackBar, private route: Router) {
        this.apiURL = environment.gartURL;
    }

    private loginStatus: Subject<boolean> = new Subject();
    updateLoginStatus(value: boolean){
        this.loginStatus.next(value);
    }
    isLogin(): Observable<boolean>{
        return this.loginStatus.asObservable();
    }

    login(userObj: ILoginDTO) {
        return this._http.post(`${this.apiURL}user/login`, userObj, { headers: { skip: "true" } }).subscribe(res => {
            if (res && res['access_token']) {
                localStorage.setItem('token', res['access_token']);
                let token = this.jwtHelperService.decodeToken(res['access_token']);
                localStorage.setItem('userId', token.id);
                this.updateLoginStatus(true);
                this.route.navigateByUrl('book');
                return true;
            }
            return false;
        }, (err) => {
            this.updateLoginStatus(false);
            this._snackBar.open('Internal API error!');
            return false;
        });
    }
}

