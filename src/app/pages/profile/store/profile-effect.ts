import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProfileApi } from '../services/profile-api';
import { profileActions } from './profile-actions';
import { catchError, map, of, switchMap } from 'rxjs';

export const profileEffects = createEffect(
  (actions$ = inject(Actions), profileApi = inject(ProfileApi)) => {
    return actions$.pipe(
      ofType(profileActions.load),
      switchMap(({ userId }) => {
        return profileApi.getUserProfile(userId).pipe(
          map((profile) => profileActions.loadSuccess({ profile })),
          catchError((error) => of(profileActions.loadFailure({ error: error.message })))
        );
      })
    );
  },
  {
    functional: true,
  }
);
