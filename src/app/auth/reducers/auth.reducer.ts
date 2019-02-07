import * as AuthActions from '../actions/auth.actions';
import { User } from 'firebase';


export interface State {
    user: User;
}

const initialState: State = {
    user: null,
};

export function reducer(
    state: State = initialState,
    action: AuthActions.ActionUnion
): State {
    switch (action.type) {
        case AuthActions.ActionTypes.Login:
            return {
                ...state,
                user: action.payload,
            };
        case AuthActions.ActionTypes.Logout:
            return {
                ...state,
                user: null,
            };
        default:
            return state;
    }
}

export const getUser = (state: State) => state.user;
