import type { RootState } from '../../app/store';
export interface SignupDto {
    email: string;
    motDePasse: string;
    prenom: string;
    nom: string;
    dateNaissance?: string;
    sexe: 'Homme' | 'Femme' | 'Ne préfère pas dire';
    role: 'patient' | 'professionnel';
}
export interface LoginDto {
    email: string;
    motDePasse: string;
}
export interface User {
    uuid: string;
    email: string;
    prenom?: string;
    nom?: string;
    dateNaissance?: string;
    sexe?: 'Homme' | 'Femme' | 'Ne préfère pas dire';
    role: 'patient' | 'professionnel';
    accessToken?: string;
}
interface AuthState {
    user: User | null;
    token: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error?: string;
}
export declare const signup: import("@reduxjs/toolkit").AsyncThunk<User, SignupDto, {
    rejectValue: string;
    state?: unknown;
    dispatch?: import("redux").Dispatch | undefined;
    extra?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const login: import("@reduxjs/toolkit").AsyncThunk<User, LoginDto, {
    rejectValue: string;
    state?: unknown;
    dispatch?: import("redux").Dispatch | undefined;
    extra?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const authSlice: import("@reduxjs/toolkit").Slice<import("immer/dist/internal").WritableDraft<AuthState>, {
    logout(state: import("immer/dist/internal").WritableDraft<AuthState>): void;
}, "auth">;
export declare const logout: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"auth/logout">;
export declare const selectAuth: (state: RootState) => import("immer/dist/internal").WritableDraft<AuthState>;
declare const _default: import("redux").Reducer<import("immer/dist/internal").WritableDraft<AuthState>>;
export default _default;
