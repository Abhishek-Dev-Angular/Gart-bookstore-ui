import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { ILoginDTO } from "../dto/login.dto";
import { IOrderBook, IOrderDTO } from "../dto/order.dto";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class OrderAPIService {
    private apiURL;
    constructor(private _http: HttpClient) {
        this.apiURL = environment.gartURL;
    }

    placeOrder(orderObj: IOrderDTO): Observable<any> {
        return this._http.post(`${this.apiURL}order/placeOrder`, orderObj);
    }

    getAllOrders(): Observable<any> {
        console.log(localStorage.getItem('userId'));
        return this._http.get(`${this.apiURL}order/getAll/${localStorage.getItem('userId')}`);
    }
}
