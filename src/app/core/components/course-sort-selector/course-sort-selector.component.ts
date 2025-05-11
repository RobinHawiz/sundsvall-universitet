import { Component, EventEmitter, Output } from '@angular/core';
import { material } from '@core/material';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Course, SortDirection, SortEvent } from '@core/models/course.model';

type CourseColumn = {
  tableColName: string;
  coursePropName: keyof Course;
};

@Component({
  selector: 'app-course-sort-selector',
  imports: [ReactiveFormsModule, ...material],
  templateUrl: './course-sort-selector.component.html',
  styleUrl: './course-sort-selector.component.scss',
})
export class CourseSortSelectorComponent {
  @Output() sortColumnEvent = new EventEmitter<SortEvent>();
  sortDirection: SortDirection = 'ascending';
  columnControl = new FormControl<CourseColumn | null>(null);

  columns: CourseColumn[] = [
    { tableColName: 'Kod', coursePropName: 'courseCode' },
    { tableColName: 'Kursnamn', coursePropName: 'courseName' },
    { tableColName: 'Poäng', coursePropName: 'points' },
    { tableColName: 'Ämne', coursePropName: 'subject' },
  ];

  sortColumn(): void {
    const selectedValue = this.columnControl.value;
    if (!selectedValue) {
      this.columnControl.setErrors({ required: true });
      this.columnControl.markAsTouched();
      return;
    }

    const output: SortEvent = {
      column: selectedValue.coursePropName,
      direction: this.sortDirection,
    };
    this.sortColumnEvent.emit(output);

    this.sortDirection =
      this.sortDirection === 'ascending' ? 'descending' : 'ascending';
  }
}
