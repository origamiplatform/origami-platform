export interface IRoutes {
    label: string;
    value: string;
    path: string;
    onlyAdmin?: boolean;
}

export const ROUTES: IRoutes[] = [
    { label: 'Explore', value: 'explore', path: '/explore', onlyAdmin: false },
    // { label: 'Courses', path: '/course', onlyAdmin: false },
    { label: 'Admin', value: 'admin', path: '/admin', onlyAdmin: true },
];
