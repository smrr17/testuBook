import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  FETCH_MORE_USERS_REQUEST,
  FETCH_MORE_USERS_SUCCESS,
  FETCH_MORE_USERS_FAILURE,
} from '../Actions/userAction';

const initialState = {
  loading: false,
  loadingMore: false,
  users: [],
  error: '',
  since: 0,
  hasMore: true,
  isSearch: false,
  searchQuery: '',
};

const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: '',
        isSearch: action.payload?.isSearch || false,
        searchQuery: action.payload?.searchQuery || '',
      };

    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload.users,
        since: action.payload.since,
        hasMore: action.payload.users.length === 10, // Assuming per_page=10
        isSearch: action.payload.isSearch,
        searchQuery: action.payload.searchQuery,
        error: '',
      };

    case FETCH_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case FETCH_MORE_USERS_REQUEST:
      return {
        ...state,
        loadingMore: true,
        error: '',
      };

    case FETCH_MORE_USERS_SUCCESS:
      return {
        ...state,
        loadingMore: false,
        users: [...state.users, ...action.payload.users],
        since: action.payload.since,
        hasMore: action.payload.users.length === 10, // Assuming per_page=10
        error: '',
      };

    case FETCH_MORE_USERS_FAILURE:
      return {
        ...state,
        loadingMore: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
