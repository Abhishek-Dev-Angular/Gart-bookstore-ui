import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { BookAPIService } from 'src/app/service/book-api.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})

export class BookComponent implements OnInit, OnDestroy {
  dashboardName = 'Book Library';
  filterTypes = [
    {name: 'Max Rating', value: 'rating'},
    {name: 'Max Price', value: 'price'},
    {name: 'Title', value: 'title'},
    {name: 'Author', value: 'author'},
]

  firstFormGroup = this._formBuilder.group({
    searchBy: ['title', Validators.required],
    searchText: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(1)]]
  });
  bookList = [];
  cartItems = [];
  ngUnsubscribe: any;
  constructor(private _bookAPIService: BookAPIService, private _formBuilder: FormBuilder,) {
  }

  ngOnInit(): void {
    this.ngUnsubscribe = new Subject();
    this.getAllBooks();
    this.getCurrentCart();
  }

  getAllBooks() {
    let reqObj = this.firstFormGroup.getRawValue();
    console.log(reqObj);
    this._bookAPIService.getAllBooks(reqObj).pipe(takeUntil(this.ngUnsubscribe)).subscribe(books => {
      if (books && books.length > -1) {
        this.bookList = books;
      }
    })
  }

  getCurrentCart() {
    this._bookAPIService.getCurrentCart().pipe(takeUntil(this.ngUnsubscribe)).subscribe(cartItems => {
      if (cartItems && cartItems.length > 0) {
        this.cartItems = cartItems;
      }
    })
  }

  addToCart(book) {
    if (this.cartItems.length == 0) {
      book['count'] = 1;
      this._bookAPIService.updateCurrentCart([book]);
    } else {
      let alreadyExist = false;
      for (let i = 0; i < this.cartItems.length; i++) {
        if (this.cartItems[i]._id === book._id) {
          this.cartItems[i].count++;
          alreadyExist = true;
          break;
        }
      }
      if (!alreadyExist) {
        book['count'] = 1;
        this.cartItems.push(book);
      }
      this._bookAPIService.updateCurrentCart([...this.cartItems]);
    }

  }

  reset(){
    this.firstFormGroup.controls['searchBy'].setValue('title');
    this.firstFormGroup.controls['searchText'].setValue('');
    this.firstFormGroup.updateValueAndValidity();
    this.getAllBooks();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
