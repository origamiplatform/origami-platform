import {
    ActionReducerMap,
    createSelector,
    createFeatureSelector,
    ActionReducer,
    MetaReducer,
} from '@ngrx/store';
import { environment } from '@environments/environment';
import { RouterStateUrl } from '@core/utils/CustomRouterStateSerializer';
import * as fromRouter from '@ngrx/router-store';

/**
 * storeFreeze prevents state from being mutated. When mutation occurs, an
 * exception will be thrown. This is useful during development mode to
 * ensure that none of the reducers accidentally mutates the state.
 */
import { storeFreeze } from 'ngrx-store-freeze';

/**
 * Every reducer module's default export is the reducer function itself. In
 * addition, each module should export a type or interface that describes
 * the state of the reducer plus any selector functions. The `* as`
 * notation packages up all of the exports into a single object.
 */

import * as fromLayout from '@core/reducers/layout.reducer';
import * as fromCategory from '@core/reducers/category.reducer';
import * as fromCourse from '@core/reducers/course.reducer';
/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface State {
    layout: fromLayout.State;
    router: fromRouter.RouterReducerState<RouterStateUrl>;
    category: fromCategory.State;
    course: fromCourse.State;
}

/**
 * Our state is composed of a map of action reducer functions.
 * These reducer functions are called with each dispatched action
 * and the current or initial state and return a new immutable state.
 */
export const reducers: ActionReducerMap<State> = {
    layout: fromLayout.reducer,
    router: fromRouter.routerReducer,
    category: fromCategory.reducer,
    course: fromCourse.reducer
};

// console.log all actions
export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
    return function (state: State, action: any): State {
        // console.log('state', state);
        // console.log('action', action);
        return reducer(state, action);
    };
}

/**
 * By default, @ngrx/store uses combineReducers with the reducer map to compose
 * the root meta-reducer. To add more meta-reducers, provide an array of meta-reducers
 * that will be composed to form the root meta-reducer.
 */
export const metaReducers: MetaReducer<State>[] = !environment.production
    ? [logger, storeFreeze]
    : [];

/**
 * Router Reducers
 */
export const getRouterState = createFeatureSelector<fromRouter.RouterReducerState<RouterStateUrl>>('router');

// export const getRouterInfo = createSelector(
//     getRouterState,
//     (state: any) => state.state
// );


/**
 * Layout Reducers
 */
export const getLayoutState = createFeatureSelector<fromLayout.State>('layout');

export const getShowSidenav = createSelector(
    getLayoutState,
    fromLayout.getShowSidenav
);

export const getLoading = createSelector(
    getLayoutState,
    fromLayout.getLoading
);

/**
 * Category Reducers
 */
export const getCategoryState = createFeatureSelector<fromCategory.State>('category');

export const getCategories = createSelector(
    getCategoryState,
    fromCategory.getCategories
);

/**
 * Course Reducers
 */
export const getCourseState = createFeatureSelector<fromCourse.State>('course');

export const getCourses = createSelector(
    getCourseState,
    fromCourse.getCourses
);

// export const getCourse = createSelector(
//     getCourseState,
//     fromCourse.getCourse
// );
