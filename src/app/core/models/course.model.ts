export type Course = {
  courseCode: string;
  subjectCode: string;
  level: string;
  progression: 'A' | 'B' | 'C';
  courseName: string;
  points: number;
  institutionCode: string;
  subject: string;
  syllabus: string;
};
export type SortDirection = 'ascending' | 'descending';
export type SortEvent = {
  column: keyof Course;
  direction: SortDirection;
};
