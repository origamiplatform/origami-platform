import {
    LayoutActionTypes,
    LayoutActionsUnion,
} from '../actions/layout.actions';

export interface State {
    showSidenav: boolean;
    loading: number;
}

const initialState: State = {
    showSidenav: false,
    loading: 0
};

export function reducer(
    state: State = initialState,
    action: LayoutActionsUnion
): State {
    switch (action.type) {
        case LayoutActionTypes.CloseSidenav:
            return {
                ...state,
                showSidenav: false,
            };

        case LayoutActionTypes.OpenSidenav:
            return {
                ...state,
                showSidenav: true,
            };

        case LayoutActionTypes.UpdateLoading:
            return {
                ...state,
                loading: action.percentage,
            };

        case LayoutActionTypes.EndLoading:
            return {
                ...state,
                loading: 0,
            };
        default:
            return state;
    }
}

export const getShowSidenav = (state: State) => state.showSidenav;
export const getLoading = (state: State) => state.loading;
