import { Component, OnDestroy, OnInit } from '@angular/core';
import { FiltersComponent } from './components/filters/filters.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ProductsHeaderComponent } from './components/products-header/products-header.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { ProductBoxComponent } from './components/product-box/product-box.component';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';
import { Subscription } from 'rxjs';
import { StoreService } from '../../services/store.service';
import { CommonModule } from '@angular/common';

const ROWS_HEIGHT: { [id: number]: number } = {
  1: 400,
  3: 335,
  4: 350
};

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FiltersComponent, MatSidenavModule, ProductsHeaderComponent, MatGridListModule, ProductBoxComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(private cartService: CartService, private storeService: StoreService) { }

  ngOnInit(): void {
    this.getProducts()
  }

  ngOnDestroy(): void {
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe()
    }
  }

  category: string | undefined
  products: Array<Product> | undefined
  productsSubscription: Subscription | undefined

  sort = 'desc'
  count = 6
  columns = 3
  rowHeight = ROWS_HEIGHT[this.columns]

  getProducts(): void {
    this.productsSubscription = this.storeService.getAllProducts(this.count, this.sort, this.category).subscribe((_products) => {
      this.products = _products
    })
  }

  onColumnsCountChange(colsNum: number): void {
    this.columns = colsNum
    this.rowHeight = ROWS_HEIGHT[colsNum]
  }

  onItemsCountChange(newCount: number): void {
    this.count = newCount
    this.getProducts()
  }

  onSortChange(newSort: string): void {
    this.sort = newSort
    this.getProducts()
  }

  onShowCategory(newCategory: string): void {
    this.category = newCategory
    this.getProducts()
  }

  onAddToCart(product: Product): void {
    this.cartService.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id
    })
  }
}
