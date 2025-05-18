import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Course, SortEvent } from '@core/models/course.model';
import { alphabetize } from '@core/utils/sort.util';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  url: string =
    'https://matdah.github.io/DT208G---Programmering-i-TypeScript/Moment%205%20-%20Projekt/miun_courses.json';

  courses = signal<Array<Course> | undefined>(undefined);
  unmodifiedCourses = signal<Array<Course>>([]);
  courseSubjects = signal<Array<string>>([]);
  isLoading = signal<boolean>(false);

  constructor(private http: HttpClient) {}

  private getCourses(): Observable<Array<Course>> {
    return this.http.get<Array<Course>>(this.url);
  }

  private setCourseSubjects(data: Array<Course>): void {
    let temp = [];
    temp.push('Alla');
    data.forEach((course) => {
      if (!temp.includes(course.subject)) {
        temp.push(course.subject);
      }
    });
    this.courseSubjects.set(temp);
  }

  loadCourses(): void {
    this.isLoading.set(true);

    this.getCourses().subscribe({
      next: (data) => {
        this.courses.set(data);
        this.unmodifiedCourses.set(data);
        this.setCourseSubjects(data);
      },
      error: (err) => {
        console.error('Misslyckad hämtning av data: ', err);
        this.isLoading.set(false);
      },
      complete: () => {
        this.isLoading.set(false);
      },
    });
  }

  filterBySubject(subject: string): void {
    const unmodifiedCourses = this.unmodifiedCourses();
    if (subject.toLocaleLowerCase() !== 'alla') {
      this.courses.set(
        unmodifiedCourses.filter((course) => course.subject === subject)
      );
    } else {
      this.courses.set(unmodifiedCourses);
    }
  }

  alphabetizeBy(event: SortEvent): void {
    const courses = this.courses();
    if (!courses) return;

    let sorted;
    if (event.direction === 'ascending') {
      sorted = [...courses].sort((a, b) =>
        alphabetize(a[event.column], b[event.column])
      );
    } else {
      sorted = [...courses].sort((b, a) =>
        alphabetize(a[event.column], b[event.column])
      );
    }

    this.courses.set(sorted);
  }
}
