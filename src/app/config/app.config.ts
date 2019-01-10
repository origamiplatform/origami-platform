import { IRoutes, ROUTES } from './routes.config';

export interface IAppConfig {
    routes: IRoutes[];
    instagram: string;
}

export const appConfig: IAppConfig = {
    routes: ROUTES,
    instagram: 'estonish.ee'
};
