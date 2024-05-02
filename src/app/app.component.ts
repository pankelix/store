import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { CartService } from './services/cart.service';
import { Cart } from './models/cart.model';
import { StoreService } from './services/store.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, RouterOutlet, HeaderComponent, HomeComponent, HttpClientModule],
  providers: [CartService, StoreService],
  template: `
  <app-header [cart]="cart" />
  <router-outlet />
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.cart.subscribe((_cart) => {
      this.cart = _cart
    })
  }

  cart: Cart = { items: [] }
}
