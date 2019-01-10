import { Action } from '@ngrx/store';

export enum LayoutActionTypes {
    OpenSidenav = '[Layout] Open Sidenav',
    CloseSidenav = '[Layout] Close Sidenav',
    UpdateLoading = '[Layout] Update Loading',
    EndLoading = '[Layout] End Loading'
}

export class OpenSidenav implements Action {
    readonly type = LayoutActionTypes.OpenSidenav;
}

export class CloseSidenav implements Action {
    readonly type = LayoutActionTypes.CloseSidenav;
}

export class UpdateLoading implements Action {
    constructor(public percentage: number) { }
    readonly type = LayoutActionTypes.UpdateLoading;
}

export class EndLoading implements Action {
    readonly type = LayoutActionTypes.EndLoading;
}

export type LayoutActionsUnion = OpenSidenav
    | CloseSidenav
    | UpdateLoading
    | EndLoading;
