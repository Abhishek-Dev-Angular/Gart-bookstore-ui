import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { UserAPIService } from 'src/app/service/user-api.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { CartDrawerComponent } from 'src/app/component/cart-drawer/cart-drawer.component';
import { BookAPIService } from 'src/app/service/book-api.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/_core/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-app-sidebar',
  templateUrl: './app-sidebar.component.html',
  styleUrls: ['./app-sidebar.component.scss']
})
export class AppSidebarComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  isLogin = localStorage.getItem('token') ? true : false;
  cartItems = [];
  ngUnsubscribe: any;
  constructor(public dialog: MatDialog, private _userService: UserAPIService, private _bookAPIService: BookAPIService, private _router: Router, private _bottomSheet: MatBottomSheet) {
  }

  ngOnInit(): void {
    this.ngUnsubscribe = new Subject();
    this.loginSubscription();
    this.getCurrentCart();
  }

  loginSubscription() {
    this._userService.isLogin().pipe(takeUntil(this.ngUnsubscribe)).subscribe((res) => {
      this.isLogin = res;
    })
  }

  getCurrentCart() {
    this._bookAPIService.getCurrentCart().pipe(takeUntil(this.ngUnsubscribe)).subscribe(cartItems => {
      if (cartItems) {
        this.cartItems = cartItems;
      }
    })
  }

  navigateToURL(url) {
    this._router.navigateByUrl(url);
  }

  openDrawer() {
    this._bottomSheet.open(CartDrawerComponent);
  }

  logout(){
    this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}