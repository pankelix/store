import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product } from '../models/product.model';

const STORE_BASE_URL = 'https://fakestoreapi.com'

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  constructor(private httpClient: HttpClient) { }

  /* getAllProducts(limit = 6, sort = 'desc', category?: string): Observable<Array<Product>> {
    return this.httpClient.get<Array<Product>>(
      `${STORE_BASE_URL}/products${category ? '/category/' + category : ''}?sort=${sort}&limit=${limit}`
    )
  } */

  getAllProducts(limit = 6, sort = 'desc', category?: string): Observable<Array<Product>> {
    //API sorting not working currently, so hand-made sorting
    let sortOrderFunction: (a: Product, b: Product) => number

    if (sort === 'desc') {
      sortOrderFunction = (a, b) => b.price - a.price
    } else {
      sortOrderFunction = (a, b) => a.price - b.price
    }

    return this.httpClient.get<Array<Product>>(
      /* `${STORE_BASE_URL}/products${category ? '/category/' + category : ''}?sort=${sort}&limit=${limit}` */
      `${STORE_BASE_URL}/products${category ? '/category/' + category : ''}?limit=${limit}`
    ).pipe(
      map(unsortedProducts => unsortedProducts.sort(sortOrderFunction))
    );
  }

  getAllCategories(): Observable<Array<string>> {
    return this.httpClient.get<Array<string>>(
      `${STORE_BASE_URL}/products/categories`
    )
  }
}
