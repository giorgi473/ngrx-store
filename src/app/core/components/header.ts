import { Component, inject } from '@angular/core';
import { Button } from '../../shared/components/button';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, LogOut, User, ShoppingCart } from 'lucide-angular';
import { Store } from '@ngrx/store';
import { cartFeature } from '../../pages/cart/store/cart-feature';
import { toSignal } from '@angular/core/rxjs-interop';
import { authActions } from '../../shared/store/auth-actions';

@Component({
  selector: 'app-header',
  imports: [Button, RouterLink, LucideAngularModule],
  template: `
    <div class="sticky top-0 z-50 w-full px-4 py-3 bg-slate-900 text-white shadow-lg">
      <nav class="container mx-auto flex items-center justify-between">
        <a routerLink="/" class="text-xl font-bold tracking-tight">NgrxStore</a>

        <div class="flex items-center gap-4">
          <button
            appButton
            variant="ghost"
            type="button"
            (click)="logout()"
            class="text-white hover:text-gray-300 hover:bg-white/10"
          >
            <lucide-icon [img]="icons.LogOut" class="size-4 mr-2" />
            Logout
          </button>
          <button
            routerLink="/profile"
            appButton
            variant="ghost"
            type="button"
            class="text-white hover:bg-white/10"
          >
            <lucide-icon [img]="icons.User" class="size-4 mr-2" />
            Profile
          </button>
          <button
            appButton
            variant="ghost"
            type="button"
            class="relative text-white hover:bg-white/10"
            routerLink="/cart"
          >
            <lucide-icon [img]="icons.ShoppingCart" class="size-4" />
            <span
              class="absolute -top-1 -right-1 size-5 flex items-center justify-center bg-amber-500 text-xs font-medium rounded-full"
            >
              {{ cartItemCount() }}
            </span>
          </button>
        </div>
      </nav>
    </div>
  `,
})
export class Header {
  protected readonly icons = { LogOut, User, ShoppingCart };
  private readonly store = inject(Store);
  protected readonly cartItemCount = toSignal(this.store.select(cartFeature.selectCartCount), {
    initialValue: 0,
  });

  protected logout() {
    this.store.dispatch(authActions.logout());
  }
}
