import { Action } from '@ngrx/store';
import { Course } from '@core/models/course';

export enum ActionTypes {
    Create = '[Course] Create',
    Read = '[Course] Read',
    Update = '[Course] Update',
    Delete = '[Course] Delete',
    Complete = '[Course] Complete',
    ReadOne = '[Course] ReadOne',
    GetOneById = '[Course] GetOneById',
    GetOneComplete = '[Course] GetOneComplete',
}

export class Create implements Action {
    constructor(public payload: Course) { }
    readonly type = ActionTypes.Create;
}

export class Read implements Action {
    readonly type = ActionTypes.Read;
}

export class Update implements Action {
    constructor(public payload: Course) { }
    readonly type = ActionTypes.Update;
}

export class Delete implements Action {
    constructor(public payload: Course) { }
    readonly type = ActionTypes.Delete;
}

export class Complete implements Action {
    constructor(public payload: Course[]) { }
    readonly type = ActionTypes.Complete;
}

export class ReadOne implements Action {
    readonly type = ActionTypes.ReadOne;
}

export class GetOneById implements Action {
    constructor(public payload: string) { }
    readonly type = ActionTypes.GetOneById;
}

export class GetOneComplete implements Action {
    constructor(public payload: Course) { }
    readonly type = ActionTypes.GetOneComplete;
}

export type ActionUnion = Create
    | Read
    | Update
    | Delete
    | ReadOne
    | GetOneById
    | GetOneComplete
    | Complete;
