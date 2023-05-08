import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent} from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root'
})
export class LoaderService {
	loaderSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    $loader: Observable<boolean>;

    constructor(){
        this.$loader = this.loaderSubject.asObservable();
    }

    triggerLoader(value){
        this.loaderSubject.next(value);
    }

    clearMessage(){
        this.loaderSubject.next(false);
    }
}