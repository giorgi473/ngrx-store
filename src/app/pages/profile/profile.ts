import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LucideAngularModule, Mail, Phone, User, MapPin } from 'lucide-angular';
import { profileFeature } from './store/profile-feature';
import { toSignal } from '@angular/core/rxjs-interop';
import { productActions } from '../products/store/product-actions';
import { profileActions } from './store/profile-actions';
import { authFeatures } from '../../shared/store/auth-feature';
import { MyStorage } from '../../shared/services/storage';

@Component({
  selector: 'app-profile',
  imports: [LucideAngularModule],
  template: `<div class="py-8 max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold text-slate-900 mb-8">My Profile</h1>
    @if(loading()) {
    <div class="flex items-center justify-center">
      <p>Loading profile...</p>
    </div>
    } @else if(profile()) { @let userProfile = profile();
    <div class="grid gap-6 md:grid-cols-3">
      <div class="md:col-span-1">
        <div class="bg-white rounded-xl shadow-md p-6 text-center">
          <div
            class="size-24 mx-auto mb-4 rounded-full bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center"
          >
            <span class="text-3xl font-bold text-white uppercase">
              {{ (userProfile?.name)!.firstname[0] }}{{ (userProfile?.name)!.lastname[0] }}
            </span>
          </div>
          <h2 class="text-xl font-semibold text-slate-900 capitalize">
            {{ (userProfile?.name)!.firstname }} {{ (userProfile?.name)!.lastname }}
          </h2>
          <p class="text-slate-500">&#64;{{ userProfile?.username }}</p>
        </div>
      </div>
      <div class="md:col-span-2 space-y-6">
        <div class="bg-white rounded-xl shadow-md p-6">
          <h3 class="text-lg font-semibold text-slate-900 mb-4">Contact Information</h3>
          <div class="space-y-4">
            <div class="flex items-center gap-3">
              <div class="size-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                <lucide-icon [img]="icons.Mail" class="size-5 text-indigo-600" />
              </div>
              <div>
                <p class="text-sm text-slate-500">Email</p>
                <p class="font-medium text-slate-900">{{ userProfile?.email }}</p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <div class="size-10 rounded-lg bg-green-100 flex items-center justify-center">
                <lucide-icon [img]="icons.Phone" class="size-5 text-green-600" />
              </div>
              <div>
                <p class="text-sm text-slate-500">Phone</p>
                <p class="font-medium text-slate-900">{{ userProfile?.phone }}</p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <div class="size-10 rounded-lg bg-amber-100 flex items-center justify-center">
                <lucide-icon [img]="icons.User" class="size-5 text-amber-600" />
              </div>
              <div>
                <p class="text-sm text-slate-500">Username</p>
                <p class="font-medium text-slate-900">{{ userProfile?.username }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-xl shadow-md p-6">
          <h3 class="text-lg font-semibold text-slate-900 mb-4">Address</h3>
          <div class="flex items-start gap-3">
            <div class="size-10 rounded-lg bg-rose-100 flex items-center justify-center shrink-0">
              <lucide-icon [img]="icons.MapPin" class="size-5 text-rose-600" />
            </div>
            <div>
              <p class="font-medium text-slate-900 capitalize">
                {{ userProfile?.address?.street }}
              </p>
              <p class="text-slate-500 capitalize">
                {{ userProfile?.address?.city }}, {{ userProfile?.address?.zipcode }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    }
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Profile implements OnInit {
  protected readonly icons = { Mail, Phone, User, MapPin };
  private readonly store = inject(Store);
  private readonly storage = inject(MyStorage);
  protected readonly profile = toSignal(this.store.select(profileFeature.selectProfile));
  protected readonly loading = toSignal(this.store.select(profileFeature.selectLoading));
  protected readonly userId = toSignal(this.store.select(authFeatures.selectUserId));

  ngOnInit(): void {
    const userId = this.userId() || this.storage.getUserId();
    if (userId) {
      this.store.dispatch(profileActions.load({ userId }));
    }
  }
}
