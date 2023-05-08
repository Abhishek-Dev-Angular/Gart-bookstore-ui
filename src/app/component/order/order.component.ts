import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subject, takeUntil } from "rxjs";
import { Observable } from "rxjs/internal/Observable";
import { OrderAPIService } from "src/app/service/order-api.service";

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.scss']
})

export class OrderComponent implements OnInit, OnDestroy {
    orderList: any = [];
    ngUnsubscribe: any;
    displayedColumns: string[] = ['image', 'title', 'author', 'count', 'price', 'total'];
    constructor(private _orderAPIService: OrderAPIService) { }
    ngOnInit(): void {
        this.ngUnsubscribe = new Subject();
        this.getAllOrders();
    }

    getAllOrders(): void {
        this._orderAPIService.getAllOrders().pipe(takeUntil(this.ngUnsubscribe)).subscribe(orders => {
            for(let i = 0; i < orders.length; i++){
                for(let j = 0; j < orders[i].books.length; j++){
                    orders[i].booksArray.forEach((x, index)=>{
                        if(orders[i].books[j].book == x._id){
                            orders[i].booksArray[index]['quantity'] = orders[i].books[j].quantity
                        }
                    })
                }
            }
            this.orderList = orders;
        })
    }


    ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}