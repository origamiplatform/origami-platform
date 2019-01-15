import { Action } from '@ngrx/store';
import { CategoryNode } from '@shared/models/database';

export enum ActionTypes {
    Create = '[Category] Create',
    Read = '[Category] Read',
    Update = '[Category] Update',
    Delete = '[Category] Delete',
    Complete = '[Category] Complete',
}

export class Create implements Action {
    constructor(public payload: CategoryNode) { }
    readonly type = ActionTypes.Create;
}

export class Read implements Action {
    readonly type = ActionTypes.Read;
}

export class Update implements Action {
    constructor(public payload: CategoryNode) { }
    readonly type = ActionTypes.Update;
}

export class Delete implements Action {
    constructor(public payload: CategoryNode) { }
    readonly type = ActionTypes.Delete;
}

export class Complete implements Action {
    constructor(public payload: CategoryNode[]) { }
    readonly type = ActionTypes.Complete;
}

export type ActionUnion = Create
    | Read
    | Update
    | Delete
    | Complete;
