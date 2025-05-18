import { Component, computed, inject, signal, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { FormsModule } from '@angular/forms';
import { Course, SortEvent } from '@core/models/course.model';

import {
  MatPaginator,
  MatPaginatorIntl,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import {
  CourseService,
  LocalStorageService,
  PaginatorIntlService,
} from '@core/services';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CourseSortSelectorComponent } from '@core/components/course-sort-selector/course-sort-selector.component';
import { CourseSubjectSelectorComponent } from '@core/components/course-subject-selector/course-subject-selector.component';

@Component({
  selector: 'app-kurser',
  standalone: true,
  imports: [
    FormsModule,
    MatPaginatorModule,
    CourseSortSelectorComponent,
    CourseSubjectSelectorComponent,
    MatTableModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  providers: [{ provide: MatPaginatorIntl, useClass: PaginatorIntlService }],
  templateUrl: './kurser.component.html',
  styleUrl: './kurser.component.scss',
})
export class KurserComponent {
  private breakpointObserver = inject(BreakpointObserver);
  private readonly coursePropsToCheck: Array<keyof Course> = [
    'courseCode',
    'courseName',
  ];

  /* Paginator vars */
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageSize = signal(10);
  pageIndex = signal(0);
  pageStartIndex = computed(() => this.pageIndex() * this.pageSize());
  pageEndIndex = computed(() => (this.pageIndex() + 1) * this.pageSize());
  /* End of paginator vars */

  unmodifiedCourses;
  courses;
  isLoading;
  courseSubjects;
  filteredCourses = computed(() => {
    const courseList = this.courses();
    if (courseList !== undefined) {
      return courseList.filter((course) =>
        this.coursePropsToCheck.some((prop) =>
          course[prop]
            .toString()
            .toLowerCase()
            .includes(this.searchTerm().toLowerCase())
        )
      );
    }
    return [];
  });
  displayedCourses = computed(() =>
    this.filteredCourses().slice(this.pageStartIndex(), this.pageEndIndex())
  );
  displayedColumns = [
    'courseCode',
    'courseName',
    'points',
    'subject',
    'syllabus',
    'add',
  ];
  didFetchFail = computed(
    () => this.courses() === undefined && !this.isLoading()
  );
  searchTerm = signal('');
  isScreenWidth1110px = signal(false);
  breakPoint1110px = '(max-width: 1110px)';

  constructor(
    private courseService: CourseService,
    public localStorageService: LocalStorageService
  ) {
    this.courses = this.courseService.courses;
    this.unmodifiedCourses = this.courseService.unmodifiedCourses;
    this.isLoading = this.courseService.isLoading;
    this.courseSubjects = this.courseService.courseSubjects;
    this.localStorageService.loadFromLocalStorage();
    this.courseService.loadCourses();
  }

  private resetPageIndex(): void {
    this.pageIndex.set(0);
  }

  ngOnInit(): void {
    this.breakpointObserver.observe(this.breakPoint1110px).subscribe((x) => {
      // Check if defined breakpoints match the screen size
      this.isScreenWidth1110px.set(x.breakpoints[this.breakPoint1110px]);
    });
  }

  onSearchTermChange(): void {
    this.resetPageIndex();
  }

  filterBySubject(subject: string): void {
    this.resetPageIndex();
    this.courseService.filterBySubject(subject);
  }

  alphabetizeBy(event: SortEvent): void {
    this.resetPageIndex();
    this.courseService.alphabetizeBy(event);
  }

  handlePageEvent(e: PageEvent): void {
    this.pageSize.set(e.pageSize);
    this.pageIndex.set(e.pageIndex);
  }

  saveCourse(course: Course): void {
    this.localStorageService.addCourse(course);
    this.localStorageService.saveToLocalStorage();
  }
}
