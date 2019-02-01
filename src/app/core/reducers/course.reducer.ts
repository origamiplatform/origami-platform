import * as CourseActions from '../actions/course.actions';
import { Course } from '@core/models/course';

export interface State {
    courses: Course[];
    course: Course;
}

const initialState: State = {
    courses: [],
    course: null
};

export function reducer(
    state: State = initialState,
    action: CourseActions.ActionUnion
): State {
    switch (action.type) {
        case CourseActions.ActionTypes.Complete:
            return {
                ...state,
                courses: action.payload,
            };
        case CourseActions.ActionTypes.GetOneComplete:
            return {
                ...state,
                course: action.payload,
            };
        default:
            return state;
    }
}

export const getCourses = (state: State) => state.courses;
export const getCourse = (state: State) => state.course;
