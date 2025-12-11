import { createActionGroup, props } from '@ngrx/store';
import { UserProfile } from '../types/profile-type';

export const profileActions = createActionGroup({
  source: 'Profile',
  events: {
    load: props<{ userId: number }>(),
    loadSuccess: props<{ profile: UserProfile }>(),
    loadFailure: props<{ error: string }>(),
  },
});
