export interface Course {
  id?: string;
  name: string;
  description: string;
  lectures: Lecture[];
  category: string;
  imageUrl?: string;
  createdBy: string;
}

export interface Lecture {
  id?: string;
  name: string;
  description: string;
  videoUrl: string;
  createdBy: string;
}
