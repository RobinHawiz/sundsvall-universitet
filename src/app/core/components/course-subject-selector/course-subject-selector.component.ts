import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-course-subject-selector',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './course-subject-selector.component.html',
  styleUrl: './course-subject-selector.component.scss',
})
export class CourseSubjectSelectorComponent {
  @Output() filterBySubjectEvent = new EventEmitter<string>();
  @Input() subjects: Array<string> = [];

  courseSubjectControl = new FormControl<string | null>(null);

  ngOnInit(): void {
    this.courseSubjectControl.valueChanges.subscribe((selectedValue) => {
      this.filterBySubject(selectedValue);
    });
  }

  filterBySubject(selectedValue: string | null): void {
    if (!selectedValue) {
      return;
    }

    this.filterBySubjectEvent.emit(selectedValue);
  }
}
