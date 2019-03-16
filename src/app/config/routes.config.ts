export interface IRoutes {
    label: string;
    value: string;
    path: string;
    onlyLogin?: boolean;
    onlyAdmin?: boolean;
}

export const ROUTES: IRoutes[] = [
    { label: 'Courses', value: 'enrolled', path: '/course/enrolled', onlyLogin: true, onlyAdmin: false },
    { label: 'Explore', value: 'explore', path: '/course/explore', onlyLogin: false, onlyAdmin: false },
    { label: 'Admin', value: 'admin', path: '/admin', onlyLogin: true, onlyAdmin: true },
];
