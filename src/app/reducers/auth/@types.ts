// export enum AuthActionTypes {
//     login = "login",
//     logout = "logout"
// }

export type AuthState = {
    isSignedIn: boolean;
    username: string | null;
    roleId: null | number;
    error: null | string;
};

// type LoginAuthAction = {
//     type: AuthActionTypes.login;
//     payload: any;
// }

// type LogoutAuthAction = {
//     type: AuthActionTypes.logout;
// }

// export type AuthAction = LoginAuthAction | LogoutAuthAction;