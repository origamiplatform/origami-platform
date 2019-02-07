import { Action } from '@ngrx/store';

export enum ActionTypes {
    Login = '[Auth] Login',
    Logout = '[Auth] Logout',
    Register = '[Auth] Register',
}

export class Login implements Action {
    constructor(public payload: any) { }
    readonly type = ActionTypes.Login;
}

export class Logout implements Action {
    readonly type = ActionTypes.Logout;
}

export class Register implements Action {
    constructor(public payload: any) { }
    readonly type = ActionTypes.Register;
}

export type ActionUnion = Login
    | Logout
    | Register;
