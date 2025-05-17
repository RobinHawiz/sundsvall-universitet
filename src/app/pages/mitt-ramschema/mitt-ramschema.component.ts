import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, inject, signal } from '@angular/core';
import { Course } from '@core/models/course.model';
import { LocalStorageService } from '@core/services';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-mitt-ramschema',
  imports: [MatTableModule, MatCardModule, MatButtonModule],
  templateUrl: './mitt-ramschema.component.html',
  styleUrl: './mitt-ramschema.component.scss',
})
export class MittRamschemaComponent {
  private breakpointObserver = inject(BreakpointObserver);
  displayedCourses;
  displayedColumns = [
    'courseCode',
    'courseName',
    'points',
    'subject',
    'syllabus',
    'remove',
  ];
  isScreenWidth1110px = signal(false);
  breakPoint1110px = '(max-width: 1110px)';

  constructor(public localStorageService: LocalStorageService) {
    this.localStorageService.loadFromLocalStorage();
    this.displayedCourses = this.localStorageService.getCourses();
  }

  ngOnInit(): void {
    this.breakpointObserver.observe(this.breakPoint1110px).subscribe((x) => {
      // Check if defined breakpoints match the screen size
      this.isScreenWidth1110px.set(x.breakpoints[this.breakPoint1110px]);
    });
  }

  totalCoursePoints(): number {
    let output = 0;
    this.displayedCourses().forEach((course) => {
      output += course.points;
    });
    return output;
  }

  removeCourse(course: Course): void {
    this.localStorageService.removeCourse(course);
    this.localStorageService.saveToLocalStorage();
  }
}
