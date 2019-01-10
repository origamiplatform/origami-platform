export interface IRoutes {
    label: string;
    path: string;
    onlyAdmin?: boolean;
}

export const ROUTES: IRoutes[] = [
    { label: 'Home', path: '/home', onlyAdmin: false },
    { label: 'Blog', path: '/blog', onlyAdmin: false },
    { label: 'Dashboard', path: '/blog/dashboard', onlyAdmin: true },
];
