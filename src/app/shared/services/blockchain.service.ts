import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, BcUser } from '@core/models/user';
import { environment } from '@environments/environment.prod';
import { Observable, of } from 'rxjs';
import { BcCourse, Course, BcLecture, Lecture } from '@core/models/course';
import { EnrollToCourse } from '@core/models/transaction';

@Injectable({
  providedIn: 'root'
})
export class BlockchainService {

  constructor(private _http: HttpClient) { }

  async updateUser(user: User): Promise<BcUser> {
    const bcUser: BcUser = {
      $class: `${environment.blockchainDomain}.User`,
      id: user.uid,
      email: user.email,
      name: user.displayName,
      admin: user.admin
    };

    let existingUser;
    try {
      existingUser = await this.getUserById(user.uid).toPromise();
    } catch (err) {
      // if no user is on blockchain create new user
      return this._http.post<BcUser>(`${environment.blockchainAPI}/User`, bcUser).toPromise();
    }
    if (JSON.stringify(existingUser) === JSON.stringify(bcUser)) {
      // if the data is same do nothing
      return of(bcUser).toPromise();
    }
    return this._http.put<BcUser>(`${environment.blockchainAPI}/User/${user.uid}`, bcUser).toPromise();
  }

  async updateCourse(course: Course): Promise<BcCourse> {
    const bcCourse: BcCourse = {
      $class: `${environment.blockchainDomain}.Course`,
      id: course.id,
      category: course.category,
      name: course.name,
      publisher: `${environment.blockchainDomain}.User#${course.createdBy}`,
    };
    let existingCourse;
    try {
      existingCourse = await this.getCourseById(course.id).toPromise();
    } catch (err) {
      // if no user is on blockchain create new user
      return this._http.post<BcCourse>(`${environment.blockchainAPI}/Course`, bcCourse).toPromise();
    }
    if (JSON.stringify(existingCourse) === JSON.stringify(bcCourse)) {
      // if the data is same do nothing
      return of(bcCourse).toPromise();
    }
    return this._http.put<BcCourse>(`${environment.blockchainAPI}/Course`, bcCourse).toPromise();
  }

  async updateLecture(lecture: Lecture, courseId: string): Promise<BcLecture> {
    const bcLecture: BcLecture = {
      $class: `${environment.blockchainDomain}.Lecture`,
      id: lecture.id,
      name: lecture.name,
      course: `${environment.blockchainDomain}.Course#${courseId}`,
      publisher: `${environment.blockchainDomain}.User#${lecture.createdBy}`,
    };
    let existingLecture;
    try {
      existingLecture = await this.getLectureById(lecture.id).toPromise();
    } catch (err) {
      // if no user is on blockchain create new user
      return this._http.post<BcLecture>(`${environment.blockchainAPI}/Lecture`, bcLecture).toPromise();
    }
    if (JSON.stringify(existingLecture) === JSON.stringify(bcLecture)) {
      // if the data is same do nothing
      return of(bcLecture).toPromise();
    }
    return this._http.put<BcLecture>(`${environment.blockchainAPI}/Lecture`, bcLecture).toPromise();
  }

  async deleteCourse(id: string): Promise<any> {
    return this._http.delete<any>(`${environment.blockchainAPI}/Course/${id}`).toPromise();
  }

  async deleteLecture(id: string): Promise<any> {
    return this._http.delete<any>(`${environment.blockchainAPI}/Lecture/${id}`).toPromise();
  }

  async addLectureToCourse(lectureId: string, courseId: string): Promise<any> {
    let bcCourse;
    try {
      bcCourse = await this.getCourseById(courseId).toPromise();
      const lecture = `${environment.blockchainDomain}.Lecture#${lectureId}`;
      bcCourse.lectures.push(lecture);
    } catch (err) {
      // if no user is on blockchain create new user
      return this._http.post<BcCourse>(`${environment.blockchainAPI}/Course`, bcCourse).toPromise();
    }
    return this._http.put<BcCourse>(`${environment.blockchainAPI}/Course`, bcCourse).toPromise();
  }

  async enrollToCourse(courseId: string, userId: string): Promise<EnrollToCourse> {
    const transaction: EnrollToCourse = {
      $class: `${environment.blockchainDomain}.EnrollToCourse`,
      course: `${environment.blockchainDomain}.Course#${courseId}`,
      student: `${environment.blockchainDomain}.User#${userId}`
    };
    return this._http.post<EnrollToCourse>(`${environment.blockchainAPI}/EnrollToCourse`, transaction).toPromise();
  }

  private getUserById(id: String): Observable<BcUser> {
    return this._http.get<BcUser>(`${environment.blockchainAPI}/User/${id}`);
  }

  private getCourseById(id: String): Observable<BcCourse> {
    return this._http.get<BcCourse>(`${environment.blockchainAPI}/Course/${id}`);
  }

  private getLectureById(id: String): Observable<BcLecture> {
    return this._http.get<BcLecture>(`${environment.blockchainAPI}/Lecture/${id}`);
  }
}
