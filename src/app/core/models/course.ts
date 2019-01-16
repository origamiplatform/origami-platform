export interface Course {
    id?: string;
    name: string;
    description: string;
    lectures: Lecture[];
}

export interface Lecture {
    id?: string;
    name: string;
    description: string;
    videoUrl: string;
}
