import { Component, OnInit } from '@angular/core';
import { Cart, CartItem } from '../../models/cart.model';
import { MatCard } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../../services/cart.service';
import { HttpClient } from '@angular/common/http';
import { loadStripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    MatCard,
    RouterLink,
    MatButtonModule,
    MatTableModule,
    MatIconModule
  ],
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {
  constructor(private cartService: CartService, private http: HttpClient) { }

  ngOnInit(): void {
    this.cartService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart
      this.dataSource = this.cart.items
    })
  }

  displayedColumns: Array<string> = [
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action'
  ]

  cart: Cart = {
    items: []
  }

  dataSource: Array<CartItem> = []

  getTotal(items: Array<CartItem>): number {
    return this.cartService.getTotal(items)
  }

  onClearCart(): void {
    this.cartService.clearCart()
  }

  onRemoveFromCart(item: CartItem): void {
    this.cartService.removeFromCart(item)
  }

  onAddQuantity(item: CartItem): void {
    this.cartService.addToCart(item)
  }

  onRemoveQuantity(item: CartItem): void {
    this.cartService.removeQuantity(item)
  }

  onCheckout(): void {
    this.http.post('http://localhost:4242/checkout', {
      items: this.cart.items
    }).subscribe(async(res: any) => {
      let stripe = await loadStripe('pk_test_51PBvATRwmvtq6SYkscZFAEiEjf1Fwk7sSmCfpU6Cqfmpeja2RNvS3baReJvnYT45asEyqtC38oLYgkaQRw2BWRSF003GBSObPI')
      stripe?.redirectToCheckout({
        sessionId: res.id
      })
    })
  }
}