import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/operators';
import { BookAPIService } from 'src/app/service/book-api.service';

@Component({
    selector: 'app-cart-drawer',
    templateUrl: './cart-drawer.component.html',
    styleUrls: ['./cart-drawer.component.scss']
})

export class CartDrawerComponent implements OnInit, OnDestroy {
    cartItems = [];
    ngUnsubscribe: any;
    constructor(private _bottomSheetRef: MatBottomSheetRef<CartDrawerComponent>, private _bookAPIService: BookAPIService, private _router: Router) { }

    ngOnInit(): void {
        this.ngUnsubscribe = new Subject();
        this.getCurrentCart();
    }

    checkout(event) {
        this._bottomSheetRef.dismiss();
        event.preventDefault();
        this._router.navigateByUrl('checkout');
    }

    getCurrentCart() {
        this._bookAPIService.getCurrentCart().pipe(takeUntil(this.ngUnsubscribe)).subscribe(cartItems => {
            if (cartItems && cartItems.length > 0) {
                this.cartItems = cartItems;
            }
        })
    }

    remove(id: string) {
        this.cartItems.forEach(x => {
            if (x._id === id) {
                x.count--;
            }
        });
        this._bookAPIService.updateCurrentCart([...this.cartItems]);
    }
    add(id: string) {
        this.cartItems.forEach(x => {
            if (x._id === id) {
                x.count++;
            }
        })
        this._bookAPIService.updateCurrentCart([...this.cartItems]);
    }
    delete(id: string) {
        for (let i = 0; i < this.cartItems.length; i++) {
            if (this.cartItems[i]._id === id) {
                this.cartItems.splice(i, 1);
                break;
            }
        }
        this._bookAPIService.updateCurrentCart([...this.cartItems]);
    }

    ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}