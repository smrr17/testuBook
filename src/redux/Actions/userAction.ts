import axios from 'axios';
import {Dispatch} from 'redux';

export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';
export const FETCH_MORE_USERS_REQUEST = 'FETCH_MORE_USERS_REQUEST';
export const FETCH_MORE_USERS_SUCCESS = 'FETCH_MORE_USERS_SUCCESS';
export const FETCH_MORE_USERS_FAILURE = 'FETCH_MORE_USERS_FAILURE';
const accessToken =
  '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';

export const fetchUsers = (since: number = 0, query?: string) => {
  return async (dispatch: any) => {
    const actionType = query ? FETCH_USERS_REQUEST : FETCH_USERS_REQUEST;
    dispatch({type: actionType});

    try {
      let url: string;
      let response: any;

      if (query) {
        // Search endpoint
        const page = Math.floor(since / 10) + 1; // Convert since offset to page number
        url = `https://api.github.com/search/users?q=${query}&page=${page}&per_page=10`;
        response = await axios.get(url, {
          headers: {Authorization: `Bearer ${accessToken}`},
        });
      } else {
        // Regular users endpoint
        url = `https://api.github.com/users?since=${since}&per_page=10`;
        response = await axios.get(url, {
          headers: {Authorization: `Bearer ${accessToken}`},
        });
      }

      const users = query ? response.data.items : response.data;
      const lastUserId = users[users.length - 1]?.id || since;

      dispatch({
        type: query ? FETCH_USERS_SUCCESS : FETCH_USERS_SUCCESS,
        payload: {
          users,
          since: lastUserId,
          isSearch: !!query,
          searchQuery: query || '',
        },
      });
    } catch (error: any) {
      console.log('Error:', error.response?.data?.message || error.message);
      dispatch({
        type: query ? FETCH_USERS_FAILURE : FETCH_USERS_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const fetchMoreUsers = (since: number, query?: string) => {
  return async (dispatch: any) => {
    dispatch({type: FETCH_MORE_USERS_REQUEST});

    try {
      let url: string;
      let response: any;

      if (query) {
        // Search endpoint pagination
        const page = Math.floor(since / 10) + 1;
        url = `https://api.github.com/search/users?q=${query}&page=${page}&per_page=10`;
        response = await axios.get(url, {
          headers: {Authorization: `Bearer ${accessToken}`},
        });
      } else {
        // Regular endpoint pagination
        url = `https://api.github.com/users?since=${since}&per_page=10`;
        response = await axios.get(url, {
          headers: {Authorization: `Bearer ${accessToken}`},
        });
      }

      const newUsers = query ? response.data.items : response.data;
      const lastUserId = newUsers[newUsers.length - 1]?.id || since;

      dispatch({
        type: FETCH_MORE_USERS_SUCCESS,
        payload: {
          users: newUsers,
          since: lastUserId,
          isSearch: !!query,
          searchQuery: query || '',
        },
      });
    } catch (error: any) {
      dispatch({
        type: FETCH_MORE_USERS_FAILURE,
        payload: error.message,
      });
    }
  };
};
