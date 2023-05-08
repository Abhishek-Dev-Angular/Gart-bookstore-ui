import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { AppSidebarComponent } from './_layout/app-sidebar/app-sidebar.component';
import { FooterComponent } from './_layout/footer/footer.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeadersInterceptor } from './service/header.interceptor.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './guards/auth.guard';
import { NgbDatepickerModule, NgbModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { LoaderService } from './service/loader.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UserAPIService } from './service/user-api.service';
import { BookComponent } from './component/book/book.component';
import { BookAPIService } from './service/book-api.service';
import { CartDrawerComponent } from './component/cart-drawer/cart-drawer.component';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetModule, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTableModule } from '@angular/material/table';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CheckoutComponent } from './component/checkout/checkout.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { OrderAPIService } from './service/order-api.service';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { OrderComponent } from './component/order/order.component';
import { ConfirmDialogComponent } from './_core/confirm-dialog/confirm-dialog.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        BookComponent,
        AppSidebarComponent,
        CheckoutComponent,
        FooterComponent,
        CartDrawerComponent,
        OrderComponent,
        ConfirmDialogComponent
    ],
    providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: HeadersInterceptor,
        multi: true
    },
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } },
    { provide: MatBottomSheetRef, useValue: {} },
    { provide: MAT_BOTTOM_SHEET_DATA, useValue: {} },
        UserAPIService,
        BookAPIService,
        AuthGuard,
        LoaderService,
        OrderAPIService
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        NgbDatepickerModule,
        NgbModule,
        NgbToastModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatListModule,
        MatSidenavModule,
        MatBottomSheetModule,
        MatIconModule,
        MatToolbarModule,
        MatBadgeModule,
        MatTableModule,
        MatStepperModule,
        MatSelectModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,
        MatDividerModule,
        MatDialogModule
    ]
})
export class AppModule { }
