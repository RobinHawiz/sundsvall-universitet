import { Injectable, Signal, signal } from '@angular/core';
import { Course } from '@core/models/course.model';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  // Key used for storing/retrieving courses in localStorage
  private static readonly key = 'courses';
  private courses = signal<Array<Course>>([]);

  addCourse(course: Course): void {
    this.courses.set([...this.courses(), course]);
  }

  removeCourse(course: Course): void {
    this.courses.set(
      this.courses().filter(
        (savedCourse) => savedCourse.courseCode !== course.courseCode
      )
    );
  }

  getCourses(): Signal<Array<Course>> {
    return this.courses;
  }

  saveToLocalStorage(): void {
    const json = JSON.stringify(this.courses());
    localStorage.setItem(LocalStorageService.key, json);
  }

  loadFromLocalStorage(): void {
    const json = localStorage.getItem(LocalStorageService.key);
    this.courses.set(!json ? [] : (JSON.parse(json) as Array<Course>));
  }

  isCourseSaved(course: Course): boolean {
    return this.courses().some(
      (savedCourse) => savedCourse.courseCode === course.courseCode
    );
  }
}
