export interface User {
    uid: string;
    email: string;
    photoURL?: string;
    displayName?: string;
    courses?: string[]; // list of courseIds
}
