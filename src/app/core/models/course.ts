export interface Course {
    id?: string;
    name: string;
    description: string;
    lectures: Lecture[];
    imageUrl?: string;
}

export interface Lecture {
    id?: string;
    name: string;
    description: string;
    videoUrl: string;
}
