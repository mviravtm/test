import * as types from 'Types';

const initialState = {
  profile: {
    id: null,
    token: '',
    isRegistered: false,
    isFetching: false,
    isInitialized: false,
    isRequestFailed: false,
    initializeUser: false,
    isAuthorizied: false,
  },
  ids: [],
};

const users = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_USER_EMAIL_INFO_REQUEST:
      return {
        ...state,
        profile: {
          ...state.profile,
          isFetching: true,
        },
      };

    case types.GET_USER_EMAIL_INFO_SUCCESS:
      
      return {
        ...state,
        profile: {
          ...state.profile,
          isFetching: false,
          isInitialized: true,
          id: action.payload.result,
        },
      };

    case types.GET_USER_EMAIL_INFO_FAILURE:
      return {
        ...state,
        profile: {
          ...state.profile,
          isFetching: false,
          isInitialized: true,
          isRequestFailed: true,
        },
      };

    case types.POST_SIGNIN_AUTH_REQUEST:
      return {
        ...state,
        profile: {
          ...state.profile,
          isFetching: true,
        },
      };

    case types.POST_SIGNIN_AUTH_SUCCESS:
      return {
        ...state,
        profile: {
          ...state.profile,
          isFetching: false,
          isInitialized: true,
          token: action.payload,
        },
      };

    case types.POST_SIGNIN_AUTH_FAILURE:
      return {
        ...state,
        profile: {
          ...state.profile,
          isFetching: false,
          isInitialized: true,
          isRequestFailed: true,
        },
      };

    case types.GET_USER_PROFILE_REQUEST:
      return {
        ...state,
        profile: {
          ...state.profile,
          initializeUser: true,
        },
      };

    case types.GET_USER_PROFILE_SUCCESS:
      return {
        ...state,
        profile: {
          ...state.profile,
          initializeUser: false,
          isAuthorizied: true,
          id: action.payload.result,
        },
      };

    case types.GET_USER_PROFILE_FAILURE:
      return {
        ...state,
        profile: {
          ...state.profile,
          initializeUser: false,
          isAuthorizied: true,
        },
      };

    default:
      return state;
  }
};

export default users;
