import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { ILoginDTO } from "../dto/login.dto";

@Injectable()
export class BookAPIService {
    private apiURL;
    constructor(private _http: HttpClient) {
        this.apiURL = environment.gartURL;
    }

    currentCart: BehaviorSubject<Array<any>> = new BehaviorSubject([]);
    updateCurrentCart(currentCart: Array<any>){
        this.currentCart.next(currentCart);
    }

    getCurrentCart(): Observable<any>{
        return this.currentCart.asObservable();
    }

    getAllBooks(reqObj): Observable<any> {
        return this._http.post(`${this.apiURL}book/getAll`, reqObj);
    }
}

