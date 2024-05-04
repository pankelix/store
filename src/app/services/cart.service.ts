import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../models/cart.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private _snackBar: MatSnackBar) { }

  cart = new BehaviorSubject<Cart>({ items: [] })

  addToCart(item: CartItem): void {
    const items = [...this.cart.value.items]

    const itemInCart = items.find((_item) => _item.id === item.id)

    if (itemInCart) {
      itemInCart.quantity += 1
    } else {
      items.push(item)
    }

    this.cart.next({ items: items })
    this._snackBar.open('1 item added to cart.', 'Ok', { duration: 2000 })
  }

  removeQuantity(item: CartItem): void {
    this.cart.value.items.map((_item) => {
      if (_item.id === item.id) {
        _item.quantity--
        if (_item.quantity === 0) {
          this.removeFromCart(item)
        }
      }
      /* 2:40 */
      return _item
    })
  }

  getTotal(items: Array<CartItem>): number {
    return items.map((item) => item.price * item.quantity).reduce((prev, curr) => prev + curr, 0)
  }

  clearCart(): void {
    this.cart.next({ items: [] })
    this._snackBar.open('Cart is clear', 'Ok', { duration: 2000 })
  }

  removeFromCart(item: CartItem): void {
    const filteredItems = this.cart.value.items.filter((_item) => _item.id !== item.id)

    this.cart.next({ items: filteredItems })
    this._snackBar.open('1 item removed from cart', 'Ok', { duration: 2000 })
  }

}
