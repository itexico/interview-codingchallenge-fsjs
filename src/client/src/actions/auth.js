import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index';

//Action Creators
export const signin = (formData) => async (dispatch) => {
    try {
        //login user
        const { data } = await api.signIn(formData);

        dispatch({ type: AUTH, payload: data });

    } catch (error) {
        console.log(error.message);
    }
};

export const signup = (formData) => async (dispatch) => {
    try {
        //signup user
        const { data } = await api.signUp(formData);

        dispatch({ type: AUTH, payload: data });

    } catch (error) {
        console.log(error.message);
    }
};