export interface IRoutes {
    label: string;
    path: string;
    onlyAdmin?: boolean;
}

export const ROUTES: IRoutes[] = [
    { label: 'Explore', path: '/explore', onlyAdmin: false },
    { label: 'Courses', path: '/course', onlyAdmin: false },
    { label: 'Admin', path: '/admin', onlyAdmin: true },
];
