import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './component/login/login.component';
import { BookComponent } from './component/book/book.component';
import { CheckoutComponent } from './component/checkout/checkout.component';
import { OrderComponent } from './component/order/order.component';
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', canActivate: [AuthGuard], component: LoginComponent },
  {
    path: 'book',
    canActivate: [AuthGuard],
    component: BookComponent
  },
  {
    path: 'checkout',
    canActivate: [AuthGuard],
    component: CheckoutComponent
  },
  {
    path: 'order',
    canActivate: [AuthGuard],
    component: OrderComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
