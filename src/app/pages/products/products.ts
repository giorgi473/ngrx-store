import { Component, inject, OnInit, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { productActions } from './store/product-actions';
import { productFeature } from './store/product-feature';
import { toSignal } from '@angular/core/rxjs-interop';
import { JsonPipe } from '@angular/common';
import { ProductCard } from '../../core/components/product-card';
import { FormsModule } from '@angular/forms';
import { cartActions } from '../cart/store/cart-actions';
import { Product } from './types/product-type';

@Component({
  selector: 'app-products',
  imports: [ProductCard, FormsModule],
  template: `
    <div class="py-8">
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-3xl font-bold text-slate-900 mb-8">Products</h1>
        <div class="search">
          <input
            [(ngModel)]="searchQuery"
            (ngModelChange)="onSearch($event)"
            class="w-72 p-2 border border-slate-200 rounded focus:outline-none focus:ring-2 focus:ring-slate-500"
            type="text"
            placeholder="Search products..."
          />
        </div>
      </div>

      @if(loading()) {
      <div class="flex items-center justify-center">
        <p>Loading product...</p>
      </div>
      } @if(products()?.length === 0 && !loading()) {
      <div class="flex items-center justify-center">
        <p>No products available.</p>
      </div>
      } @else {
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        @for (product of products(); track product.id) {
        <app-product-card (addToCart)="onAddToCart($event)" [product]="product" />
        }
      </div>
      }
    </div>
  `,
})
export class Products implements OnInit {
  private readonly store = inject(Store);
  protected readonly products = toSignal(this.store.select(productFeature.selectFilteredProducts));
  protected readonly loading = toSignal(this.store.select(productFeature.selectLoading));

  protected searchQuery = signal('');

  protected onSearch(query: string): void {
    this.store.dispatch(productActions.search({ searchQuery: query }));
  }

  ngOnInit(): void {
    this.store.dispatch(productActions.load());
  }

  protected onAddToCart(product: Product): void {
    this.store.dispatch(cartActions.addToCart({ product }));
  }
}
