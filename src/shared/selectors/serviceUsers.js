// import { createSelector } from 'reselect';

import {createSelector} from "reselect";

export const getUsersEntities = state => (
  state.entities.users
);

export const getUserProfileInfobyId = (state, id) => (
  state.entities.users[id]
);

export const getUserProfileId = state => (
  state.users.profile.id
);

export const getUserProfileToken = state => (
  state.users.profile.token
);

export const getIsUserProfileInitialized = state => (
  state.users.profile.isInitialized
);

export const getIsUserProfileFetching = state => (
  state.users.profile.isFetching
);

export const getInitializeUser = state => (
  state.users.profile.initializeUser
);

export const getIsUserAuthorizied = state => (
  state.users.profile.isAuthorizied
);

export const getUserProfileInfo = createSelector(
  state => state,
  getUserProfileId,
  getUserProfileInfobyId,
);