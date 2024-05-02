import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Product } from '../../../../models/product.model';

@Component({
  selector: 'app-product-box',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './product-box.component.html'
})
export class ProductBoxComponent {
  @Input() fullWidthMode = false
  @Input() product: Product | undefined
  @Output() addToCart = new EventEmitter()

  onAddToCart(): void {
    this.addToCart.emit(this.product)
  }
}
