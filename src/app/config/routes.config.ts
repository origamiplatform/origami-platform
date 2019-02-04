export interface IRoutes {
    label: string;
    value: string;
    path: string;
    onlyAdmin?: boolean;
}

export const ROUTES: IRoutes[] = [
    { label: 'Courses', value: 'enrolled', path: '/course/enrolled', onlyAdmin: false },
    { label: 'Explore', value: 'explore', path: '/course/explore', onlyAdmin: false },
    { label: 'Admin', value: 'admin', path: '/admin', onlyAdmin: true },
];
