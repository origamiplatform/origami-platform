export interface Course {
  id?: string;
  name: string;
  description: string;
  lectures: Lecture[];
  category: string;
  imageUrl?: string;
  createdBy: string;
  transactionId?: string;
  update?: boolean;
  delete?: boolean;
}

export interface Lecture {
  id?: string;
  name: string;
  description: string;
  videoUrl: string;
  createdBy: string;
  update?: boolean;
  delete?: boolean;
}

export interface BcCourse {
  $class: string;
  id: string;
  category: string;
  name: string;
  publisher: string;
  lectures?: string[];
  enrolled?: string[];
  completed?: string[];
}

export interface BcLecture {
  $class: string;
  id: string;
  name: string;
  course: string;
  publisher: string;
  completed?: string[];
}

