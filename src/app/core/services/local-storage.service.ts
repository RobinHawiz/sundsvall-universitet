import { Injectable } from '@angular/core';
import { Course } from '@core/models/course.model';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  // Key used for storing/retrieving courses in localStorage
  private static readonly key = 'courses';
  private courses: Array<Course> = [];

  addCourse(course: Course): void {
    this.courses.push(course);
  }

  removeCourse(course: Course): void {
    const courseIndex = this.courses.findIndex(
      (savedCourse) => savedCourse.courseCode === course.courseCode
    );
    // only splice array when course is found
    if (courseIndex > -1) {
      this.courses.splice(courseIndex, 1);
    }
  }

  getCourses(): Array<Course> {
    return this.courses;
  }

  saveToLocalStorage(): void {
    const json = JSON.stringify(this.courses);
    localStorage.setItem(LocalStorageService.key, json);
  }

  loadFromLocalStorage(): void {
    const json = localStorage.getItem(LocalStorageService.key);
    this.courses = !json ? [] : (JSON.parse(json) as Array<Course>);
  }

  isCourseSaved(course: Course): boolean {
    return this.courses.some(
      (savedCourse) => savedCourse.courseCode === course.courseCode
    );
  }
}
