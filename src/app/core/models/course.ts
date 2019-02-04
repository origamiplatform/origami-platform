export interface Course {
    id?: string;
    name: string;
    description: string;
    lectures: Lecture[];
    category: string;
    imageUrl?: string;
}

export interface Lecture {
    id?: string;
    name: string;
    description: string;
    videoUrl: string;
}
