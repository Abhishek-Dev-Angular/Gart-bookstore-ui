import { Component, OnDestroy, OnInit} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { IOrderBook, IOrderDTO } from 'src/app/dto/order.dto';
import { BookAPIService } from 'src/app/service/book-api.service';
import { OrderAPIService } from 'src/app/service/order-api.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})

export class CheckoutComponent implements OnInit, OnDestroy {
    cartItems = [];
    isLinear = true;
    cardTypes = ['Debit Card', 'Credit Card'];
    displayedColumns: string[] = ['image', 'title', 'author', 'count', 'price', 'total'];
    firstFormGroup = this._formBuilder.group({
      CardType: ['Debit Card', Validators.required],
      CardNumber: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(16)]],
      CardCVV: ['', [Validators.required, Validators.min(100), Validators.max(999)]],
      CardExpMonth: ['', [Validators.required, Validators.min(1), Validators.max(12)]],
      CardExpYear: ['', [Validators.required, Validators.min(23), Validators.max(30)]],
    });
    ngUnsubscribe: any;
    constructor( private _bookAPIService: BookAPIService, private _orderAPIService: OrderAPIService, private _formBuilder: FormBuilder,
      private _snackBar: MatSnackBar, private _router: Router){}
  
    ngOnInit(): void {
        this.ngUnsubscribe = new Subject();
        this.getCurrentCart();
        this.subscribeForm();
    }

    getCurrentCart(){
        this._bookAPIService.getCurrentCart().pipe(takeUntil(this.ngUnsubscribe)).subscribe(cartItems=>{
          if(cartItems && cartItems.length> 0){
            this.cartItems = cartItems;
          }
        })
      }

      getTotalCost(){
        return this.cartItems.map(t => t.price*t.count).reduce((acc, value) => acc + value, 0);
      }
    subscribeForm(){
      this.firstFormGroup.controls['CardNumber'].valueChanges.pipe(debounceTime(500)).subscribe(card=>{
        let str;
        if(card){
          str = card.replace(/\s\s+/g, ' ');
          str = str.replace(/[^0-9 ]/g, '');
          this.firstFormGroup.controls['CardNumber'].setValue(str.trim());
        }
      })
    }

    createOrder(){
      // Commented, As we are not storing card values
      // const formvalues = this.firstFormGroup.getRawValue()
      let orderObj: IOrderDTO = {
        owner: localStorage.getItem('userId'),
        totalPrice: this.getTotalCost(),
        books: []
      };
      this.cartItems.forEach(x=>{
        orderObj.books.push({book: x._id, quantity: x.count})
      })
      this._orderAPIService.placeOrder(orderObj).pipe(takeUntil(this.ngUnsubscribe)).subscribe(order => {
        if (order) {
          this._snackBar.open('Hurray!!!  Your order is successfully placed.');
          this._bookAPIService.updateCurrentCart([]);
          this._router.navigateByUrl('order');
        }
        console.log(order);
      })
    }

    ngOnDestroy(): void {
      this.ngUnsubscribe.next();
      this.ngUnsubscribe.complete();
    }
}