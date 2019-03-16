export interface User {
    uid: string;
    email: string;
    photoURL?: string;
    displayName?: string;
    courses?: string[]; // list of courseIds
    admin?: boolean;
}

export interface BcUser {
    $class: string;
    id: string;
    email: string;
    name: string;
    admin: boolean;
}
