import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductApi } from '../services/product-api';
import { productActions } from './product-actions';
import { catchError, map, of, switchMap } from 'rxjs';

export const productEffect = createEffect(
  (action$ = inject(Actions), productApi = inject(ProductApi)) => {
    return action$.pipe(
      ofType(productActions.load),
      switchMap(() => {
        return productApi.getProducts().pipe(
          map((products) => productActions.loadSuccess({ products })),
          catchError((error) => of(productActions.loadFailure({ error: error.message })))
        );
      })
    );
  },
  {
    functional: true,
  }
);
